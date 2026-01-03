import { PrismaClient } from '@prisma/client';
import type { Payment } from '@romuo-vtc/shared';
import { NotFoundError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

/**
 * Service de paiement (MVP: simulé)
 */
export class PaymentService {
  /**
   * Traite le paiement d'une course (simulé)
   */
  async processPayment(rideId: string): Promise<Payment> {
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundError('Ride not found');
    }

    const amount = ride.finalPrice || ride.estimatedPrice;

    // Créer le paiement simulé
    const payment = await prisma.payment.create({
      data: {
        rideId,
        amount,
        currency: 'CHF',
        status: 'completed',
        paymentMethod: 'simulated',
        transactionId: `sim_${Date.now()}_${rideId.slice(0, 8)}`,
      },
    });

    logger.info(`Payment processed for ride ${rideId}: ${amount} CHF (simulated)`);

    return payment as Payment;
  }

  /**
   * Récupérer le paiement d'une course
   */
  async getPayment(rideId: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({
      where: { rideId },
    });

    return payment as Payment | null;
  }
}

export const paymentService = new PaymentService();
