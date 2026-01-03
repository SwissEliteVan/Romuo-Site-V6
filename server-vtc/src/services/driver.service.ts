import { PrismaClient } from '@prisma/client';
import type { DriverProfile } from '@romuo-vtc/shared';
import { NotFoundError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

/**
 * Service pour les chauffeurs
 */
export class DriverService {
  /**
   * Passer en ligne
   */
  async goOnline(driverId: string): Promise<DriverProfile> {
    const profile = await prisma.driverProfile.update({
      where: { userId: driverId },
      data: { isOnline: true },
    });

    logger.info(`Driver ${driverId} went online`);

    return this.formatProfile(profile);
  }

  /**
   * Passer hors ligne
   */
  async goOffline(driverId: string): Promise<DriverProfile> {
    const profile = await prisma.driverProfile.update({
      where: { userId: driverId },
      data: { isOnline: false },
    });

    logger.info(`Driver ${driverId} went offline`);

    return this.formatProfile(profile);
  }

  /**
   * Mettre à jour la position du chauffeur
   */
  async updateLocation(
    driverId: string,
    lat: number,
    lng: number
  ): Promise<DriverProfile> {
    const profile = await prisma.driverProfile.update({
      where: { userId: driverId },
      data: {
        lastLocationLat: lat,
        lastLocationLng: lng,
        lastLocationUpdatedAt: new Date(),
      },
    });

    return this.formatProfile(profile);
  }

  /**
   * Récupérer le profil du chauffeur
   */
  async getProfile(driverId: string): Promise<DriverProfile> {
    const profile = await prisma.driverProfile.findUnique({
      where: { userId: driverId },
    });

    if (!profile) {
      throw new NotFoundError('Driver profile not found');
    }

    return this.formatProfile(profile);
  }

  /**
   * Statistiques du chauffeur (gains, courses)
   */
  async getStats(driverId: string) {
    const rides = await prisma.ride.findMany({
      where: {
        driverId,
        status: 'completed',
      },
      select: {
        finalPrice: true,
        createdAt: true,
      },
    });

    const totalEarnings = rides.reduce(
      (sum, ride) => sum + (ride.finalPrice || 0),
      0
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRides = rides.filter((ride) => ride.createdAt >= today);
    const todayEarnings = todayRides.reduce(
      (sum, ride) => sum + (ride.finalPrice || 0),
      0
    );

    return {
      totalRides: rides.length,
      totalEarnings,
      todayRides: todayRides.length,
      todayEarnings,
    };
  }

  /**
   * Formatte le profil pour correspondre au type DriverProfile
   */
  private formatProfile(profile: any): DriverProfile {
    return {
      ...profile,
      lastLocation:
        profile.lastLocationLat && profile.lastLocationLng
          ? {
              lat: profile.lastLocationLat,
              lng: profile.lastLocationLng,
            }
          : null,
    };
  }
}

export const driverService = new DriverService();
