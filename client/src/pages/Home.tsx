import { Link } from 'wouter';
import { ArrowRight, CheckCircle, MapPin, Clock, Shield, Star } from 'lucide-react';
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

      {/* Hero Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent pointer-events-none" />
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre <span className="text-[#d4af37]">chauffeur privé</span>
              <br />
              en Suisse
            </h1>
            <p className="text-lg md:text-xl text-[#cccccc] mb-8 max-w-2xl mx-auto leading-relaxed">
              Service VTC premium disponible 24/7. Confort, ponctualité et discrétion
              pour tous vos déplacements professionnels et personnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Réserver maintenant
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <a href="tel:+41760842089">
                <Button size="lg" variant="secondary">
                  076 084 20 89
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos services</h2>
            <p className="text-lg text-[#999999] max-w-2xl mx-auto">
              Un service adapté à chaque besoin, avec la même exigence de qualité
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href}>
                  <Card className="h-full hover:border-[#d4af37] transition-all duration-300 cursor-pointer group">
                    <Icon className="h-10 w-10 text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#999999] text-sm leading-relaxed">
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
