import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { formatPrice, formatDistance, formatDuration } from '@romuo-vtc/shared';
import type { RideEstimateResponse } from '@romuo-vtc/shared';

export function HomePage({ onRideRequested }: { onRideRequested: () => void }) {
  const { t } = useTranslation();
  const [step, setStep] = useState<'input' | 'estimate'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupLat, setPickupLat] = useState('46.2044');
  const [pickupLng, setPickupLng] = useState('6.1432');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffLat, setDropoffLat] = useState('46.5197');
  const [dropoffLng, setDropoffLng] = useState('6.6323');

  // Estimate
  const [estimate, setEstimate] = useState<RideEstimateResponse | null>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.estimateRide({
        pickupLat: parseFloat(pickupLat),
        pickupLng: parseFloat(pickupLng),
        dropoffLat: parseFloat(dropoffLat),
        dropoffLng: parseFloat(dropoffLng),
      });
      setEstimate(result);
      setStep('estimate');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRide = async () => {
    setError('');
    setLoading(true);

    try {
      await api.requestRide({
        pickupAddress,
        pickupLat: parseFloat(pickupLat),
        pickupLng: parseFloat(pickupLng),
        dropoffAddress,
        dropoffLat: parseFloat(dropoffLat),
        dropoffLng: parseFloat(dropoffLng),
      });
      onRideRequested();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>{t('rider.home_title')}</h1>

      {error && <div className="error">{error}</div>}

      {step === 'input' && (
        <div className="card">
          <form onSubmit={handleEstimate}>
            <label className="label">{t('rider.pickup_placeholder')}</label>
            <input
              type="text"
              className="input"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Genève Aéroport"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label className="label" style={{ fontSize: '0.75rem' }}>Latitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={pickupLat}
                  onChange={(e) => setPickupLat(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label" style={{ fontSize: '0.75rem' }}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={pickupLng}
                  onChange={(e) => setPickupLng(e.target.value)}
                  required
                />
              </div>
            </div>

            <label className="label">{t('rider.dropoff_placeholder')}</label>
            <input
              type="text"
              className="input"
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              placeholder="Lausanne Gare"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label className="label" style={{ fontSize: '0.75rem' }}>Latitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={dropoffLat}
                  onChange={(e) => setDropoffLat(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label" style={{ fontSize: '0.75rem' }}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={dropoffLng}
                  onChange={(e) => setDropoffLng(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? t('common.loading') : t('rider.estimate_ride')}
            </button>
          </form>

          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', fontSize: '0.875rem' }}>
            <strong>💡 Example routes:</strong><br />
            Genève → Lausanne: 46.2044, 6.1432 → 46.5197, 6.6323<br />
            Genève Centre → CERN: 46.2044, 6.1432 → 46.2333, 6.0557
          </div>
        </div>
      )}

      {step === 'estimate' && estimate && (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>{t('rider.price_estimate')}</h2>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div className="label">{t('rider.distance')}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {formatDistance(estimate.distanceKm)}
              </div>
            </div>

            <div>
              <div className="label">{t('rider.duration')}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {formatDuration(estimate.durationMin)}
              </div>
            </div>

            <div>
              <div className="label">Prix estimé</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {formatPrice(estimate.price)}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(128, 128, 128, 0.1)', borderRadius: '8px' }}>
            <strong>Trajet:</strong><br />
            {pickupAddress} → {dropoffAddress}
          </div>

          <button
            onClick={handleRequestRide}
            className="button"
            disabled={loading}
            style={{ marginBottom: '0.5rem' }}
          >
            {loading ? t('rider.requesting_ride') : t('rider.request_ride')}
          </button>

          <button
            onClick={() => setStep('input')}
            className="button button-secondary"
            disabled={loading}
          >
            {t('common.back')}
          </button>
        </div>
      )}
    </div>
  );
}
