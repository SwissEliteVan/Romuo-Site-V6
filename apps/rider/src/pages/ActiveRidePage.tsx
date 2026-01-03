import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { wsClient } from '../services/websocket';
import { formatPrice } from '@romuo-vtc/shared';
import type { RideWithDetails, WSMessage } from '@romuo-vtc/shared';

export function ActiveRidePage({ onRideEnded }: { onRideEnded: () => void }) {
  const { t } = useTranslation();
  const [ride, setRide] = useState<RideWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    loadActiveRide();

    // WebSocket listeners
    const handleRideUpdate = (message: WSMessage) => {
      if (message.type === 'ride_status_update' || message.type === 'ride_assigned') {
        loadActiveRide();
      }
    };

    wsClient.on('ride_status_update', handleRideUpdate);
    wsClient.on('ride_assigned', handleRideUpdate);

    return () => {
      wsClient.off('ride_status_update', handleRideUpdate);
      wsClient.off('ride_assigned', handleRideUpdate);
    };
  }, []);

  const loadActiveRide = async () => {
    try {
      const activeRide = await api.getActiveRide();
      setRide(activeRide);

      if (!activeRide || activeRide.status === 'completed' || activeRide.status === 'canceled') {
        // Course terminée ou annulée
        setTimeout(() => onRideEnded(), 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!ride || !confirm(t('rider.cancel_confirm'))) return;

    setCanceling(true);
    try {
      await api.cancelRide(ride.id, 'Canceled by rider');
      onRideEnded();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCanceling(false);
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

  if (!ride) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="card">
          <p style={{ textAlign: 'center' }}>{t('rider.no_rides')}</p>
        </div>
      </div>
    );
  }

  const getStatusMessage = () => {
    switch (ride.status) {
      case 'requested':
        return t('rider.requesting_ride');
      case 'offered':
        return t('rider.waiting_driver');
      case 'accepted':
        return t('rider.driver_assigned');
      case 'en_route':
        return t('rider.driver_en_route');
      case 'arrived':
        return t('rider.driver_arrived');
      case 'in_trip':
        return t('rider.in_trip');
      case 'completed':
        return t('rider.trip_completed');
      case 'canceled':
        return t('rider.trip_canceled');
      default:
        return ride.status;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Course en cours</h1>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className={`status-badge status-${ride.status}`}>
            {getStatusMessage()}
          </span>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="label">Trajet</div>
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            📍 {ride.pickupAddress}
          </div>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
            🎯 {ride.dropoffAddress}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div className="label">{t('rider.distance')}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {ride.estimatedDistanceKm.toFixed(1)} km
            </div>
          </div>
          <div>
            <div className="label">Prix</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              {formatPrice(ride.estimatedPrice)}
            </div>
          </div>
        </div>

        {ride.driver && (
          <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <div className="label">{t('rider.your_driver')}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {ride.driver.firstName} {ride.driver.lastName}
            </div>
            {ride.driver.vehicle && (
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                🚗 {ride.driver.vehicle.make} {ride.driver.vehicle.model} ({ride.driver.vehicle.color})<br />
                {ride.driver.vehicle.licensePlate}
              </div>
            )}
            {ride.driver.phone && (
              <div style={{ marginTop: '0.5rem' }}>
                <a href={`tel:${ride.driver.phone}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                  📞 {ride.driver.phone}
                </a>
              </div>
            )}
          </div>
        )}

        {ride.status === 'requested' || ride.status === 'offered' ? (
          <>
            <div className="loading" style={{ padding: '1rem 0' }}>
              <div className="spinner"></div>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Recherche d'un chauffeur disponible...
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="button button-secondary"
              disabled={canceling}
            >
              {canceling ? t('common.loading') : t('rider.cancel_ride')}
            </button>
          </>
        ) : ride.status === 'accepted' || ride.status === 'en_route' || ride.status === 'arrived' ? (
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <p>✅ Votre chauffeur arrive !</p>
            {ride.status === 'arrived' && (
              <p style={{ marginTop: '0.5rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                🎉 Le chauffeur est arrivé
              </p>
            )}
          </div>
        ) : ride.status === 'in_trip' ? (
          <div style={{ padding: '1rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <p>🚗 Course en cours...</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Bon voyage !
            </p>
          </div>
        ) : ride.status === 'completed' ? (
          <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>✅ Course terminée</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              {formatPrice(ride.finalPrice || ride.estimatedPrice)}
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              Merci d'avoir utilisé ROMUO VTC !
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
