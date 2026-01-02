/**
 * Générateurs JSON-LD pour le SEO structuré
 * Documentation : https://schema.org/
 */

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ROMUO VTC',
  url: 'https://romuo-vtc.ch',
  logo: 'https://romuo-vtc.ch/logo.png',
  description: 'Service de transport premium VTC en Suisse',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
    addressLocality: 'À compléter', // Ville
    postalCode: 'À compléter',
    streetAddress: 'À compléter',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+41-76-084-20-89',
    contactType: 'Réservations',
    availableLanguage: ['fr', 'en'],
    areaServed: 'CH',
  },
  sameAs: [
    // À compléter : liens réseaux sociaux si existants
    // 'https://www.facebook.com/romuo-vtc',
    // 'https://www.linkedin.com/company/romuo-vtc',
  ],
};

// LocalBusiness Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://romuo-vtc.ch/#business',
  name: 'ROMUO VTC',
  image: 'https://romuo-vtc.ch/og-image.jpg',
  priceRange: '$$$$',
  telephone: '+41-76-084-20-89',
  email: 'contact@romuo-vtc.ch',
  url: 'https://romuo-vtc.ch',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
    addressLocality: 'À compléter',
    postalCode: 'À compléter',
    streetAddress: 'À compléter',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '46.2044',
    longitude: '6.1432',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
};

// WebSite Schema
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://romuo-vtc.ch/#website',
  url: 'https://romuo-vtc.ch',
  name: 'ROMUO VTC',
  description: 'Service de transport premium VTC en Suisse',
  publisher: {
    '@id': 'https://romuo-vtc.ch/#organization',
  },
  inLanguage: 'fr-CH',
};

// Service Schema (pour la page Services)
export const serviceSchema = (serviceName: string, description: string, price?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: description,
  provider: {
    '@type': 'Organization',
    name: 'ROMUO VTC',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
  ...(price && {
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'CHF',
    },
  }),
});

// FAQ Schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// BreadcrumbList Schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
