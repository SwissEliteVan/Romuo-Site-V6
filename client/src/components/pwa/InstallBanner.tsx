import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    if (!isInstalled && daysSinceDismissed > 7) {
      // Android/Chrome
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowBanner(true);
      };

      window.addEventListener('beforeinstallprompt', handler);

      // iOS: Show banner after 3 seconds if not installed
      if (iOS) {
        setTimeout(() => setShowBanner(true), 3000);
      }

      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gold-500/50 rounded-2xl shadow-2xl shadow-gold-500/20 p-6 backdrop-blur-xl">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-gold-500/50">
          <Smartphone className="w-8 h-8 text-black" />
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">
            Installer l'application ROMUO VTC
          </h3>
          <p className="text-sm text-gray-400">
            {isIOS
              ? 'Ajoutez cette app à votre écran d\'accueil pour un accès rapide et une expérience optimale.'
              : 'Installez notre app pour un accès rapide, des notifications en temps réel et une expérience hors ligne.'}
          </p>
        </div>

        {/* Install Button */}
        {isIOS ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-300">
              <p className="mb-2">Pour installer :</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Tapez sur <span className="font-bold">⎙ Partager</span></li>
                <li>Sélectionnez <span className="font-bold">Ajouter à l'écran d'accueil</span></li>
                <li>Tapez <span className="font-bold">Ajouter</span></li>
              </ol>
            </div>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Installer maintenant
          </button>
        )}

        {/* Features */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
            <div className="text-center">
              <div className="font-bold text-white">⚡</div>
              <div>Rapide</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white">📱</div>
              <div>Natif</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white">🔔</div>
              <div>Notifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
