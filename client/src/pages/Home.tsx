import { Link } from 'wouter';
import { ArrowRight, CheckCircle, MapPin, Clock, Shield, Star, Users, Car, Quote, Phone } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import {
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  faqSchema,
} from '../utils/jsonLd';

const services = [
  {
    icon: MapPin,
    title: 'Transfert aéroport',
    description: 'Genève, Zurich, Bâle - Service ponctuel et confortable pour tous vos vols.',
    href: '/services#transfert',
  },
  {
    icon: Clock,
    title: 'Déplacements business',
    description: 'Meetings, événements professionnels - Discrétion et ponctualité garanties.',
    href: '/services#business',
  },
  {
    icon: Shield,
    title: 'Trajets longue distance',
    description: 'Voyages inter-villes en Suisse et à l\'international avec tout le confort.',
    href: '/services#longue-distance',
  },
  {
    icon: Star,
    title: 'Mise à disposition',
    description: 'Chauffeur dédié pour vos événements, tournées ou journées complètes.',
    href: '/services#disposition',
  },
];

const zones = [
  'Genève',
  'Lausanne',
  'Montreux',
  'Vevey',
  'Nyon',
  'Morges',
  'Zurich',
  'Bâle',
  'Berne',
  'Neuchâtel',
];

const vehicles = [
  {
    name: 'Berline premium',
    category: 'Confort',
    capacity: '3 passagers',
    luggage: '3 valises',
    features: ['Climatisation', 'Wi-Fi', 'Chargeur USB', 'Eau offerte'],
    description: 'Mercedes Classe E ou équivalent - Idéale pour vos trajets business et transferts aéroport.',
  },
  {
    name: 'Van premium',
    category: 'Groupe',
    capacity: '7 passagers',
    luggage: '7 valises',
    features: ['Climatisation', 'Wi-Fi', 'Chargeur USB', 'Espace généreux'],
    description: 'Mercedes Vito ou équivalent - Parfaite pour les groupes et familles avec bagages.',
  },
  {
    name: 'Berline luxe',
    category: 'Prestige',
    capacity: '3 passagers',
    luggage: '3 valises',
    features: ['Tout cuir', 'Wi-Fi', 'Minibar', 'Sièges massants'],
    description: 'Mercedes Classe S ou équivalent - L\'excellence pour vos déplacements premium.',
  },
];

const testimonials = [
  {
    name: 'Marie Dubois',
    location: 'Genève',
    rating: 5,
    text: 'Service impeccable ! Chauffeur ponctuel, très professionnel et discret. La voiture était d\'une propreté irréprochable. Je recommande vivement pour tous vos déplacements.',
    date: 'Décembre 2025',
  },
  {
    name: 'Pierre Martin',
    location: 'Lausanne',
    rating: 5,
    text: 'J\'utilise ROMUO VTC régulièrement pour mes déplacements professionnels. Toujours à l\'heure, tarifs transparents et service premium. Un vrai gain de temps.',
    date: 'Novembre 2025',
  },
  {
    name: 'Sophie Laurent',
    location: 'Montreux',
    rating: 5,
    text: 'Transfert aéroport parfait ! Le chauffeur a surveillé mon vol et m\'attendait avec une pancarte. Service 5 étoiles, je referai appel à eux sans hésiter.',
    date: 'Octobre 2025',
  },
];

const faqs = [
  {
    question: 'Comment réserver un trajet avec ROMUO VTC ?',
    answer:
      'Vous pouvez réserver par téléphone au 076 084 20 89, par email à contact@romuo-vtc.ch, ou via notre formulaire de contact en ligne. Nous recommandons de réserver à l\'avance pour garantir la disponibilité.',
  },
  {
    question: 'Quels sont vos horaires de service ?',
    answer:
      'ROMUO VTC est disponible 24h/24 et 7j/7 sur réservation. Que ce soit pour un départ matinal ou une arrivée tardive, nous nous adaptons à vos besoins.',
  },
  {
    question: 'Quelles zones géographiques couvrez-vous ?',
    answer:
      'Nous opérons dans toute la Suisse romande (Genève, Lausanne, Montreux, etc.) et proposons également des trajets longue distance vers d\'autres régions suisses et pays limitrophes.',
  },
  {
    question: 'Comment sont calculés les tarifs ?',
    answer:
      'Nos tarifs sont calculés en fonction de la distance, de la durée du trajet et du type de service. Demandez un devis gratuit et instantané pour connaître le prix exact de votre course.',
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Nous acceptons les paiements en espèces, par carte bancaire, virement bancaire et facture pour les entreprises. Le paiement peut être effectué à bord ou à l\'avance selon votre préférence.',
  },
];

export default function Home() {
  const jsonLdData = [organizationSchema, localBusinessSchema, webSiteSchema, faqSchema(faqs)];

  return (
    <>
      <SEO
        title="ROMUO VTC - Service de transport premium en Suisse | Chauffeur privé"
        description="ROMUO VTC : votre chauffeur privé en Suisse. Transferts aéroport, déplacements business et trajets longue distance. Réservation 24/7 - Service premium et ponctuel."
        keywords="VTC Suisse, chauffeur privé Genève, transport premium, transfert aéroport Genève, VTC Lausanne, taxi premium Suisse, chauffeur Montreux, VTC Vevey"
        jsonLd={jsonLdData}
      />

      {/* Hero Section Premium */}
      <Section spacing="lg" className="relative overflow-hidden min-h-[90vh] flex items-center pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-[#d4af37]/5 to-transparent pointer-events-none opacity-80"
             style={{
               backgroundSize: '200% 200%',
               animation: 'gradientShift 15s ease infinite'
             }}
        />

        {/* Radial glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none opacity-40" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture opacity-50" />

        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Title with stagger animation */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              <span className="block animate-fadeInDown opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                Votre{' '}
                <span className="text-gradient inline-block">
                  chauffeur privé
                </span>
              </span>
              <span className="block animate-fadeInDown opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                en Suisse
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-[#cccccc] mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp opacity-0"
               style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              Service VTC <span className="text-[#d4af37] font-semibold">premium</span> disponible 24/7.
              <br className="hidden sm:block" />
              Confort, ponctualité et discrétion pour tous vos déplacements.
            </p>

            {/* CTAs with glow */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp opacity-0"
                 style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              <Link href="/contact">
                <Button size="lg" className="group glow-gold-hover shadow-premium min-w-[250px]">
                  Réserver maintenant
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <a href="tel:+41760842089">
                <Button size="lg" variant="secondary" className="glow-gold-hover min-w-[250px]">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  076 084 20 89
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-center animate-fadeInUp opacity-0"
                 style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">24/7</div>
                <div className="text-sm text-[#999999]">Disponible</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">100%</div>
                <div className="text-sm text-[#999999]">Premium</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">5★</div>
                <div className="text-sm text-[#999999]">Satisfaction</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section Premium */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Nos <span className="text-gradient">services</span>
            </h2>
            <p className="text-lg md:text-xl text-[#999999] max-w-2xl mx-auto leading-relaxed">
              Un service adapté à chaque besoin, avec la même exigence de qualité
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href}>
                  <Card
                    className="h-full cursor-pointer group"
                    style={{
                      animation: 'scaleIn 0.6s ease-out forwards',
                      animationDelay: `${index * 100}ms`,
                      opacity: 0
                    }}
                  >
                    <Icon
                      className="h-12 w-12 text-[#d4af37] mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all animate-float"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#d4af37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#999999] leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir <span className="text-[#d4af37]">ROMUO VTC</span> ?
              </h2>
              <div className="space-y-4">
                {[
                  'Chauffeurs professionnels et expérimentés',
                  'Véhicules premium récents et entretenus',
                  'Ponctualité garantie',
                  'Service disponible 24h/24, 7j/7',
                  'Tarifs transparents et compétitifs',
                  'Discrétion et confidentialité',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[#cccccc] text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/services">
                <Button size="lg" variant="secondary" className="mt-8">
                  Découvrir nos services
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card variant="glass" className="p-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center h-20 w-20 border-4 border-[#d4af37] rounded-full mx-auto">
                    <Star className="h-10 w-10 text-[#d4af37] fill-[#d4af37]" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold">Excellence garantie</h3>
                  <p className="text-[#cccccc] leading-relaxed">
                    Notre engagement : vous offrir une expérience de transport premium
                    à la hauteur de vos attentes, pour chaque trajet.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Notre flotte Premium */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Notre <span className="text-gradient">flotte</span> de véhicules
            </h2>
            <p className="text-lg md:text-xl text-[#999999] max-w-2xl mx-auto leading-relaxed">
              Des véhicules premium récents, entretenus avec soin pour votre confort
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {vehicles.map((vehicle, index) => (
              <Card
                key={vehicle.name}
                className="group"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 150}ms`,
                  opacity: 0
                }}
              >
                <div className="mb-6 aspect-video bg-gradient-to-br from-[#d4af37]/10 to-[#0a0a0a] border border-[#2d3748] flex items-center justify-center group-hover:from-[#d4af37]/20 transition-all shadow-inner overflow-hidden relative">
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-all"></div>
                  <Car className="h-24 w-24 text-[#d4af37] opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all animate-float" aria-hidden="true" />
                </div>
                <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#d4af37]/10 to-[#e4bf47]/10 text-[#d4af37] text-xs font-bold mb-4 border border-[#d4af37]/30 shadow-sm">
                  {vehicle.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {vehicle.name}
                </h3>
                <p className="text-[#999999] mb-6 leading-relaxed">
                  {vehicle.description}
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-[#0a0a0a]/50 px-3 py-2 rounded-sm border border-[#2d3748]">
                    <Users className="h-5 w-5 text-[#d4af37]" aria-hidden="true" />
                    <span className="text-[#cccccc] font-medium">{vehicle.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0a0a0a]/50 px-3 py-2 rounded-sm border border-[#2d3748]">
                    <MapPin className="h-5 w-5 text-[#d4af37]" aria-hidden="true" />
                    <span className="text-[#cccccc] font-medium">{vehicle.luggage}</span>
                  </div>
                </div>
                <div className="border-t border-[#2d3748] pt-5">
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1.5 bg-[#1a1a1a] border border-[#2d3748] text-[#cccccc] hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Témoignages clients Premium */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ce que disent nos <span className="text-gradient">clients</span>
            </h2>
            <p className="text-lg md:text-xl text-[#999999] max-w-2xl mx-auto leading-relaxed">
              Votre satisfaction est notre priorité
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                variant="glass"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 150}ms`,
                  opacity: 0
                }}
              >
                <div className="mb-6">
                  <Quote className="h-10 w-10 text-[#d4af37] opacity-50 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-[#d4af37] fill-[#d4af37] animate-scaleIn"
                      style={{ animationDelay: `${index * 150 + i * 50}ms` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-[#cccccc] mb-6 leading-relaxed italic text-lg">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-[#2d3748]/50 pt-5 mt-auto">
                  <p className="font-bold text-[#ffffff] text-lg">{testimonial.name}</p>
                  <p className="text-sm text-[#999999] mt-1">{testimonial.location}</p>
                  <p className="text-xs text-[#666666] mt-2">{testimonial.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Zones desservies */}
      <Section variant="light" spacing="md">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zones desservies</h2>
            <p className="text-lg text-[#999999]">
              Toute la Suisse romande et au-delà
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {zones.map((zone) => (
              <div
                key={zone}
                className="px-6 py-3 border-2 border-[#2d3748] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200 text-[#ffffff] font-medium"
              >
                {zone}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="lg">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-lg text-[#999999]">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:border-[#d4af37] transition-colors">
                <h3 className="text-xl font-bold mb-2 text-[#ffffff]">{faq.question}</h3>
                <p className="text-[#cccccc] leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Final */}
      <Section variant="dark" spacing="md" className="border-t border-[#2d3748]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à réserver votre prochain trajet ?
            </h2>
            <p className="text-lg text-[#cccccc] mb-8">
              Contactez-nous dès maintenant pour un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Demander un devis</Button>
              </Link>
              <Link href="/tarifs">
                <Button size="lg" variant="ghost">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
