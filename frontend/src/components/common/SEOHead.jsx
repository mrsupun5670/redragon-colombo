import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = "Redragon Colombo - Official Gaming Peripherals Store Sri Lanka",
  description = "Official Redragon gaming peripherals store in Sri Lanka. Keyboards, Mice, Headsets, and more with genuine warranty. Fast delivery across Colombo and Sri Lanka.",
  keywords = "redragon, gaming, keyboards, mice, headsets, sri lanka, colombo, gaming gear, mechanical keyboards, gaming mouse",
  image = "/images/logo/redragon_logo.png",
  url = "https://www.redragoncolombo.lk",
  type = "website",
  structuredData = null,
  product = null
}) => {
  const siteUrl = "https://www.redragoncolombo.lk";
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Redragon Colombo",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo/redragon_logo.png`,
    "image": fullImageUrl,
    "telephone": "+94-11-1234567",
    "email": "info@redragoncolombo.lk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Colombo",
      "addressLocality": "Colombo",
      "addressCountry": "LK"
    },
    "openingHours": ["Mo-Sa 09:00-18:00"],
    "priceRange": "$$",
    "acceptsReservations": false,
    "currenciesAccepted": "LKR",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "sameAs": [
      "https://facebook.com/redragoncolombo",
      "https://instagram.com/redragoncolombo"
    ]
  };

  // Product structured data
  const productStructuredData = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images?.map(img => `${siteUrl}${img}`) || [fullImageUrl],
    "brand": {
      "@type": "Brand",
      "name": product.brand_name || "Redragon"
    },
    "category": product.category_name,
    "sku": product.sku || product.id,
    "offers": {
      "@type": "Offer",
      "price": product.sale_price || product.price,
      "priceCurrency": "LKR",
      "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Redragon Colombo"
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.review_count || 1
    } : undefined
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Redragon Colombo" />
      <meta property="og:locale" content="en_LK" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Redragon Colombo" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Product Structured Data */}
      {productStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;