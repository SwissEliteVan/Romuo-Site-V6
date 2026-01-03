import { calculateRidePrice, calculateDistance, estimateDuration } from '@romuo-vtc/shared';
import type { RideEstimateRequest, RideEstimateResponse } from '@romuo-vtc/shared';
import { PRICING } from '@romuo-vtc/shared';

/**
 * Service de tarification
 */
export class PricingService {
  /**
   * Estime le prix d'une course
   */
  async estimate(data: RideEstimateRequest): Promise<RideEstimateResponse> {
    // Calculer la distance (Haversine)
    const distanceKm = calculateDistance(
      data.pickupLat,
      data.pickupLng,
      data.dropoffLat,
      data.dropoffLng
    );

    // Estimer la durée
    const durationMin = estimateDuration(distanceKm);

    // Calculer le prix
    const price = calculateRidePrice(distanceKm, durationMin);

    return {
      distanceKm: Math.round(distanceKm * 10) / 10, // Arrondi à 1 décimale
      durationMin,
      price: Math.round(price * 100) / 100, // Arrondi à 2 décimales
      currency: PRICING.CURRENCY,
    };
  }
}

export const pricingService = new PricingService();
