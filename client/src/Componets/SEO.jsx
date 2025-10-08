import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, canonical }) => {
  const siteName = "Shashvat Enterprise";
  const defaultImage = image || "/finalLogo.png";
  const siteUrl = window.location.origin;
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${defaultImage}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${defaultImage}`} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Shashvat Enterprise" />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Jamnagar" />
      <meta name="geo.position" content="22.4707;70.0577" />
      <meta name="ICBM" content="22.4707, 70.0577" />
      
      {/* Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Shashvat Enterprise",
          "image": `${siteUrl}${defaultImage}`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot No 3016, GIDC-Phase3, Dared",
            "addressLocality": "Jamnagar",
            "addressRegion": "Gujarat",
            "postalCode": "361004",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "22.4707",
            "longitude": "70.0577"
          },
          "url": siteUrl,
          "telephone": "+91-XXXXXXXXXX",
          "priceRange": "$$",
          "openingHours": "Mo-Sa 09:00-18:00",
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Brass Products",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Sanitary Fittings"
              },
              {
                "@type": "OfferCatalog",
                "name": "Brass Hardware"
              },
              {
                "@type": "OfferCatalog",
                "name": "Bathroom Accessories"
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
