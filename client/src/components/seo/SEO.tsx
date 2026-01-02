import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  noindex?: boolean;
  jsonLd?: object | object[];
}

export default function SEO({
  title = 'ROMUO VTC - Transport premium en Suisse',
  description = 'Service VTC premium en Suisse. Réservez votre chauffeur privé pour vos transferts aéroport, déplacements business et trajets longue distance.',
  keywords = 'VTC Suisse, chauffeur privé Genève, transport premium Suisse, transfert aéroport Genève, VTC Lausanne, taxi premium Suisse',
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://romuo-vtc.ch';
  const fullCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Méta de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Géolocalisation Suisse */}
      <meta name="geo.region" content="CH" />
      <meta name="geo.placename" content="Suisse" />
      <meta name="geo.position" content="46.2044;6.1432" /> {/* Genève */}
      <meta name="ICBM" content="46.2044, 6.1432" />

      {/* Langue et région */}
      <meta httpEquiv="content-language" content="fr-CH" />

      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="fr_CH" />
      <meta property="og:site_name" content="ROMUO VTC" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
