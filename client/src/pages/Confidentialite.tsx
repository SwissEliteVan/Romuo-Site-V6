import SEO from '../components/seo/SEO';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

export default function Confidentialite() {
  return (
    <>
      <SEO
        title="Politique de confidentialité | ROMUO VTC"
        description="Politique de confidentialité et protection des données personnelles de ROMUO VTC, conforme à la LPD suisse et au RGPD."
        noindex={true}
      />

      <Section spacing="lg" className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Politique de <span className="text-[#d4af37]">confidentialité</span>
            </h1>
            <p className="text-lg text-[#cccccc]">
              Protection de vos données personnelles
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="light" spacing="lg">
        <Container size="md">
          <div className="prose prose-invert max-w-none space-y-8">
            <Card>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <div className="space-y-3 text-[#cccccc]">
                <p>
                  ROMUO VTC s'engage à protéger la vie privée de ses clients et utilisateurs.
                  Cette politique de confidentialité décrit comment nous collectons, utilisons,
                  stockons et protégeons vos données personnelles.
                </p>
                <p>
                  Nous traitons vos données conformément à :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>La Loi fédérale sur la protection des données (LPD) suisse</li>
                  <li>Le Règlement général sur la protection des données (RGPD) si applicable</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">2. Responsable du traitement</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p><strong className="text-[#ffffff]">Responsable :</strong> ROMUO VTC</p>
                <p><strong className="text-[#ffffff]">Adresse :</strong> À compléter</p>
                <p><strong className="text-[#ffffff]">Contact :</strong> contact@romuo-vtc.ch</p>
                <p><strong className="text-[#ffffff]">Téléphone :</strong> 076 084 20 89</p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">3. Données collectées</h2>
              <div className="space-y-4 text-[#cccccc]">
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">3.1. Données que vous nous fournissez</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresses de départ et d'arrivée</li>
                    <li>Date et heure de réservation</li>
                    <li>Nombre de passagers</li>
                    <li>Demandes spécifiques (bagages, équipements, etc.)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-2">3.2. Données collectées automatiquement</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur et système d'exploitation</li>
                    <li>Pages visitées et durée de visite</li>
                    <li>Données de géolocalisation (avec votre consentement)</li>
                    <li>Cookies et technologies similaires</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">4. Finalités du traitement</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p>Nous utilisons vos données personnelles pour :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Traiter vos réservations et demandes de devis</li>
                  <li>Communiquer avec vous concernant nos services</li>
                  <li>Améliorer la qualité de nos services</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Analyser l'utilisation du site web (avec votre consentement)</li>
                  <li>Vous envoyer des informations commerciales (avec votre consentement)</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">5. Base légale du traitement</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p>Nous traitons vos données sur la base de :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong className="text-[#ffffff]">Exécution du contrat :</strong> pour fournir nos services de transport</li>
                  <li><strong className="text-[#ffffff]">Consentement :</strong> pour les cookies et communications marketing</li>
                  <li><strong className="text-[#ffffff]">Obligation légale :</strong> pour respecter les lois fiscales et comptables</li>
                  <li><strong className="text-[#ffffff]">Intérêt légitime :</strong> pour améliorer nos services</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">6. Partage des données</h2>
              <div className="space-y-3 text-[#cccccc]">
                <p>
                  Nous ne vendons ni ne louons vos données personnelles à des tiers.
                </p>
                <p>
                  Vos données peuvent être partagées uniquement avec :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nos chauffeurs partenaires (uniquement les informations nécessaires au trajet)</li>
                  <li>Nos prestataires de services (hébergement, paiement, analytics) sous contrat strict</li>
                  <li>Les autorités compétentes en cas d'obligation légale</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">7. Conservation des données</h2>
              <p className="text-[#cccccc]">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-[#cccccc]">
                <li>Fournir nos services</li>
                <li>Respecter nos obligations légales (10 ans pour la comptabilité)</li>
                <li>Résoudre d'éventuels litiges</li>
              </ul>
              <p className="text-[#cccccc] mt-3">
                Au-delà de cette période, vos données sont supprimées ou anonymisées.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">8. Vos droits</h2>
              <div className="space-y-2 text-[#cccccc]">
                <p>Conformément à la LPD et au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong className="text-[#ffffff]">Droit d'accès :</strong> obtenir une copie de vos données</li>
                  <li><strong className="text-[#ffffff]">Droit de rectification :</strong> corriger vos données inexactes</li>
                  <li><strong className="text-[#ffffff]">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong className="text-[#ffffff]">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                  <li><strong className="text-[#ffffff]">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                  <li><strong className="text-[#ffffff]">Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
                </ul>
                <p className="mt-4">
                  Pour exercer vos droits, contactez-nous à : <strong className="text-[#d4af37]">contact@romuo-vtc.ch</strong>
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">9. Sécurité des données</h2>
              <p className="text-[#cccccc]">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données contre tout accès non autorisé, perte, destruction ou divulgation.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">10. Transferts internationaux</h2>
              <p className="text-[#cccccc]">
                Vos données sont principalement stockées en Suisse et dans l'Union européenne.
                Si des transferts vers des pays tiers sont nécessaires, nous nous assurons
                qu'ils bénéficient d'un niveau de protection adéquat.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">11. Réclamation</h2>
              <p className="text-[#cccccc]">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer
                une réclamation auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">12. Modifications</h2>
              <p className="text-[#cccccc]">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                La version la plus récente sera toujours disponible sur cette page.
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
