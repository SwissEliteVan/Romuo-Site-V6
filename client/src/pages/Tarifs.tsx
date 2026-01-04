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
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#2d3748]">
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Trajet / Service</th>
                      <th className="text-right py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Standard</th>
                      <th className="text-right py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Business</th>
                      <th className="text-right py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base text-[#ffffff]">Van</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { route: 'Genève → Aéroport Genève (GVA)', standard: '65', business: '80', van: '90' },
                      { route: 'Lausanne → Aéroport Genève (GVA)', standard: '210', business: '250', van: '290' },
                      { route: 'Genève → Lausanne', standard: '210', business: '250', van: '290' },
                      { route: 'Montreux → Genève', standard: '290', business: '350', van: '390' },
                      { route: 'Mise à disposition 3h', standard: '330', business: '400', van: '450' },
                      { route: 'Mise à disposition journée (8h)', standard: '880', business: '1050', van: '1200' },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-[#2d3748]/50 last:border-0">
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base text-[#cccccc]">{item.route}</td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-right text-sm sm:text-base text-[#d4af37] font-semibold whitespace-nowrap">
                          dès {item.standard} CHF
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-right text-sm sm:text-base text-[#d4af37] font-semibold whitespace-nowrap">
                          dès {item.business} CHF
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-right text-sm sm:text-base text-[#d4af37] font-semibold whitespace-nowrap">
                          dès {item.van} CHF
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#d4af37]/10 border-l-4 border-[#d4af37]">
                <p className="text-xs sm:text-sm text-[#cccccc]">
                  <strong className="text-[#ffffff]">Tarifs indicatifs "à partir de".</strong> Le prix final peut varier selon l'adresse exacte de prise en charge et de destination, l'heure de la course, les conditions de trafic et le type de véhicule choisi. Demandez un devis gratuit pour obtenir le tarif précis adapté à vos besoins.
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
