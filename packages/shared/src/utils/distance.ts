/**
 * Calcule la distance entre deux points GPS (formule de Haversine)
 *
 * @param lat1 - Latitude du point 1
 * @param lng1 - Longitude du point 1
 * @param lat2 - Latitude du point 2
 * @param lng2 - Longitude du point 2
 * @returns Distance en kilomètres
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Rayon de la Terre en km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Convertit des degrés en radians
 */
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Estime la durée d'un trajet basé sur la distance
 * (Vitesse moyenne estimée : 40 km/h en ville)
 *
 * @param distanceKm - Distance en kilomètres
 * @returns Durée en minutes
 */
export function estimateDuration(distanceKm: number): number {
  const AVERAGE_SPEED_KMH = 40;
  const durationHours = distanceKm / AVERAGE_SPEED_KMH;
  return Math.round(durationHours * 60);
}

/**
 * Formate une distance pour l'affichage
 *
 * @param distanceKm - Distance en kilomètres
 * @param locale - Locale (fr/en)
 * @returns Distance formatée (ex: "12.5 km")
 */
export function formatDistance(distanceKm: number, locale: string = 'fr'): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Formate une durée pour l'affichage
 *
 * @param durationMin - Durée en minutes
 * @param locale - Locale (fr/en)
 * @returns Durée formatée (ex: "25 min" ou "1h 15min")
 */
export function formatDuration(durationMin: number, locale: string = 'fr'): string {
  if (durationMin < 60) {
    return `${durationMin} min`;
  }

  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;

  if (minutes === 0) {
    return locale === 'fr' ? `${hours}h` : `${hours}h`;
  }

  return locale === 'fr'
    ? `${hours}h ${minutes}min`
    : `${hours}h ${minutes}min`;
}
