import { PrismaClient } from '@prisma/client';
import { calculateDistance, DISPATCH, RIDE_STATUS } from '@romuo-vtc/shared';
import logger from '../utils/logger.js';
import { wsServer } from '../websocket/server.js';

const prisma = new PrismaClient();

/**
 * Service de dispatch (matching passager ↔ chauffeur)
 */
export class DispatchService {
  private activeOffers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Trouve un chauffeur pour une course
   */
  async findDriverForRide(rideId: string): Promise<void> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      logger.error(`Ride ${rideId} not found for dispatch`);
      return;
    }

    // Trouver les chauffeurs en ligne et approuvés
    const availableDrivers = await prisma.driverProfile.findMany({
      where: {
        isOnline: true,
        isApproved: true,
        lastLocationLat: { not: null },
        lastLocationLng: { not: null },
      },
      include: {
        user: true,
        vehicle: true,
      },
    });

    if (availableDrivers.length === 0) {
      await this.noDriverAvailable(rideId);
      return;
    }

    // Calculer la distance pour chaque chauffeur
    const driversWithDistance = availableDrivers
      .map((driver) => {
        const distance = calculateDistance(
          ride.pickupLat,
          ride.pickupLng,
          driver.lastLocationLat!,
          driver.lastLocationLng!
        );

        return { driver, distance };
      })
      .filter((d) => d.distance <= DISPATCH.MAX_SEARCH_RADIUS_KM)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, DISPATCH.MAX_DRIVERS_TO_NOTIFY);

    if (driversWithDistance.length === 0) {
      await this.noDriverAvailable(rideId);
      return;
    }

    logger.info(
      `Found ${driversWithDistance.length} drivers within ${DISPATCH.MAX_SEARCH_RADIUS_KM}km for ride ${rideId}`
    );

    // Offrir la course séquentiellement aux chauffeurs
    await this.offerToDriversSequentially(ride, driversWithDistance);
  }

  /**
   * Offre la course aux chauffeurs séquentiellement
   */
  private async offerToDriversSequentially(
    ride: any,
    driversWithDistance: any[]
  ): Promise<void> {
    for (const { driver, distance } of driversWithDistance) {
      // Vérifier si la course est toujours disponible
      const currentRide = await prisma.ride.findUnique({
        where: { id: ride.id },
      });

      if (!currentRide || currentRide.status !== RIDE_STATUS.REQUESTED) {
        logger.info(`Ride ${ride.id} is no longer available, stopping dispatch`);
        return;
      }

      // Mettre à jour le statut à "offered"
      await prisma.ride.update({
        where: { id: ride.id },
        data: { status: RIDE_STATUS.OFFERED },
      });

      // Envoyer l'offre au chauffeur via WebSocket
      const expiresAt = new Date(Date.now() + DISPATCH.OFFER_TIMEOUT_SECONDS * 1000);

      wsServer.sendToDriver(driver.userId, {
        type: 'new_ride_offer',
        payload: {
          rideId: ride.id,
          pickupAddress: ride.pickupAddress,
          pickupLat: ride.pickupLat,
          pickupLng: ride.pickupLng,
          dropoffAddress: ride.dropoffAddress,
          dropoffLat: ride.dropoffLat,
          dropoffLng: ride.dropoffLng,
          estimatedPrice: ride.estimatedPrice,
          estimatedDistanceKm: ride.estimatedDistanceKm,
          estimatedDurationMin: ride.estimatedDurationMin,
          expiresAt: expiresAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      });

      logger.info(
        `Offer sent to driver ${driver.userId} for ride ${ride.id} (distance: ${distance.toFixed(1)}km)`
      );

      // Créer l'événement
      await prisma.rideEvent.create({
        data: {
          rideId: ride.id,
          eventType: 'offer_sent',
          metadata: { driverId: driver.userId, distance },
        },
      });

      // Attendre la réponse du chauffeur (timeout)
      const accepted = await this.waitForDriverResponse(ride.id, driver.userId);

      if (accepted) {
        logger.info(`Ride ${ride.id} accepted by driver ${driver.userId}`);
        return;
      }

      logger.info(
        `Ride ${ride.id} not accepted by driver ${driver.userId}, trying next driver`
      );

      // Petit délai avant d'essayer le prochain chauffeur
      await new Promise((resolve) => setTimeout(resolve, DISPATCH.RETRY_INTERVAL_MS));
    }

    // Aucun chauffeur n'a accepté
    await this.noDriverAvailable(ride.id);
  }

  /**
   * Attend la réponse du chauffeur (avec timeout)
   */
  private waitForDriverResponse(rideId: string, driverId: string): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(async () => {
        this.activeOffers.delete(rideId);

        // Envoyer l'expiration de l'offre au chauffeur
        wsServer.sendToDriver(driverId, {
          type: 'offer_expired',
          payload: {
            rideId,
            reason: 'timeout',
          },
          timestamp: new Date().toISOString(),
        });

        // Créer l'événement
        await prisma.rideEvent.create({
          data: {
            rideId,
            eventType: 'offer_expired',
            metadata: { driverId, reason: 'timeout' },
          },
        });

        resolve(false);
      }, DISPATCH.OFFER_TIMEOUT_SECONDS * 1000);

      this.activeOffers.set(rideId, timeout);

      // Écouter l'acceptation de l'offre
      const checkInterval = setInterval(async () => {
        const ride = await prisma.ride.findUnique({
          where: { id: rideId },
        });

        if (ride && ride.status === RIDE_STATUS.ACCEPTED && ride.driverId === driverId) {
          clearTimeout(timeout);
          clearInterval(checkInterval);
          this.activeOffers.delete(rideId);
          resolve(true);
        }
      }, 500);

      // Nettoyer l'interval après le timeout
      setTimeout(() => {
        clearInterval(checkInterval);
      }, DISPATCH.OFFER_TIMEOUT_SECONDS * 1000 + 1000);
    });
  }

  /**
   * Accepter une offre de course (appelé par le chauffeur)
   */
  async acceptOffer(rideId: string, driverId: string): Promise<void> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride || ride.status !== RIDE_STATUS.OFFERED) {
      throw new Error('Ride is no longer available');
    }

    // Mettre à jour la course
    await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RIDE_STATUS.ACCEPTED,
        driverId,
        acceptedAt: new Date(),
      },
    });

    // Créer l'événement
    await prisma.rideEvent.create({
      data: {
        rideId,
        eventType: 'driver_assigned',
        metadata: { driverId },
      },
    });

    // Notifier le passager via WebSocket
    const driver = await prisma.user.findUnique({
      where: { id: driverId },
      include: {
        driverProfile: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    wsServer.sendToRider(ride.riderId, {
      type: 'ride_assigned',
      payload: {
        rideId,
        driver: {
          id: driver!.id,
          firstName: driver!.firstName,
          lastName: driver!.lastName,
          phone: driver!.phone,
          rating: driver!.driverProfile!.rating,
          vehicle: driver!.driverProfile!.vehicle || null,
        },
        estimatedArrivalMin: 5, // TODO: calculer réellement
      },
      timestamp: new Date().toISOString(),
    });

    logger.info(`Ride ${rideId} assigned to driver ${driverId}`);

    // Annuler l'offre en cours
    const timeout = this.activeOffers.get(rideId);
    if (timeout) {
      clearTimeout(timeout);
      this.activeOffers.delete(rideId);
    }
  }

  /**
   * Refuser une offre de course
   */
  async rejectOffer(rideId: string, driverId: string): Promise<void> {
    // Créer l'événement
    await prisma.rideEvent.create({
      data: {
        rideId,
        eventType: 'offer_rejected',
        metadata: { driverId },
      },
    });

    logger.info(`Ride ${rideId} rejected by driver ${driverId}`);
  }

  /**
   * Aucun chauffeur disponible
   */
  private async noDriverAvailable(rideId: string): Promise<void> {
    await prisma.ride.update({
      where: { id: rideId },
      data: { status: RIDE_STATUS.NO_DRIVER_AVAILABLE },
    });

    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    // Notifier le passager
    wsServer.sendToRider(ride!.riderId, {
      type: 'ride_status_update',
      payload: {
        rideId,
        status: RIDE_STATUS.NO_DRIVER_AVAILABLE,
      },
      timestamp: new Date().toISOString(),
    });

    logger.warn(`No driver available for ride ${rideId}`);
  }
}

export const dispatchService = new DispatchService();
