import SEO from '../components/seo/SEO';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

export default function MentionsLegales() {
  return (
    <>
      <SEO
        title="Mentions légales - Impressum | ROMUO VTC"
        description="Mentions légales et informations juridiques de ROMUO VTC, service de transport premium en Suisse."
        noindex={true}
      />

      <Section spacing="lg" className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentions <span className="text-[#d4af37]">légales</span>
            </h1>
            <p className="text-lg text-[#cccccc]">
              Informations juridiques et impressum
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="light" spacing="lg">
        <Container size="md">
          <div className="prose prose-invert max-w-none space-y-8">
            <Card>
              <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p><strong className="text-[#ffffff]">Raison sociale :</strong> À compléter</p>
                <p><strong className="text-[#ffffff]">Forme juridique :</strong> À compléter</p>
                <p><strong className="text-[#ffffff]">Numéro IDE/UID :</strong> CHE-XXX.XXX.XXX (À compléter)</p>
                <p><strong className="text-[#ffffff]">Siège social :</strong> À compléter</p>
                <p><strong className="text-[#ffffff]">Téléphone :</strong> 076 084 20 89</p>
                <p><strong className="text-[#ffffff]">Email :</strong> contact@romuo-vtc.ch</p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">2. Directeur de publication</h2>
              <p className="text-[#cccccc]">À compléter</p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">3. Hébergement</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p><strong className="text-[#ffffff]">Hébergeur :</strong> Hostinger International Ltd.</p>
                <p><strong className="text-[#ffffff]">Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Cyprus</p>
                <p><strong className="text-[#ffffff]">Site web :</strong> <a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">www.hostinger.com</a></p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
              <div className="space-y-3 text-[#cccccc]">
                <p>
                  L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, etc.)
                  est protégé par le droit d'auteur et le droit des marques.
                </p>
                <p>
                  Toute reproduction, distribution, modification ou utilisation non autorisée
                  des contenus de ce site est strictement interdite sans l'accord préalable écrit de ROMUO VTC.
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">5. Protection des données</h2>
              <p className="text-[#cccccc]">
                Le traitement de vos données personnelles est conforme à la Loi fédérale sur la protection
                des données (LPD) et au Règlement général sur la protection des données (RGPD) si applicable.
              </p>
              <p className="text-[#cccccc] mt-3">
                Pour plus d'informations, consultez notre{' '}
                <a href="/confidentialite" className="text-[#d4af37] hover:underline">
                  politique de confidentialité
                </a>.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
              <p className="text-[#cccccc]">
                Ce site utilise des cookies pour améliorer votre expérience de navigation
                et analyser le trafic du site. Pour en savoir plus, consultez notre{' '}
                <a href="/cookies" className="text-[#d4af37] hover:underline">
                  politique relative aux cookies
                </a>.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">7. Responsabilité</h2>
              <div className="space-y-3 text-[#cccccc]">
                <p>
                  Nous nous efforçons de fournir des informations exactes et à jour sur ce site.
                  Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité
                  des informations publiées.
                </p>
                <p>
                  ROMUO VTC ne saurait être tenu responsable des dommages directs ou indirects
                  résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">8. Liens externes</h2>
              <p className="text-[#cccccc]">
                Ce site peut contenir des liens vers des sites externes. ROMUO VTC n'exerce
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">9. Droit applicable</h2>
              <p className="text-[#cccccc]">
                Les présentes mentions légales sont régies par le droit suisse.
                En cas de litige, les tribunaux suisses seront compétents.
              </p>
            </Card>

            <div className="text-center text-sm text-[#666666] mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-CH')}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
