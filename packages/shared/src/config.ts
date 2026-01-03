/**
 * ⭐ CONFIGURATION CENTRALE DU MVP VTC
 *
 * Tous les paramètres configurables de l'application sont centralisés ici.
 * Modifiez ces valeurs selon vos besoins.
 */

// =============================================================================
// PRICING (Tarification)
// =============================================================================

export const PRICING = {
  /** Frais de base par course (CHF) */
  BASE_FARE: 3.50,

  /** Prix par kilomètre (CHF/km) */
  PRICE_PER_KM: 2.80,

  /** Prix par minute (CHF/min) */
  PRICE_PER_MINUTE: 0.60,

  /** Course minimale (CHF) */
  MIN_FARE: 8.00,

  /** Devise */
  CURRENCY: 'CHF',

  /** Symbole de la devise */
  CURRENCY_SYMBOL: 'CHF',
} as const;

// =============================================================================
// DISPATCH (Matching Passager ↔ Chauffeur)
// =============================================================================

export const DISPATCH = {
  /** Temps pour accepter une offre (secondes) */
  OFFER_TIMEOUT_SECONDS: 15,

  /** Rayon de recherche des chauffeurs (km) */
  MAX_SEARCH_RADIUS_KM: 5,

  /** Nombre max de chauffeurs notifiés séquentiellement */
  MAX_DRIVERS_TO_NOTIFY: 5,

  /** Intervalle de retry entre chauffeurs (ms) */
  RETRY_INTERVAL_MS: 500,
} as const;

// =============================================================================
// TEMPS RÉEL (WebSocket & GPS)
// =============================================================================

export const REALTIME = {
  /** Fréquence d'envoi de position du chauffeur (secondes) */
  DRIVER_LOCATION_INTERVAL_SECONDS: 5,

  /** Fréquence de refresh de la position côté passager (secondes) */
  RIDER_POSITION_UPDATE_INTERVAL_SECONDS: 3,

  /** Timeout de reconnexion WebSocket (ms) */
  WS_RECONNECT_TIMEOUT_MS: 3000,

  /** Max tentatives de reconnexion */
  WS_MAX_RECONNECT_ATTEMPTS: 5,
} as const;

// =============================================================================
// i18n (Internationalisation)
// =============================================================================

export const I18N = {
  /** Langues supportées */
  SUPPORTED_LOCALES: ['fr', 'en'] as const,

  /** Langue par défaut (fallback) */
  DEFAULT_LOCALE: 'fr' as const,

  /** Clé localStorage pour persister la langue */
  LOCALE_STORAGE_KEY: 'romuo_vtc_locale',

  /** Détection automatique de la langue du navigateur */
  AUTO_DETECT_LOCALE: true,
} as const;

// =============================================================================
// PAIEMENT
// =============================================================================

export const PAYMENT = {
  /** Mode de paiement (MVP: simulé) */
  MODE: 'SIMULATED' as const,

  /** PSP (Payment Service Provider) - Prêt pour Stripe/Adyen */
  PSP: {
    PROVIDER: 'stripe',
    // Ajoutez vos clés API ici plus tard
    // PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    // SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },

  /** Méthodes de paiement acceptées (Phase 2) */
  ACCEPTED_METHODS: ['card', 'twint', 'cash'] as const,
} as const;

// =============================================================================
// SÉCURITÉ & AUTHENTIFICATION
// =============================================================================

export const AUTH = {
  /** Expiration du token JWT (access) */
  JWT_ACCESS_EXPIRATION: '1h',

  /** Expiration du token JWT (refresh) */
  JWT_REFRESH_EXPIRATION: '7d',

  /** Longueur minimale du mot de passe */
  PASSWORD_MIN_LENGTH: 8,

  /** Nom du cookie de session (si httpOnly cookies) */
  SESSION_COOKIE_NAME: 'romuo_vtc_session',
} as const;

export const RATE_LIMITING = {
  /** Requêtes max par minute par IP */
  MAX_REQUESTS_PER_MINUTE: 100,

  /** Durée de la fenêtre (ms) */
  WINDOW_MS: 60 * 1000,
} as const;

// =============================================================================
// APPLICATION
// =============================================================================

export const APP = {
  /** Nom de l'application */
  NAME: 'ROMUO VTC',

  /** Version */
  VERSION: '1.0.0',

  /** URL de base (à configurer selon l'environnement) */
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',

  /** URL de l'API */
  API_URL: process.env.API_URL || 'http://localhost:4000',

  /** URL WebSocket */
  WS_URL: process.env.WS_URL || 'ws://localhost:4000',
} as const;

// =============================================================================
// STATUTS DE COURSE (Ride Status)
// =============================================================================

export const RIDE_STATUS = {
  REQUESTED: 'requested',        // Passager vient de demander
  OFFERED: 'offered',            // Offre envoyée à un chauffeur
  ACCEPTED: 'accepted',          // Chauffeur a accepté
  EN_ROUTE: 'en_route',         // Chauffeur se dirige vers pickup
  ARRIVED: 'arrived',            // Chauffeur arrivé au pickup
  IN_TRIP: 'in_trip',           // Course en cours (passager à bord)
  COMPLETED: 'completed',        // Course terminée
  CANCELED: 'canceled',          // Annulée
  NO_DRIVER_AVAILABLE: 'no_driver_available', // Aucun chauffeur trouvé
} as const;

export type RideStatus = typeof RIDE_STATUS[keyof typeof RIDE_STATUS];

// =============================================================================
// RÔLES UTILISATEURS
// =============================================================================

export const USER_ROLES = {
  RIDER: 'rider',
  DRIVER: 'driver',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// =============================================================================
// TYPES DE VÉHICULES
// =============================================================================

export const VEHICLE_TYPES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  VAN: 'van',
} as const;

export type VehicleType = typeof VEHICLE_TYPES[keyof typeof VEHICLE_TYPES];

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Vérifie si une locale est supportée
 */
export function isSupportedLocale(locale: string): boolean {
  return I18N.SUPPORTED_LOCALES.includes(locale as any);
}

/**
 * Récupère la locale depuis localStorage ou détecte depuis le navigateur
 */
export function getInitialLocale(): string {
  if (typeof window === 'undefined') return I18N.DEFAULT_LOCALE;

  // 1. Vérifier localStorage
  const stored = localStorage.getItem(I18N.LOCALE_STORAGE_KEY);
  if (stored && isSupportedLocale(stored)) {
    return stored;
  }

  // 2. Détecter depuis le navigateur
  if (I18N.AUTO_DETECT_LOCALE) {
    const browserLocale = navigator.language.split('-')[0];
    if (isSupportedLocale(browserLocale)) {
      return browserLocale;
    }
  }

  // 3. Fallback
  return I18N.DEFAULT_LOCALE;
}

/**
 * Persiste la locale dans localStorage
 */
export function setLocale(locale: string): void {
  if (typeof window === 'undefined') return;

  if (isSupportedLocale(locale)) {
    localStorage.setItem(I18N.LOCALE_STORAGE_KEY, locale);
  }
}
