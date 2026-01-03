import { PRICING } from '../config';

/**
 * Calcule le prix d'une course basé sur la distance et la durée
 *
 * @param distanceKm - Distance en kilomètres
 * @param durationMin - Durée en minutes
 * @returns Prix total (CHF)
 */
export function calculateRidePrice(
  distanceKm: number,
  durationMin: number
): number {
  const distanceCost = distanceKm * PRICING.PRICE_PER_KM;
  const durationCost = durationMin * PRICING.PRICE_PER_MINUTE;
  const totalCost = PRICING.BASE_FARE + distanceCost + durationCost;

  // Appliquer le minimum
  return Math.max(totalCost, PRICING.MIN_FARE);
}

/**
 * Formate un prix avec la devise
 *
 * @param price - Prix à formater
 * @param locale - Locale (fr/en)
 * @returns Prix formaté (ex: "25.50 CHF")
 */
export function formatPrice(price: number, locale: string = 'fr'): string {
  const formatted = price.toFixed(2);
  return `${formatted} ${PRICING.CURRENCY_SYMBOL}`;
}

/**
 * Calcule le gain d'un chauffeur (après commission)
 *
 * @param ridePrice - Prix de la course
 * @param commissionRate - Taux de commission (0.15 = 15%)
 * @returns Gain du chauffeur
 */
export function calculateDriverEarnings(
  ridePrice: number,
  commissionRate: number = 0.15
): number {
  return ridePrice * (1 - commissionRate);
}
