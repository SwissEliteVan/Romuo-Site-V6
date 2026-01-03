import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await api.register({
          email,
          password,
          firstName,
          lastName,
          phone,
          role: 'rider',
          locale: 'fr',
        });
      } else {
        await api.login({ email, password });
      }
      onLogin();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>
          {t('common.app_name')}
        </h1>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isRegister ? t('auth.register_title') : t('auth.login_title')}
        </h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label className="label">{t('common.first_name')}</label>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label className="label">{t('common.last_name')}</label>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label className="label">{t('common.phone')}</label>
              <input
                type="tel"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+41 76 123 45 67"
                required
              />
            </>
          )}

          <label className="label">{t('common.email')}</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email_placeholder')}
            required
          />

          <label className="label">{t('common.password')}</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password_placeholder')}
            required
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? t('common.loading') : isRegister ? t('auth.create_account') : t('auth.sign_in')}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isRegister ? t('auth.already_have_account') : t('auth.no_account')}
          </button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', fontSize: '0.875rem' }}>
          <strong>Test account:</strong><br />
          Email: rider1@example.com<br />
          Password: password123
        </div>
      </div>
    </div>
  );
}
