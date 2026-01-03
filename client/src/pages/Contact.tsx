import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import RouteCalculator from '../components/booking/RouteCalculator';
import BookingForm from '../components/booking/BookingForm';
import { breadcrumbSchema } from '../utils/jsonLd';

export default function Contact() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://romuo-vtc.ch/' },
    { name: 'Contact', url: 'https://romuo-vtc.ch/contact' },
  ]);

  return (
    <>
      <SEO
        title="Contactez-nous - Réservation VTC Suisse | ROMUO VTC"
        description="Contactez ROMUO VTC pour réserver votre chauffeur privé en Suisse. Téléphone : 076 084 20 89. Disponible 24/7. Devis gratuit et réponse rapide."
        keywords="contact VTC Suisse, réserver chauffeur privé Genève, devis VTC, téléphone chauffeur privé Suisse"
        jsonLd={breadcrumbs}
      />

      {/* Hero Section */}
      <Section spacing="lg" className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <Container>
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-[#d4af37]">Contactez-nous</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#cccccc] leading-relaxed">
              Disponibles 24h/24, 7j/7 pour répondre à vos besoins de transport premium
            </p>
          </div>
        </Container>
      </Section>

      {/* Informations de contact */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
            <Card className="text-center">
              <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-[#d4af37] mx-auto mb-3 sm:mb-4" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Téléphone</h3>
              <a
                href="tel:+41760842089"
                className="text-[#d4af37] hover:underline text-base sm:text-lg font-semibold"
                aria-label="Appeler le 076 084 20 89"
              >
                076 084 20 89
              </a>
              <p className="text-xs sm:text-sm text-[#999999] mt-2">Disponible 24/7</p>
            </Card>

            <Card className="text-center">
              <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-[#d4af37] mx-auto mb-3 sm:mb-4" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Email</h3>
              <a
                href="mailto:contact@romuo-vtc.ch"
                className="text-[#d4af37] hover:underline text-sm sm:text-base break-all"
                aria-label="Envoyer un email à contact@romuo-vtc.ch"
              >
                contact@romuo-vtc.ch
              </a>
              <p className="text-xs sm:text-sm text-[#999999] mt-2">Réponse sous 24h</p>
            </Card>

            <Card className="text-center">
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-[#d4af37] mx-auto mb-3 sm:mb-4" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Horaires</h3>
              <p className="text-[#ffffff] font-semibold text-sm sm:text-base">24h/24 - 7j/7</p>
              <p className="text-xs sm:text-sm text-[#999999] mt-2">Sur réservation</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Calculateur de devis */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Estimez votre trajet</h2>
              <p className="text-sm sm:text-base text-[#999999]">
                Obtenez une estimation instantanée de distance, durée et tarif
              </p>
            </div>
            <RouteCalculator />
          </div>
        </Container>
      </Section>

      {/* Formulaire de réservation complet */}
      <Section spacing="lg">
        <Container>

          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Demander un devis personnalisé</h2>
              <p className="text-sm sm:text-base text-[#999999]">
                Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement
              </p>
            </div>

            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-b border-[#2d3748] pb-2">
                    Vos informations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nom complet"
                      name="nom"
                      type="text"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                    />
                    <Input
                      label="Téléphone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      placeholder="+41 76 123 45 67"
                    />
                  </div>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.ch"
                  />
                </div>

                {/* Détails du trajet */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-b border-[#2d3748] pb-2">
                    Détails du trajet
                  </h3>
                  <Input
                    label="Point de départ"
                    name="depart"
                    type="text"
                    value={formData.depart}
                    onChange={handleChange}
                    required
                    placeholder="Adresse de départ"
                  />
                  <Input
                    label="Destination"
                    name="arrivee"
                    type="text"
                    value={formData.arrivee}
                    onChange={handleChange}
                    required
                    placeholder="Adresse d'arrivée"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Heure"
                      name="heure"
                      type="time"
                      value={formData.heure}
                      onChange={handleChange}
                      required
                    />
                    <div className="w-full">
                      <label
                        htmlFor="passagers"
                        className="mb-2 block text-sm font-medium text-[#ffffff]"
                      >
                        Passagers <span className="ml-1 text-[#d4af37]">*</span>
                      </label>
                      <select
                        id="passagers"
                        name="passagers"
                        value={formData.passagers}
                        onChange={handleChange}
                        required
                        className="w-full rounded-none border-2 border-[#2d3748] bg-[#1a1a1a] px-4 py-3 text-[#ffffff] focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 min-h-[48px]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'passager' : 'passagers'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#ffffff]"
                  >
                    Message ou demandes spécifiques
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Bagages, équipements spéciaux, informations complémentaires..."
                    className="w-full rounded-none border-2 border-[#2d3748] bg-[#1a1a1a] px-4 py-3 text-[#ffffff] placeholder:text-[#666666] focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                  />
                </div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border-l-4 border-green-500 text-green-400">
                    ✅ Votre demande a été envoyée avec succès ! Nous vous recontacterons très rapidement.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400">
                    ❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="group"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Envoyer la demande
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-[#666666]">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande.
                  Consultez notre{' '}
                  <a href="/confidentialite" className="text-[#d4af37] hover:underline">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </form>
            </Card>

          </div>
        </Container>
      </Section>

      {/* Zone desservie */}
      <Section variant="light" spacing="md">
        <Container>
          <div className="text-center max-w-3xl mx-auto px-4">
            <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-[#d4af37] mx-auto mb-3 sm:mb-4" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Zone d'intervention</h2>
            <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
              Nous intervenons dans toute la Suisse romande (Genève, Lausanne, Montreux, Vevey, Nyon, etc.)
              et proposons également des trajets longue distance vers toute la Suisse et les pays limitrophes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
