import { Check } from 'lucide-react';
import { Link } from 'wouter';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { breadcrumbSchema } from '../utils/jsonLd';

export default function Tarifs() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://romuo-vtc.ch/' },
    { name: 'Tarifs', url: 'https://romuo-vtc.ch/tarifs' },
  ]);

  return (
    <>
      <SEO
        title="Tarifs transparents VTC en Suisse | ROMUO VTC - Devis gratuit"
        description="Tarifs VTC compétitifs et transparents en Suisse. Devis instantané gratuit. Transfert aéroport, business, longue distance. Paiement flexible."
        keywords="tarif VTC Suisse, prix chauffeur privé Genève, devis VTC gratuit, tarif transfert aéroport, prix transport premium Suisse"
        jsonLd={breadcrumbs}
      />

      {/* Hero Section */}
      <Section spacing="lg" className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <Container>
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Tarifs <span className="text-[#d4af37]">transparents</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#cccccc] leading-relaxed">
              Pas de mauvaise surprise. Des tarifs clairs et compétitifs pour tous nos services.
            </p>
          </div>
        </Container>
      </Section>

      {/* Politique tarifaire */}
      <Section variant="light" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              Notre politique tarifaire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                  Tarifs tout compris
                </h3>
                <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                  Nos tarifs incluent le carburant, les péages, les parkings et l'attente raisonnable.
                  Pas de frais cachés.
                </p>
              </Card>

              <Card>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                  Devis instantané gratuit
                </h3>
                <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                  Demandez un devis gratuit en quelques clics. Réponse rapide avec tarif fixe garanti.
                </p>
              </Card>

              <Card>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                  Paiement flexible
                </h3>
                <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                  Espèces, carte bancaire, virement ou facture entreprise. Choisissez ce qui vous convient.
                </p>
              </Card>

              <Card>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                  Tarifs entreprise
                </h3>
                <p className="text-sm sm:text-base text-[#cccccc] leading-relaxed">
                  Tarifs dégressifs et facturation simplifiée pour les entreprises et trajets réguliers.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Exemples de tarifs */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">
              Exemples de tarifs indicatifs
            </h2>
            <p className="text-center text-sm sm:text-base text-[#999999] mb-6 sm:mb-8">
              Les tarifs définitifs sont calculés selon votre itinéraire exact et vos besoins spécifiques
            </p>

            <Card variant="outline" className="mb-6 sm:mb-8">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#2d3748]">
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Trajet</th>
                      <th className="text-right py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Tarif indicatif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { route: 'Genève → Aéroport Genève (GVA)', price: 'À compléter' },
                      { route: 'Lausanne → Aéroport Genève (GVA)', price: 'À compléter' },
                      { route: 'Genève → Lausanne', price: 'À compléter' },
                      { route: 'Montreux → Genève', price: 'À compléter' },
                      { route: 'Mise à disposition 3h', price: 'À compléter' },
                      { route: 'Mise à disposition journée', price: 'À compléter' },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-[#2d3748]/50 last:border-0">
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base text-[#cccccc]">{item.route}</td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-right text-sm sm:text-base text-[#d4af37] font-semibold whitespace-nowrap">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#d4af37]/10 border-l-4 border-[#d4af37]">
                <p className="text-xs sm:text-sm text-[#cccccc]">
                  <strong className="text-[#ffffff]">Note :</strong> Les tarifs exacts sont calculés en fonction de la distance,
                  du trafic, de l'heure et du type de service. Demandez un devis gratuit pour connaître le prix précis de votre course.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Devis */}
      <Section variant="dark" spacing="md" className="border-t border-[#2d3748]">
        <Container>
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Demandez votre devis gratuit
            </h2>
            <p className="text-base sm:text-lg text-[#cccccc] mb-6 sm:mb-8">
              Remplissez notre formulaire ou appelez-nous pour obtenir un tarif personnalisé en quelques minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">Obtenir un devis</Button>
              </Link>
              <a href="tel:+41760842089" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
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
