import SEO from '../components/seo/SEO';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

export default function Cookies() {
  return (
    <>
      <SEO
        title="Politique relative aux cookies | ROMUO VTC"
        description="Politique d'utilisation des cookies sur le site ROMUO VTC. Gestion de vos préférences et informations sur les cookies utilisés."
        noindex={true}
      />

      <Section spacing="lg" className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-3xl" />

        <Container>
          <div className="text-center max-w-3xl mx-auto relative animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Politique relative aux <span className="text-gradient">cookies</span>
            </h1>
            <p className="text-lg text-[#cccccc]">
              Comment nous utilisons les cookies et comment les gérer
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="light" spacing="lg">
        <Container size="md">
          <div className="prose prose-invert max-w-none space-y-8">
            <Card>
              <h2 className="text-2xl font-bold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-[#cccccc]">
                Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette)
                lorsque vous visitez un site web. Les cookies permettent au site de reconnaître votre appareil
                et de mémoriser vos préférences et actions.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">2. Types de cookies utilisés</h2>
              <div className="space-y-4 text-[#cccccc]">
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">2.1. Cookies strictement nécessaires</h3>
                  <p>
                    Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent
                    de naviguer et d'utiliser les fonctionnalités essentielles du site.
                  </p>
                  <p className="text-sm mt-2 italic">
                    Base légale : Intérêt légitime (fonctionnement du site)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">2.2. Cookies de préférences</h3>
                  <p>
                    Ces cookies permettent au site de mémoriser vos choix (langue, région, préférences d'affichage)
                    pour vous offrir une expérience personnalisée.
                  </p>
                  <p className="text-sm mt-2 italic">
                    Base légale : Consentement
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">2.3. Cookies analytiques (Google Analytics 4)</h3>
                  <p>
                    Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site
                    (pages visitées, durée de visite, provenance). Nous utilisons Google Analytics 4 pour ces analyses.
                  </p>
                  <p className="text-sm mt-2 italic">
                    Base légale : Consentement
                  </p>
                  <p className="text-sm mt-2">
                    <strong className="text-[#ffffff]">Durée :</strong> Jusqu'à 14 mois
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">2.4. Cookies de géolocalisation</h3>
                  <p>
                    Avec votre autorisation, nous utilisons des cookies pour détecter votre position
                    et faciliter la saisie d'adresses dans le formulaire de réservation.
                  </p>
                  <p className="text-sm mt-2 italic">
                    Base légale : Consentement explicite
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">3. Cookies tiers</h2>
              <div className="space-y-3 text-[#cccccc]">
                <p>Nous utilisons les services tiers suivants, qui peuvent déposer leurs propres cookies :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-[#ffffff]">Google Analytics 4 :</strong> Analyse d'audience
                    <br />
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4af37] hover:text-[#e4bf47] transition-colors text-sm relative group/link"
                    >
                      Politique de confidentialité Google
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
                    </a>
                  </li>
                  <li>
                    <strong className="text-[#ffffff]">Google Maps / Mapbox :</strong> Carte interactive et calcul d'itinéraire
                    <br />
                    <span className="text-sm">Cookies déposés uniquement si vous utilisez la carte</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">4. Gestion de vos préférences</h2>
              <div className="space-y-4 text-[#cccccc]">
                <p>
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies.
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">4.1. Panneau de consentement</h3>
                  <p>
                    Lors de votre première visite, un bandeau vous demande votre consentement.
                    Vous pouvez accepter ou refuser les cookies non essentiels.
                  </p>
                  <p className="mt-2">
                    Pour modifier vos choix ultérieurement, vous pouvez :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Supprimer les cookies de votre navigateur (vos préférences seront réinitialisées)</li>
                    <li>Cliquer sur "Gérer les cookies" en bas de page (si implémenté)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">4.2. Paramètres du navigateur</h3>
                  <p>
                    Vous pouvez configurer votre navigateur pour :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Bloquer tous les cookies</li>
                    <li>Accepter uniquement les cookies de sites de confiance</li>
                    <li>Supprimer les cookies à chaque fermeture du navigateur</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    <strong className="text-[#ffffff]">Attention :</strong> Le blocage de tous les cookies
                    peut affecter votre expérience de navigation et certaines fonctionnalités du site
                    pourraient ne plus fonctionner correctement.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border-l-4 border-[#d4af37] shadow-lg shadow-[#d4af37]/5">
                  <p className="text-sm">
                    <strong className="text-gradient">Liens utiles pour gérer les cookies :</strong>
                  </p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] hover:text-[#e4bf47] transition-colors relative group/link"
                      >
                        Google Chrome
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] hover:text-[#e4bf47] transition-colors relative group/link"
                      >
                        Mozilla Firefox
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] hover:text-[#e4bf47] transition-colors relative group/link"
                      >
                        Safari
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] hover:text-[#e4bf47] transition-colors relative group/link"
                      >
                        Microsoft Edge
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">5. Durée de conservation</h2>
              <p className="text-[#cccccc]">
                Les cookies ont une durée de vie variable selon leur type :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-[#cccccc] mt-2">
                <li><strong className="text-[#ffffff]">Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
                <li><strong className="text-[#ffffff]">Cookies persistants :</strong> Conservés jusqu'à 14 mois maximum</li>
                <li><strong className="text-[#ffffff]">Cookie de consentement :</strong> 12 mois (mémorise votre choix)</li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">6. Mise à jour de cette politique</h2>
              <p className="text-[#cccccc]">
                Nous pouvons mettre à jour cette politique relative aux cookies à tout moment.
                Nous vous encourageons à consulter régulièrement cette page pour rester informé
                de nos pratiques en matière de cookies.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
              <p className="text-[#cccccc]">
                Pour toute question concernant notre utilisation des cookies, vous pouvez nous contacter :
              </p>
              <ul className="text-[#cccccc] space-y-1 mt-2">
                <li><strong className="text-[#ffffff]">Email :</strong> contact@romuo-vtc.ch</li>
                <li><strong className="text-[#ffffff]">Téléphone :</strong> 076 084 20 89</li>
              </ul>
            </Card>

            <div className="text-center mt-8 p-4 bg-[#1a1a1a] border-t border-[#2d3748]">
              <p className="text-sm text-[#999999]">
                Dernière mise à jour : <span className="text-[#d4af37] font-semibold">{new Date().toLocaleDateString('fr-CH')}</span>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
