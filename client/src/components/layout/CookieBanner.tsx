import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'wouter';
import Button from '../ui/Button';

// Déclaration TypeScript pour window.gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, string>) => void;
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const cookieConsent = localStorage.getItem('romuo-cookie-consent');

    if (!cookieConsent) {
      // Afficher la bannière après 1 seconde
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const consent = {
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('romuo-cookie-consent', JSON.stringify(consent));
    localStorage.setItem('romuo-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);

    // Mettre à jour le consent mode pour GTM et GA4
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      });
    }
  };

  const handleDecline = () => {
    const consent = {
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('romuo-cookie-consent', JSON.stringify(consent));
    localStorage.setItem('romuo-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);

    // Refuser le consent pour GTM et GA4
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1a1a1a] border-2 border-[#d4af37] rounded-sm shadow-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Icône et texte */}
            <div className="flex gap-3 sm:gap-4 flex-1">
              <Cookie
                className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <div className="flex-1">
                <h2
                  id="cookie-banner-title"
                  className="text-base sm:text-lg font-bold text-[#ffffff] mb-2"
                >
                  Utilisation des cookies
                </h2>
                <p
                  id="cookie-banner-description"
                  className="text-xs sm:text-sm text-[#cccccc] leading-relaxed"
                >
                  Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser
                  le trafic du site. En cliquant sur "Accepter", vous consentez à l'utilisation de cookies
                  analytiques (Google Analytics 4).{' '}
                  <Link href="/cookies" className="text-[#d4af37] hover:underline">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDecline}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Refuser
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAccept}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Accepter
              </Button>
            </div>

            {/* Bouton fermer (mobile uniquement) */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 sm:hidden text-[#999999] hover:text-[#ffffff] transition-colors"
              aria-label="Fermer la bannière"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
