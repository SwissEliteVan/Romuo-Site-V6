import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page non trouvée - 404 | ROMUO VTC"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        noindex={true}
      />

      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <span className="text-9xl font-bold text-[#d4af37]">404</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Page non trouvée
            </h1>
            <p className="text-lg md:text-xl text-[#cccccc] mb-8 leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              Peut-être cherchiez-vous l'une de ces pages ?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link href="/">
                <div className="p-4 border-2 border-[#2d3748] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer rounded-sm">
                  <h3 className="font-bold text-[#ffffff] mb-1">Accueil</h3>
                  <p className="text-sm text-[#999999]">Retour à la page d'accueil</p>
                </div>
              </Link>

              <Link href="/services">
                <div className="p-4 border-2 border-[#2d3748] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer rounded-sm">
                  <h3 className="font-bold text-[#ffffff] mb-1">Services</h3>
                  <p className="text-sm text-[#999999]">Découvrez nos services VTC</p>
                </div>
              </Link>

              <Link href="/tarifs">
                <div className="p-4 border-2 border-[#2d3748] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer rounded-sm">
                  <h3 className="font-bold text-[#ffffff] mb-1">Tarifs</h3>
                  <p className="text-sm text-[#999999]">Consultez nos tarifs</p>
                </div>
              </Link>

              <Link href="/contact">
                <div className="p-4 border-2 border-[#2d3748] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer rounded-sm">
                  <h3 className="font-bold text-[#ffffff] mb-1">Contact</h3>
                  <p className="text-sm text-[#999999]">Réservez votre trajet</p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="group">
                  <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                  Retour à l'accueil
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.history.back()}
                className="group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Page précédente
              </Button>
            </div>

            <div className="mt-12 p-6 bg-[#1a1a1a] border border-[#2d3748] rounded-sm">
              <p className="text-[#cccccc] mb-4">
                Vous ne trouvez pas ce que vous cherchez ?
              </p>
              <a
                href="tel:+41760842089"
                className="text-[#d4af37] hover:underline text-lg font-semibold"
                aria-label="Appelez-nous au 076 084 20 89"
              >
                Appelez-nous au 076 084 20 89
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
