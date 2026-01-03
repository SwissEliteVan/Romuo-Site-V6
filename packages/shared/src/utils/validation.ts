import { AUTH } from '../config';

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un mot de passe
 */
export function isValidPassword(password: string): boolean {
  return password.length >= AUTH.PASSWORD_MIN_LENGTH;
}

/**
 * Valide un numéro de téléphone suisse
 * Formats acceptés: +41761234567, 0761234567, 076 123 45 67
 */
export function isValidSwissPhone(phone: string): boolean {
  const phoneRegex = /^(\+41|0)[0-9]{9}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Formate un numéro de téléphone suisse
 * +41761234567 → +41 76 123 45 67
 */
export function formatSwissPhone(phone: string): string {
  const cleanPhone = phone.replace(/\s/g, '');

  if (cleanPhone.startsWith('+41')) {
    const number = cleanPhone.slice(3);
    return `+41 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 7)} ${number.slice(7)}`;
  }

  if (cleanPhone.startsWith('0')) {
    return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 8)} ${cleanPhone.slice(8)}`;
  }

  return phone;
}

/**
 * Valide des coordonnées GPS
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Sanitize une chaîne de caractères (prévention XSS basique)
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
