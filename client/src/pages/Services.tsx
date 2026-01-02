import { MapPin, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { serviceSchema, breadcrumbSchema } from '../utils/jsonLd';

const servicesData = [
  {
    id: 'transfert',
    icon: MapPin,
    title: 'Transfert aéroport',
    description:
      'Service de transfert premium depuis et vers les principaux aéroports suisses.',
    features: [
      'Surveillance du vol en temps réel',
      'Temps d\'attente gratuit inclus',
      'Assistance bagages',
      'Paiement flexible',
    ],
    details:
      'Profitez d\'un service de transfert aéroport sans stress. Nos chauffeurs surveillent votre vol en temps réel et s\'adaptent aux éventuels retards. Que vous arriviez à Genève, Zurich ou Bâle, nous vous garantissons un accueil personnalisé et un trajet confortable vers votre destination.',
  },
  {
    id: 'business',
    icon: Clock,
    title: 'Déplacements business',
    description:
      'Transport professionnel pour vos rendez-vous d\'affaires et événements.',
    features: [
      'Ponctualité garantie',
      'Discrétion absolue',
      'Wi-Fi à bord',
      'Facturation entreprise',
    ],
    details:
      'Concentrez-vous sur vos affaires, nous nous occupons du reste. Notre service business comprend la ponctualité garantie, un environnement discret pour travailler en route, et une facturation simplifiée pour les entreprises.',
  },
  {
    id: 'longue-distance',
    icon: Shield,
    title: 'Trajets longue distance',
    description:
      'Voyages inter-villes en Suisse et vers les pays limitrophes.',
    features: [
      'Véhicules grand confort',
      'Pause incluse pour longs trajets',
      'Itinéraire optimisé',
      'Devis personnalisé',
    ],
    details:
      'Pour vos déplacements longue distance, profitez de véhicules haut de gamme équipés pour le confort. Nous planifions des pauses adaptées et optimisons l\'itinéraire pour un voyage efficace et agréable.',
  },
  {
    id: 'disposition',
    icon: Star,
    title: 'Mise à disposition',
    description:
      'Chauffeur privé dédié pour vos événements ou journées complètes.',
    features: [
      'Service à l\'heure ou à la journée',
      'Itinéraire flexible',
      'Chauffeur dédié',
      'Tarif dégressif',
    ],
    details:
      'Besoin d\'un chauffeur pour une journée entière, un événement ou une tournée ? Notre service de mise à disposition vous offre une flexibilité totale avec un chauffeur dédié qui s\'adapte à vos besoins en temps réel.',
  },
];

export default function Services() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://romuo-vtc.ch/' },
    { name: 'Services', url: 'https://romuo-vtc.ch/services' },
  ]);

  const servicesJsonLd = servicesData.map((service) =>
    serviceSchema(
      service.title,
      service.description
    )
  );

  return (
    <>
      <SEO
        title="Nos services VTC premium en Suisse | ROMUO VTC"
        description="Découvrez nos services de transport VTC : transfert aéroport, déplacements business, trajets longue distance et mise à disposition. Service 24/7 en Suisse."
        keywords="services VTC Suisse, transfert aéroport Genève, transport business Suisse, chauffeur privé longue distance, mise à disposition chauffeur"
        jsonLd={[...servicesJsonLd, breadcrumbs]}
      />

      {/* Hero Section */}
      <Section spacing="lg" className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos <span className="text-[#d4af37]">services</span>
            </h1>
            <p className="text-lg md:text-xl text-[#cccccc] leading-relaxed">
              Un service adapté à chaque besoin, avec la même exigence de qualité
              et de professionnalisme
            </p>
          </div>
        </Container>
      </Section>

      {/* Services détaillés */}
      {servicesData.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        return (
          <Section
            key={service.id}
            id={service.id}
            variant={isEven ? 'default' : 'light'}
            spacing="lg"
          >
            <Container>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven && 'lg:grid-flow-dense'
                }`}
              >
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <Icon className="h-12 w-12 text-[#d4af37] mb-4" aria-hidden="true" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-[#cccccc] mb-6 leading-relaxed">
                    {service.details}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-[#ffffff]">
                        <ArrowRight className="h-5 w-5 text-[#d4af37]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button>Demander un devis</Button>
                  </Link>
                </div>
                <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <Card variant="glass" className="p-8">
                    <div className="aspect-video bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-sm flex items-center justify-center">
                      <Icon className="h-24 w-24 text-[#d4af37] opacity-50" aria-hidden="true" />
                    </div>
                  </Card>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* CTA Section */}
      <Section variant="dark" spacing="md" className="border-t border-[#2d3748]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un service sur mesure ?
            </h2>
            <p className="text-lg text-[#cccccc] mb-8">
              Vous avez un besoin spécifique ? Contactez-nous pour discuter de votre projet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Nous contacter</Button>
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
    </>
  );
}
