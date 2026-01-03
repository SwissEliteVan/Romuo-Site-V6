import { PrismaClient } from '@prisma/client';
import type { Ride, RideRequestInput, RideWithDetails } from '@romuo-vtc/shared';
import { RIDE_STATUS } from '@romuo-vtc/shared';
import { NotFoundError, ValidationError, ForbiddenError } from '../utils/errors.js';
import { pricingService } from './pricing.service.js';
import { dispatchService } from './dispatch.service.js';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

export class RideService {
  /**
   * Créer une demande de course
   */
  async requestRide(riderId: string, data: RideRequestInput): Promise<Ride> {
    // Estimer le prix
    const estimate = await pricingService.estimate({
      pickupLat: data.pickupLat,
      pickupLng: data.pickupLng,
      dropoffLat: data.dropoffLat,
      dropoffLng: data.dropoffLng,
    });

    // Créer la course
    const ride = await prisma.ride.create({
      data: {
        riderId,
        status: RIDE_STATUS.REQUESTED,
        pickupAddress: data.pickupAddress,
        pickupLat: data.pickupLat,
        pickupLng: data.pickupLng,
        dropoffAddress: data.dropoffAddress,
        dropoffLat: data.dropoffLat,
        dropoffLng: data.dropoffLng,
        estimatedDistanceKm: estimate.distanceKm,
        estimatedDurationMin: estimate.durationMin,
        estimatedPrice: estimate.price,
      },
    });

    logger.info(`Ride requested: ${ride.id} by rider ${riderId}`);

    // Créer l'événement
    await prisma.rideEvent.create({
      data: {
        rideId: ride.id,
        eventType: 'status_changed',
        metadata: { status: RIDE_STATUS.REQUESTED },
      },
    });

    // Lancer le dispatch (asynchrone)
    dispatchService.findDriverForRide(ride.id).catch((error) => {
      logger.error(`Dispatch error for ride ${ride.id}:`, error);
    });

    return ride as Ride;
  }

  /**
   * Récupérer une course par ID
   */
  async getRide(rideId: string): Promise<RideWithDetails> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        rider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            driverProfile: {
              select: {
                vehicle: {
                  select: {
                    make: true,
                    model: true,
                    color: true,
                    licensePlate: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!ride) {
      throw new NotFoundError('Ride not found');
    }

    // Formater pour correspondre à RideWithDetails
    const formatted: RideWithDetails = {
      ...ride,
      rider: ride.rider,
      driver: ride.driver ? {
        ...ride.driver,
        vehicle: ride.driver.driverProfile?.vehicle || undefined,
      } : undefined,
    };

    return formatted;
  }

  /**
   * Récupérer la course active d'un passager
   */
  async getActiveRide(riderId: string): Promise<RideWithDetails | null> {
    const ride = await prisma.ride.findFirst({
      where: {
        riderId,
        status: {
          in: [
            RIDE_STATUS.REQUESTED,
            RIDE_STATUS.OFFERED,
            RIDE_STATUS.ACCEPTED,
            RIDE_STATUS.EN_ROUTE,
            RIDE_STATUS.ARRIVED,
            RIDE_STATUS.IN_TRIP,
          ],
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        rider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            driverProfile: {
              select: {
                vehicle: {
                  select: {
                    make: true,
                    model: true,
                    color: true,
                    licensePlate: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!ride) return null;

    return {
      ...ride,
      rider: ride.rider,
      driver: ride.driver ? {
        ...ride.driver,
        vehicle: ride.driver.driverProfile?.vehicle || undefined,
      } : undefined,
    };
  }

  /**
   * Annuler une course
   */
  async cancelRide(
    rideId: string,
    userId: string,
    reason: string
  ): Promise<Ride> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundError('Ride not found');
    }

    // Vérifier que l'utilisateur peut annuler cette course
    if (ride.riderId !== userId && ride.driverId !== userId) {
      throw new ForbiddenError('You cannot cancel this ride');
    }

    // Vérifier que la course peut être annulée
    if (ride.status === RIDE_STATUS.COMPLETED || ride.status === RIDE_STATUS.CANCELED) {
      throw new ValidationError('This ride cannot be canceled');
    }

    // Mettre à jour la course
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RIDE_STATUS.CANCELED,
        canceledAt: new Date(),
        canceledBy: userId,
        cancellationReason: reason,
      },
    });

    logger.info(`Ride ${rideId} canceled by ${userId}: ${reason}`);

    // Créer l'événement
    await prisma.rideEvent.create({
      data: {
        rideId,
        eventType: 'status_changed',
        metadata: {
          status: RIDE_STATUS.CANCELED,
          canceledBy: userId,
          reason,
        },
      },
    });

    return updatedRide as Ride;
  }

  /**
   * Mettre à jour le statut d'une course (par le chauffeur)
   */
  async updateRideStatus(
    rideId: string,
    driverId: string,
    newStatus: string
  ): Promise<Ride> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundError('Ride not found');
    }

    if (ride.driverId !== driverId) {
      throw new ForbiddenError('You are not assigned to this ride');
    }

    // Valider la transition de statut
    const validTransitions: Record<string, string[]> = {
      [RIDE_STATUS.ACCEPTED]: [RIDE_STATUS.EN_ROUTE],
      [RIDE_STATUS.EN_ROUTE]: [RIDE_STATUS.ARRIVED],
      [RIDE_STATUS.ARRIVED]: [RIDE_STATUS.IN_TRIP],
      [RIDE_STATUS.IN_TRIP]: [RIDE_STATUS.COMPLETED],
    };

    if (!validTransitions[ride.status]?.includes(newStatus)) {
      throw new ValidationError(`Invalid status transition from ${ride.status} to ${newStatus}`);
    }

    // Mettre à jour
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: newStatus,
        ...(newStatus === RIDE_STATUS.IN_TRIP && { startedAt: new Date() }),
        ...(newStatus === RIDE_STATUS.COMPLETED && {
          completedAt: new Date(),
          finalPrice: ride.estimatedPrice,
        }),
      },
    });

    logger.info(`Ride ${rideId} status updated to ${newStatus} by driver ${driverId}`);

    // Créer l'événement
    await prisma.rideEvent.create({
      data: {
        rideId,
        eventType: 'status_changed',
        metadata: { status: newStatus },
      },
    });

    return updatedRide as Ride;
  }

  /**
   * Historique des courses d'un passager
   */
  async getRiderHistory(riderId: string): Promise<Ride[]> {
    const rides = await prisma.ride.findMany({
      where: { riderId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return rides as Ride[];
  }

  /**
   * Historique des courses d'un chauffeur
   */
  async getDriverHistory(driverId: string): Promise<Ride[]> {
    const rides = await prisma.ride.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return rides as Ride[];
  }
}

export const rideService = new RideService();
