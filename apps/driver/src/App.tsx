import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { LoginRequest, Ride, RideWithDetails, WSMessage } from '@romuo-vtc/shared';
import { formatPrice } from '@romuo-vtc/shared';

// API Client simple
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

class Api {
  private token: string | null = localStorage.getItem('accessToken');

  async request(endpoint: string, options: RequestInit = {}) {
    const headers: any = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async login(data: LoginRequest) {
    const result = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.token = result.accessToken;
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  isAuth() {
    return !!this.token;
  }

  async goOnline() {
    return this.request('/api/driver/online', { method: 'POST' });
  }

  async goOffline() {
    return this.request('/api/driver/offline', { method: 'POST' });
  }

  async updateLocation(lat: number, lng: number) {
    return this.request('/api/driver/location', {
      method: 'POST',
      body: JSON.stringify({ lat, lng }),
    });
  }

  async acceptOffer(rideId: string) {
    return this.request(`/api/driver/offers/${rideId}/accept`, { method: 'POST' });
  }

  async rejectOffer(rideId: string) {
    return this.request(`/api/driver/offers/${rideId}/reject`, { method: 'POST' });
  }

  async updateRideStatus(rideId: string, status: string) {
    return this.request(`/api/driver/rides/${rideId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  }

  async getHistory() {
    return this.request('/api/driver/history');
  }

  async getStats() {
    return this.request('/api/driver/stats');
  }
}

const api = new Api();

// WebSocket
class WS {
  private ws: WebSocket | null = null;
  private handlers: Map<string, Set<(msg: WSMessage) => void>> = new Map();

  connect(token: string) {
    this.ws = new WebSocket(`${WS_URL}/ws?token=${token}`);
    this.ws.onmessage = (e) => {
      const msg: WSMessage = JSON.parse(e.data);
      this.handlers.get(msg.type)?.forEach((h) => h(msg));
    };
  }

  on(type: string, handler: (msg: WSMessage) => void) {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set());
    this.handlers.get(type)!.add(handler);
  }

  off(type: string, handler: (msg: WSMessage) => void) {
    this.handlers.get(type)?.delete(handler);
  }

  disconnect() {
    this.ws?.close();
  }
}

const ws = new WS();

// Login Page
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.login({ email, password });
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>
          ROMUO VTC - Chauffeur
        </h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <label className="label">{t('common.email')}</label>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label className="label">{t('common.password')}</label>
          <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="button" disabled={loading}>
            {loading ? t('common.loading') : t('auth.sign_in')}
          </button>
        </form>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', fontSize: '0.875rem' }}>
          <strong>Test:</strong><br />
          Email: driver1@romuo-vtc.ch<br />
          Password: password123
        </div>
      </div>
    </div>
  );
}

// Dashboard
function DashboardPage() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(false);
  const [offer, setOffer] = useState<any>(null);
  const [activeRide, setActiveRide] = useState<RideWithDetails | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [location, setLocation] = useState({ lat: 46.2044, lng: 6.1432 });

  useEffect(() => {
    loadStats();

    const handleOffer = (msg: WSMessage) => {
      if (msg.type === 'new_ride_offer') {
        setOffer(msg.payload);
      }
    };

    ws.on('new_ride_offer', handleOffer);
    return () => ws.off('new_ride_offer', handleOffer);
  }, []);

  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        api.updateLocation(location.lat, location.lng).catch(console.error);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOnline, location]);

  const loadStats = async () => {
    try {
      const s = await api.getStats();
      setStats(s);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleOnline = async () => {
    try {
      if (isOnline) {
        await api.goOffline();
        setIsOnline(false);
      } else {
        await api.goOnline();
        setIsOnline(true);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const acceptOffer = async () => {
    if (!offer) return;
    try {
      const ride = await api.acceptOffer(offer.rideId);
      setActiveRide(ride);
      setOffer(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const rejectOffer = async () => {
    if (!offer) return;
    try {
      await api.rejectOffer(offer.rideId);
      setOffer(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const updateStatus = async (status: string) => {
    if (!activeRide) return;
    try {
      await api.updateRideStatus(activeRide.id, status);
      if (status === 'completed') {
        setActiveRide(null);
        loadStats();
      } else {
        const updated = await api.acceptOffer(activeRide.id);
        setActiveRide(updated);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>{t('driver.dashboard_title')}</h1>

      {/* Online Toggle */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {isOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
          </span>
          <button onClick={toggleOnline} className={isOnline ? 'button button-secondary' : 'button'}>
            {isOnline ? t('driver.go_offline') : t('driver.go_online')}
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="label">Courses aujourd'hui</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{stats.todayRides}</div>
            </div>
            <div>
              <div className="label">Gains aujourd'hui</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {formatPrice(stats.todayEarnings)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      {isOnline && (
        <div className="card">
          <div className="label">Position GPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <input
              type="number"
              step="any"
              className="input"
              value={location.lat}
              onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              step="any"
              className="input"
              value={location.lng}
              onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
            />
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            Position mise à jour toutes les 5 secondes
          </p>
        </div>
      )}

      {/* Offer */}
      {offer && (
        <div className="card" style={{ border: '2px solid var(--color-primary)', animation: 'pulse 2s infinite' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>🔔 Nouvelle course !</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div>📍 {offer.pickupAddress}</div>
            <div style={{ color: 'var(--color-primary)' }}>🎯 {offer.dropoffAddress}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div className="label">Distance</div>
              <div>{offer.estimatedDistanceKm.toFixed(1)} km</div>
            </div>
            <div>
              <div className="label">Gain estimé</div>
              <div style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{formatPrice(offer.estimatedPrice)}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button onClick={acceptOffer} className="button">
              ✅ Accepter
            </button>
            <button onClick={rejectOffer} className="button button-secondary">
              ❌ Refuser
            </button>
          </div>
        </div>
      )}

      {/* Active Ride */}
      {activeRide && (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>Course active</h2>
          <div style={{ marginBottom: '1rem' }}>
            <span className={`status-badge status-${activeRide.status}`}>{activeRide.status}</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div>📍 {activeRide.pickupAddress}</div>
            <div style={{ color: 'var(--color-primary)' }}>🎯 {activeRide.dropoffAddress}</div>
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {activeRide.status === 'accepted' && (
              <button onClick={() => updateStatus('en_route')} className="button">
                🚗 En route
              </button>
            )}
            {activeRide.status === 'en_route' && (
              <button onClick={() => updateStatus('arrived')} className="button">
                📍 Arrivé
              </button>
            )}
            {activeRide.status === 'arrived' && (
              <button onClick={() => updateStatus('in_trip')} className="button">
                🏁 Démarrer la course
              </button>
            )}
            {activeRide.status === 'in_trip' && (
              <button onClick={() => updateStatus('completed')} className="button">
                ✅ Terminer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Main App
export function App() {
  const { t, i18n } = useTranslation();
  const [isAuth, setIsAuth] = useState(api.isAuth());

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem('accessToken');
      if (token) ws.connect(token);
      return () => ws.disconnect();
    }
  }, [isAuth]);

  const logout = () => {
    api.logout();
    ws.disconnect();
    setIsAuth(false);
  };

  if (!isAuth) return <LoginPage onLogin={() => setIsAuth(true)} />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="header">
        <h1>ROMUO VTC - Chauffeur</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="lang-switch">
            <button className={i18n.language === 'fr' ? 'active' : ''} onClick={() => i18n.changeLanguage('fr')}>
              FR
            </button>
            <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>
              EN
            </button>
          </div>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
            {t('common.logout')}
          </button>
        </div>
      </header>
      <main style={{ flex: 1 }}>
        <DashboardPage />
      </main>
      <footer style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem', borderTop: '1px solid var(--color-border)' }}>
        © 2026 ROMUO VTC
      </footer>
    </div>
  );
}
