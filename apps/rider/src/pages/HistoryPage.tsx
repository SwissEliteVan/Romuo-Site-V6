import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { formatPrice } from '@romuo-vtc/shared';
import type { Ride } from '@romuo-vtc/shared';

export function HistoryPage() {
  const { t } = useTranslation();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await api.getRideHistory();
      setRides(history);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem' }}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>{t('rider.history')}</h1>

      {error && <div className="error">{error}</div>}

      {rides.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {t('rider.no_rides')}
          </p>
        </div>
      ) : (
        <div>
          {rides.map((ride) => (
            <div key={ride.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className={`status-badge status-${ride.status}`}>
                  {t(`ride_status.${ride.status}`)}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {new Date(ride.requestedAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  📍 {ride.pickupAddress}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                  🎯 {ride.dropoffAddress}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {ride.estimatedDistanceKm.toFixed(1)} km • {ride.estimatedDurationMin} min
                  </span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  {formatPrice(ride.finalPrice || ride.estimatedPrice)}
                </div>
              </div>

              {ride.canceledAt && ride.cancellationReason && (
                <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 68, 68, 0.1)', borderRadius: '4px', fontSize: '0.875rem' }}>
                  ❌ {ride.cancellationReason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
