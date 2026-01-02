import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../ui/Container';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2d3748]">
      <Container>
        <nav className="flex items-center justify-between py-4" aria-label="Navigation principale">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group -m-1.5 p-1.5">
              <span className="sr-only">ROMUO VTC</span>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 border-2 border-[#d4af37] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#d4af37]">R</span>
                </div>
                <span className="text-xl font-bold text-[#ffffff] group-hover:text-[#d4af37] transition-colors">
                  ROMUO VTC
                </span>
              </div>
            </Link>
          </div>

          {/* Menu mobile toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#ffffff] hover:bg-[#2d3748] min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors min-h-[44px] flex items-center ${
                  location === item.href
                    ? 'text-[#d4af37]'
                    : 'text-[#ffffff] hover:text-[#d4af37]'
                }`}
                aria-current={location === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
            <a
              href="tel:+41760842089"
              className="flex items-center gap-2 text-sm font-semibold text-[#ffffff] hover:text-[#d4af37] transition-colors min-h-[44px]"
              aria-label="Appeler le 076 084 20 89"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="hidden xl:inline">076 084 20 89</span>
            </a>
            <Link href="/contact">
              <Button size="sm">Réserver</Button>
            </Link>
          </div>
        </nav>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#2d3748]">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-base font-semibold min-h-[44px] ${
                    location === item.href
                      ? 'bg-[#d4af37] text-[#0a0a0a]'
                      : 'text-[#ffffff] hover:bg-[#2d3748]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="tel:+41760842089"
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold text-[#ffffff] hover:bg-[#2d3748] min-h-[44px]"
                  aria-label="Appeler le 076 084 20 89"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  076 084 20 89
                </a>
                <Link href="/contact">
                  <Button fullWidth onClick={() => setMobileMenuOpen(false)}>
                    Réserver
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
