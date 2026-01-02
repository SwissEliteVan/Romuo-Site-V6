import { Link } from 'wouter';
import { Phone, Mail, Clock } from 'lucide-react';
import Container from '../ui/Container';

const footerNavigation = {
  services: [
    { name: 'Transfert aéroport', href: '/services#transfert' },
    { name: 'Déplacements business', href: '/services#business' },
    { name: 'Trajets longue distance', href: '/services#longue-distance' },
    { name: 'Mise à disposition', href: '/services#disposition' },
  ],
  entreprise: [
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Gestion des cookies', href: '/cookies' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] border-t border-[#2d3748]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Colonne 1 : À propos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 border-2 border-[#d4af37] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#d4af37]">R</span>
                </div>
                <span className="text-xl font-bold text-[#ffffff]">ROMUO VTC</span>
              </div>
              <p className="text-sm text-[#999999] leading-relaxed">
                Service de transport premium en Suisse. Confort, ponctualité et discrétion pour tous vos déplacements.
              </p>
            </div>

            {/* Colonne 2 : Services */}
            <div>
              <h3 className="text-sm font-semibold text-[#ffffff] mb-4">Nos services</h3>
              <ul className="space-y-3">
                {footerNavigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 : Entreprise */}
            <div>
              <h3 className="text-sm font-semibold text-[#ffffff] mb-4">Entreprise</h3>
              <ul className="space-y-3">
                {footerNavigation.entreprise.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-semibold text-[#ffffff] mb-4 mt-6">Informations légales</h3>
              <ul className="space-y-3">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4 : Contact */}
            <div>
              <h3 className="text-sm font-semibold text-[#ffffff] mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+41760842089"
                    className="flex items-center gap-2 text-sm text-[#999999] hover:text-[#d4af37] transition-colors"
                    aria-label="Téléphone : 076 084 20 89"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    076 084 20 89
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@romuo-vtc.ch"
                    className="flex items-center gap-2 text-sm text-[#999999] hover:text-[#d4af37] transition-colors"
                    aria-label="Email : contact@romuo-vtc.ch"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    contact@romuo-vtc.ch
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#999999]">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#ffffff]">Disponible 24h/24 - 7j/7</p>
                    <p className="text-xs mt-1">Service sur réservation</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-[#2d3748]">
            <p className="text-sm text-center text-[#666666]">
              © {currentYear} ROMUO VTC. Tous droits réservés. Service de transport de personnes en Suisse.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
