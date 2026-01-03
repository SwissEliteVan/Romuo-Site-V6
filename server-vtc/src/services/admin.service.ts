import { PrismaClient } from '@prisma/client';
import { PRICING } from '@romuo-vtc/shared';

const prisma = new PrismaClient();

export class AdminService {
  /**
   * Récupérer toutes les courses
   */
  async getAllRides() {
    return await prisma.ride.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        rider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Récupérer tous les chauffeurs
   */
  async getAllDrivers() {
    return await prisma.user.findMany({
      where: { role: 'driver' },
      include: {
        driverProfile: {
          include: {
            vehicle: true,
          },
        },
      },
    });
  }

  /**
   * Activer/désactiver un chauffeur
   */
  async toggleDriverStatus(driverId: string, isApproved: boolean) {
    return await prisma.driverProfile.update({
      where: { userId: driverId },
      data: { isApproved },
    });
  }

  /**
   * Statistiques globales
   */
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalRides, completedRides, todayRides, activeDrivers] = await Promise.all([
      prisma.ride.count(),
      prisma.ride.count({ where: { status: 'completed' } }),
      prisma.ride.count({
        where: {
          createdAt: { gte: today },
        },
      }),
      prisma.driverProfile.count({
        where: { isOnline: true, isApproved: true },
      }),
    ]);

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    });

    return {
      totalRides,
      completedRides,
      todayRides,
      activeDrivers,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }

  /**
   * Récupérer les paramètres de pricing (depuis config)
   */
  getPricingSettings() {
    return PRICING;
  }

  /**
   * Mettre à jour les paramètres de pricing
   * Note: Pour le MVP, on ne modifie pas vraiment (c'est dans config.ts)
   * Dans une vraie app, on stockerait en DB
   */
  async updatePricingSettings(settings: Partial<typeof PRICING>) {
    // TODO: Stocker en DB pour une vraie app
    // Pour le MVP, on retourne juste les settings actuels
    return PRICING;
  }
}

export const adminService = new AdminService();
