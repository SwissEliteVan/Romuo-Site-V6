import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '../consent/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
