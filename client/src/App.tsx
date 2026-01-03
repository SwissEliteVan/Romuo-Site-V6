import { Route, Router, Switch } from 'wouter';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import CookieBanner from './components/layout/CookieBanner';
import BackToTop from './components/ui/BackToTop';
import InstallBanner from './components/pwa/InstallBanner';

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Tarifs = lazy(() => import('./pages/Tarifs'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const Confidentialite = lazy(() => import('./pages/Confidentialite'));
const Cookies = lazy(() => import('./pages/Cookies'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/tarifs" component={Tarifs} />
            <Route path="/contact" component={Contact} />
            <Route path="/mentions-legales" component={MentionsLegales} />
            <Route path="/confidentialite" component={Confidentialite} />
            <Route path="/cookies" component={Cookies} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
      <CookieBanner />
      <BackToTop />
      <InstallBanner />
    </Router>
  );
}

export default App;
