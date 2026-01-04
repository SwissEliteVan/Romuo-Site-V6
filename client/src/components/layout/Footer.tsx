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
    <footer className="relative bg-[#000000] border-t border-[#2d3748] overflow-hidden" aria-labelledby="footer-heading">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-transparent pointer-events-none" />

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-16 relative">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Colonne 1 : À propos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                <div className="relative h-10 w-10 border-2 border-[#d4af37] flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#d4af37]/50">
                  <span className="text-xl font-bold text-[#d4af37] relative z-10">R</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#c4a137] opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <span className="text-xl font-bold text-gradient">ROMUO VTC</span>
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
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-all duration-300 relative inline-block group/link"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
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
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-all duration-300 relative inline-block group/link"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
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
                      className="text-sm text-[#999999] hover:text-[#d4af37] transition-all duration-300 relative inline-block group/link"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent group-hover/link:w-full transition-all duration-300" />
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
                    className="flex items-center gap-2 text-sm text-[#999999] hover:text-[#d4af37] transition-all duration-300 group/contact"
                    aria-label="Téléphone : 076 084 20 89"
                  >
                    <Phone className="h-4 w-4 group-hover/contact:scale-110 transition-transform group-hover/contact:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" aria-hidden="true" />
                    076 084 20 89
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@romuo-vtc.ch"
                    className="flex items-center gap-2 text-sm text-[#999999] hover:text-[#d4af37] transition-all duration-300 group/contact"
                    aria-label="Email : contact@romuo-vtc.ch"
                  >
                    <Mail className="h-4 w-4 group-hover/contact:scale-110 transition-transform group-hover/contact:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" aria-hidden="true" />
                    contact@romuo-vtc.ch
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#999999]">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#d4af37] animate-pulse" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#ffffff]">Disponible 24h/24 - 7j/7</p>
                    <p className="text-xs mt-1">Service sur réservation</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-[#2d3748] relative">
            {/* Gradient separator accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

            <p className="text-sm text-center text-[#666666]">
              © {currentYear}{' '}
              <span className="text-gradient font-semibold">ROMUO VTC</span>. Tous droits réservés. Service de transport de personnes en Suisse.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
