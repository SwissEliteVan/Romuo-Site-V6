import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Luggage, Send, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { trackReservationClick } from '../../utils/analytics';

interface BookingFormData {
  serviceType: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: 'transfert',
    departure: '',
    arrival: '',
    date: '',
    time: '',
    passengers: '1',
    luggage: '1',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const serviceTypes = [
    { value: 'transfert', label: 'Transfert aéroport' },
    { value: 'business', label: 'Déplacement business' },
    { value: 'longue-distance', label: 'Longue distance' },
    { value: 'disposition', label: 'Mise à disposition' },
    { value: 'autre', label: 'Autre service' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.departure.trim()) newErrors.departure = 'Le point de départ est requis';
    if (!formData.arrival.trim()) newErrors.arrival = 'La destination est requise';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.time) newErrors.time = 'L\'heure est requise';
    if (!formData.name.trim()) newErrors.name = 'Votre nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulation d'envoi (à remplacer par un vrai appel API)
      // Dans la vraie vie, vous enverriez les données à votre backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log pour debug (en production, envoyez au serveur)
      console.log('Réservation soumise:', formData);

      trackReservationClick('booking_form');
      setSubmitStatus('success');

      // Reset du formulaire après succès
      setTimeout(() => {
        setFormData({
          serviceType: 'transfert',
          departure: '',
          arrival: '',
          date: '',
          time: '',
          passengers: '1',
          luggage: '1',
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card variant="glass" className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Réserver un trajet</h2>
        <p className="text-[#999999]">
          Remplissez le formulaire ci-dessous pour recevoir une confirmation rapide
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border-l-4 border-green-500 text-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Demande envoyée avec succès !</strong>
              <p className="text-sm mt-1">
                Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Erreur lors de l'envoi</strong>
              <p className="text-sm mt-1">
                Veuillez réessayer ou nous contacter directement au 076 084 20 89.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type de service */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[#ffffff]">
            Type de service
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceTypes.map((service) => (
              <button
                key={service.value}
                type="button"
                onClick={() => handleChange('serviceType', service.value)}
                className={`p-3 border-2 transition-all text-left ${
                  formData.serviceType === service.value
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#ffffff]'
                    : 'border-[#2d3748] hover:border-[#d4af37]/50 text-[#cccccc]'
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>

        {/* Itinéraire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Point de départ"
              placeholder="Ex: Genève Aéroport"
              value={formData.departure}
              onChange={(e) => handleChange('departure', e.target.value)}
              required
              error={errors.departure}
            />
          </div>
          <div>
            <Input
              label="Destination"
              placeholder="Ex: Lausanne Centre"
              value={formData.arrival}
              onChange={(e) => handleChange('arrival', e.target.value)}
              required
              error={errors.arrival}
            />
          </div>
        </div>

        {/* Date et heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#ffffff]">
              <Calendar className="inline h-4 w-4 mr-1" aria-hidden="true" />
              Date du trajet
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={today}
              required
              className={`w-full px-4 py-3 bg-[#1a1a1a] border-2 ${
                errors.date ? 'border-red-500' : 'border-[#2d3748]'
              } text-[#ffffff] focus:border-[#d4af37] focus:outline-none transition-colors`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[#ffffff]">
              <Clock className="inline h-4 w-4 mr-1" aria-hidden="true" />
              Heure de prise en charge
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              required
              className={`w-full px-4 py-3 bg-[#1a1a1a] border-2 ${
                errors.time ? 'border-red-500' : 'border-[#2d3748]'
              } text-[#ffffff] focus:border-[#d4af37] focus:outline-none transition-colors`}
            />
            {errors.time && <p className="mt-1 text-sm text-red-400">{errors.time}</p>}
          </div>
        </div>

        {/* Passagers et bagages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#ffffff]">
              <Users className="inline h-4 w-4 mr-1" aria-hidden="true" />
              Nombre de passagers
            </label>
            <select
              value={formData.passengers}
              onChange={(e) => handleChange('passengers', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#2d3748] text-[#ffffff] focus:border-[#d4af37] focus:outline-none transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'passager' : 'passagers'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[#ffffff]">
              <Luggage className="inline h-4 w-4 mr-1" aria-hidden="true" />
              Nombre de bagages
            </label>
            <select
              value={formData.luggage}
              onChange={(e) => handleChange('luggage', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#2d3748] text-[#ffffff] focus:border-[#d4af37] focus:outline-none transition-colors"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num <= 1 ? 'bagage' : 'bagages'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="border-t border-[#2d3748] pt-6">
          <h3 className="text-xl font-bold mb-4">Vos informations</h3>
          <div className="space-y-4">
            <Input
              label="Nom complet"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              error={errors.name}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="jean.dupont@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                error={errors.email}
              />
              <Input
                label="Téléphone"
                type="tel"
                placeholder="+41 76 123 45 67"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                error={errors.phone}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#ffffff]">
                Message (optionnel)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Informations complémentaires, demandes spéciales..."
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#2d3748] text-[#ffffff] focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Bouton d'envoi */}
        <div className="border-t border-[#2d3748] pt-6">
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className="group text-lg py-4"
          >
            {isSubmitting ? (
              'Envoi en cours...'
            ) : (
              <>
                Envoyer la demande de réservation
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </>
            )}
          </Button>
          <p className="text-center text-sm text-[#666666] mt-4">
            En soumettant ce formulaire, vous acceptez d'être contacté par ROMUO VTC pour confirmer votre réservation.
          </p>
        </div>
      </form>

      <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2d3748]">
        <p className="text-sm text-[#cccccc]">
          <strong className="text-[#d4af37]">Besoin d'une réponse immédiate ?</strong> Appelez-nous directement au{' '}
          <a href="tel:+41760842089" className="text-[#d4af37] hover:underline font-bold">
            076 084 20 89
          </a>
        </p>
      </div>
    </Card>
  );
}
