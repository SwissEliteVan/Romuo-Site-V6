import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'wouter';
import ReactGA from 'react-ga4';

const CONSENT_KEY = 'romuo-cookie-consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Délai pour éviter l'affichage brutal au chargement
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Si consentement donné, initialiser GA4
      const consentData = JSON.parse(consent);
      if (consentData.analytics) {
        initializeGA4();
      }
    }
  }, []);

  const initializeGA4 = () => {
    const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-CZ1TY5HNKB';
    if (GA4_ID && GA4_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(GA4_ID);
      ReactGA.send('pageview');
    }

    console.log('GA4 initialized with consent:', GA4_ID);
  };

  const handleAcceptAll = () => {
    const consent = {
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    initializeGA4();

    // Événement de conversion : consentement accepté
    ReactGA.event({
      category: 'consent',
      action: 'accept_all',
    });
  };

  const handleRejectAll = () => {
    const consent = {
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1a1a1a] border-t-2 border-[#d4af37] shadow-2xl"
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <Cookie className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-[#ffffff] mb-2">
                  🍪 Gestion des cookies
                </h2>
                <p className="text-sm text-[#cccccc] leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience de navigation
                  et analyser notre trafic (Google Analytics 4).{' '}
                  <strong className="text-[#ffffff]">
                    Aucun cookie de tracking n'est activé sans votre consentement.
                  </strong>
                  {' '}En savoir plus dans notre{' '}
                  <Link href="/cookies" className="text-[#d4af37] hover:underline">
                    politique relative aux cookies
                  </Link>
                  {' '}et notre{' '}
                  <Link href="/confidentialite" className="text-[#d4af37] hover:underline">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRejectAll}
              className="sm:min-w-[140px]"
            >
              Tout refuser
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAcceptAll}
              className="sm:min-w-[140px]"
            >
              Tout accepter
            </Button>
          </div>

          <button
            onClick={handleRejectAll}
            className="absolute top-2 right-2 md:relative md:top-auto md:right-auto p-2 text-[#999999] hover:text-[#ffffff] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Fermer et refuser"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook pour vérifier si le consentement a été donné
export function useAnalyticsConsent() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent) {
      const consentData = JSON.parse(consent);
      setHasConsent(consentData.analytics === true);
    }
  }, []);

  return hasConsent;
}
