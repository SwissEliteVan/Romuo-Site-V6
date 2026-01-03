import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from './services/api';
import { wsClient } from './services/websocket';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ActiveRidePage } from './pages/ActiveRidePage';
import { HistoryPage } from './pages/HistoryPage';

type View = 'home' | 'active' | 'history';

export function App() {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
  const [currentView, setCurrentView] = useState<View>('home');
  const [hasActiveRide, setHasActiveRide] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Connecter WebSocket
      const token = localStorage.getItem('accessToken');
      if (token) {
        wsClient.connect(token);
      }

      // Vérifier course active
      checkActiveRide();

      return () => {
        wsClient.disconnect();
      };
    }
  }, [isAuthenticated]);

  const checkActiveRide = async () => {
    try {
      const activeRide = await api.getActiveRide();
      if (activeRide && activeRide.status !== 'completed' && activeRide.status !== 'canceled') {
        setHasActiveRide(true);
        setCurrentView('active');
      } else {
        setHasActiveRide(false);
      }
    } catch (error) {
      console.error('Error checking active ride:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    checkActiveRide();
  };

  const handleLogout = () => {
    api.logout();
    wsClient.disconnect();
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleRideRequested = () => {
    setHasActiveRide(true);
    setCurrentView('active');
  };

  const handleRideEnded = () => {
    setHasActiveRide(false);
    setCurrentView('home');
  };

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const user = api.getUser();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="header">
        <h1>ROMUO VTC</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="lang-switch">
            <button
              className={i18n.language === 'fr' ? 'active' : ''}
              onClick={() => changeLang('fr')}
            >
              FR
            </button>
            <button
              className={i18n.language === 'en' ? 'active' : ''}
              onClick={() => changeLang('en')}
            >
              EN
            </button>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {t('common.logout')}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '0.5rem 1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              background: currentView === 'home' ? 'var(--color-primary)' : 'transparent',
              color: currentView === 'home' ? 'var(--color-bg)' : 'var(--color-text)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: currentView === 'home' ? 'bold' : 'normal',
            }}
          >
            🏠 Accueil
          </button>
          {hasActiveRide && (
            <button
              onClick={() => setCurrentView('active')}
              style={{
                background: currentView === 'active' ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.2)',
                color: currentView === 'active' ? 'var(--color-bg)' : 'var(--color-primary)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: currentView === 'active' ? 'bold' : 'normal',
              }}
            >
              🚗 Course active
            </button>
          )}
          <button
            onClick={() => setCurrentView('history')}
            style={{
              background: currentView === 'history' ? 'var(--color-primary)' : 'transparent',
              color: currentView === 'history' ? 'var(--color-bg)' : 'var(--color-text)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: currentView === 'history' ? 'bold' : 'normal',
            }}
          >
            📜 {t('rider.history')}
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && !hasActiveRide && <HomePage onRideRequested={handleRideRequested} />}
        {currentView === 'active' && <ActiveRidePage onRideEnded={handleRideEnded} />}
        {currentView === 'history' && <HistoryPage />}
      </main>

      {/* Footer */}
      <footer style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem', borderTop: '1px solid var(--color-border)' }}>
        <div>
          {user && <span>👤 {user.firstName} {user.lastName}</span>}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          © 2026 ROMUO VTC • {wsClient.isConnected() ? '🟢 Connecté' : '🔴 Déconnecté'}
        </div>
      </footer>
    </div>
  );
}
