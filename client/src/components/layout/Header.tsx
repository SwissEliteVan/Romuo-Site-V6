import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/98 backdrop-blur-xl shadow-2xl shadow-[#d4af37]/5'
          : 'bg-[#0a0a0a]/95 backdrop-blur-md'
      } border-b ${isScrolled ? 'border-[#d4af37]/20' : 'border-[#2d3748]'}`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-4'
          }`}
          aria-label="Navigation principale"
        >
          {/* Logo premium */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group -m-1.5 p-1.5">
              <span className="sr-only">ROMUO VTC</span>
              <div className="flex items-center gap-3">
                <div className={`relative transition-all duration-300 ${
                  isScrolled ? 'h-9 w-9' : 'h-10 w-10'
                }`}>
                  {/* Glow effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#c4a137] opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
                  {/* Logo container */}
                  <div className="relative h-full w-full border-2 border-[#d4af37] bg-[#0a0a0a] flex items-center justify-center group-hover:border-[#e4bf47] transition-all group-hover:shadow-lg group-hover:shadow-[#d4af37]/50">
                    <span className={`font-bold text-[#d4af37] group-hover:text-[#e4bf47] transition-all ${
                      isScrolled ? 'text-lg' : 'text-xl'
                    }`}>R</span>
                  </div>
                </div>
                <span className={`font-bold text-[#ffffff] group-hover:text-[#d4af37] transition-all ${
                  isScrolled ? 'text-lg' : 'text-xl'
                }`}>
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
                className={`relative text-sm font-semibold leading-6 transition-all min-h-[44px] flex items-center group ${
                  location === item.href
                    ? 'text-[#d4af37]'
                    : 'text-[#ffffff] hover:text-[#d4af37]'
                }`}
                aria-current={location === item.href ? 'page' : undefined}
              >
                {item.name}
                {/* Underline effect */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4af37] to-[#e4bf47] transform origin-left transition-transform duration-300 ${
                  location === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
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

        {/* Menu mobile avec animation slide-in */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-[#2d3748] animate-in slide-in-from-top-2">
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-base font-semibold min-h-[44px] transition-all transform ${
                    location === item.href
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#c4a137] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/20'
                      : 'text-[#ffffff] hover:bg-[#2d3748] hover:translate-x-1'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="tel:+41760842089"
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold text-[#ffffff] hover:bg-[#2d3748] min-h-[44px] transition-all hover:translate-x-1"
                  aria-label="Appeler le 076 084 20 89"
                >
                  <Phone className="h-5 w-5 text-[#d4af37]" aria-hidden="true" />
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
        </div>
      </Container>
    </header>
  );
}
