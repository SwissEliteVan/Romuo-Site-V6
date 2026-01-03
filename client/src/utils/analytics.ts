import ReactGA from 'react-ga4';

/**
 * Utilitaires pour Google Analytics 4
 * Tous les événements respectent la conformité LPD/RGPD :
 * - Aucun tracking sans consentement
 * - Pas de données personnelles identifiables
 */

const CONSENT_KEY = 'romuo-cookie-consent';

// Vérifier si l'utilisateur a consenti au tracking
function hasAnalyticsConsent(): boolean {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (!consent) return false;

  try {
    const consentData = JSON.parse(consent);
    return consentData.analytics === true;
  } catch {
    return false;
  }
}

// Événement : Clic sur CTA "Réserver"
export function trackReservationClick(location: string) {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'conversion',
    action: 'reservation_click',
    label: location, // Ex: 'home_hero', 'services_page', etc.
  });

  console.log('Event tracked: reservation_click', location);
}

// Événement : Début du processus de réservation (formulaire)
export function trackBeginCheckout() {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'conversion',
    action: 'begin_checkout',
  });

  console.log('Event tracked: begin_checkout');
}

// Événement : Validation/envoi du formulaire de devis
export function trackPurchase(value: number = 0) {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'conversion',
    action: 'purchase',
    value: value, // Montant en CHF (optionnel)
  });

  console.log('Event tracked: purchase', value);
}

// Événement : Clic sur contact (téléphone ou email)
export function trackContactClick(method: 'phone' | 'email') {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'engagement',
    action: 'contact_click',
    label: method,
  });

  console.log('Event tracked: contact_click', method);
}

// Événement : Affichage de la carte interactive
export function trackMapView() {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'engagement',
    action: 'map_view',
  });

  console.log('Event tracked: map_view');
}

// Événement : Calcul d'itinéraire réussi
export function trackRouteCalculated(distance: number) {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event({
    category: 'engagement',
    action: 'route_calculated',
    value: Math.round(distance), // Distance en km
  });

  console.log('Event tracked: route_calculated', distance);
}

// Événement : Vue de page (géré automatiquement par react-ga4 si initialisé)
export function trackPageView(path: string) {
  if (!hasAnalyticsConsent()) return;

  ReactGA.send({ hitType: 'pageview', page: path });

  console.log('Event tracked: pageview', path);
}

/**
 * Instructions d'activation GA4 :
 *
 * 1. Créer un compte Google Analytics 4
 * 2. Obtenir votre ID de mesure (format: G-XXXXXXXXXX)
 * 3. Créer un fichier .env à la racine :
 *    VITE_GA4_ID=G-VOTRE-ID-REEL
 * 4. Décommenter les lignes ReactGA dans ce fichier et dans CookieConsent.tsx
 * 5. Les événements seront automatiquement trackés si consentement donné
 *
 * Documentation : https://developers.google.com/analytics/devguides/collection/ga4
 */
