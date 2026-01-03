import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '../components/seo/SEO';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Vehicles from '../components/home/Vehicles';
import Testimonials from '../components/home/Testimonials';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import RouteCalculator from '../components/booking/RouteCalculator';
import { organizationSchema, localBusinessSchema, webSiteSchema, faqSchema } from '../utils/jsonLd';

const services = [
  {
    title: 'Transfert Aéroport',
    description: 'Service premium pour vos trajets vers Genève, Zurich, Bâle',
    icon: '✈️',
    features: ['Prise en charge à l\'aéroport', 'Suivi de vol en temps réel', 'Aide aux bagages'],
    color: 'from-blue-500/20 to-transparent',
  },
  {
    title: 'Déplacements Business',
    description: 'Solutions professionnelles pour vos rendez-vous d\'affaires',
    icon: '💼',
    features: ['Ponctualité garantie', 'Discrétion absolue', 'WiFi & recharge'],
    color: 'from-purple-500/20 to-transparent',
  },
  {
    title: 'Longue Distance',
    description: 'Voyages confortables en Suisse et pays limitrophes',
    icon: '🌍',
    features: ['Véhicules grand confort', 'Pauses régulières', 'Flexibilité totale'],
    color: 'from-green-500/20 to-transparent',
  },
  {
    title: 'Mise à Disposition',
    description: 'Chauffeur dédié pour vos événements spéciaux',
    icon: '⭐',
    features: ['Disponibilité totale', 'Service personnalisé', 'Tarif dégressif'],
    color: 'from-gold-500/20 to-transparent',
  },
];

const faqs = [
  {
    question: 'Comment réserver un trajet avec ROMUO VTC ?',
    answer: 'Vous pouvez réserver par téléphone au 076 084 20 89, par email à contact@romuo-vtc.ch, ou via notre formulaire de contact en ligne. Installation recommandée de notre app PWA pour une expérience optimale.',
  },
  {
    question: 'Quels sont vos horaires de service ?',
    answer: 'ROMUO VTC est disponible 24h/24 et 7j/7 sur réservation. Que ce soit pour un départ matinal ou une arrivée tardive, nous nous adaptons à vos besoins.',
  },
  {
    question: 'Quelles zones géographiques couvrez-vous ?',
    answer: 'Nous opérons dans toute la Suisse romande (Genève, Lausanne, Montreux, etc.) et proposons également des trajets longue distance vers d\'autres régions suisses et pays limitrophes.',
  },
  {
    question: 'Comment sont calculés les tarifs ?',
    answer: 'Nos tarifs sont calculés en fonction de la distance, de la durée du trajet et du type de service. Utilisez notre calculateur en ligne pour un devis instantané et transparent.',
  },
];

export default function Home() {
  const jsonLdData = [organizationSchema, localBusinessSchema, webSiteSchema, faqSchema(faqs)];

  return (
    <>
      <SEO
        title="ROMUO VTC - Transport Premium Suisse | Chauffeur Privé 24/7"
        description="Service de chauffeur privé haut de gamme en Suisse. Transferts aéroport, déplacements business et trajets longue distance. Flotte premium Mercedes & Tesla. Réservation 24/7."
        keywords="VTC Suisse, chauffeur privé Genève, transport premium, transfert aéroport Genève, VTC Lausanne, Mercedes VTC, Tesla VTC, chauffeur Montreux, VTC Vevey"
        jsonLd={jsonLdData}
      />

      {/* Hero Premium */}
      <Hero />

      {/* Stats & Trust Badges */}
      <Stats />

      {/* Services Premium */}
      <Section spacing="xl" className="relative bg-gradient-to-b from-black via-gray-900 to-black">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos <span className="text-gold-500">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Des solutions de transport sur mesure pour tous vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                variant="glass"
                className={`group relative overflow-hidden bg-gradient-to-br ${service.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="p-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg" className="group">
                Découvrir tous nos services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Vehicles Showcase */}
      <Vehicles />

      {/* Quote Calculator */}
      <Section spacing="xl" className="relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-blue-500/5"></div>
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Calculez votre <span className="text-gold-500">Devis</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Obtenez un tarif transparent et instantané pour votre trajet
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <RouteCalculator />
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <Section spacing="xl" className="bg-gradient-to-b from-gray-900 to-black">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Questions <span className="text-gold-500">fréquentes</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} variant="glass" className="p-6 hover:border-gold-500/50 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="xl" className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-blue-500/10"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prêt à voyager avec <span className="text-gold-500">style</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Réservez votre chauffeur privé dès maintenant et découvrez le transport premium à la suisse.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" className="group">
                  Réserver un trajet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a href="tel:+41760842089">
                <Button size="lg" variant="outline">
                  Appeler : 076 084 20 89
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
