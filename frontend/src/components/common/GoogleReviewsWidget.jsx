import React, { useEffect } from 'react';

const GoogleReviewsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'EmbedSocialHashtagScript';
    script.src = 'https://embedsocial.com/cdn/ht.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('EmbedSocialHashtagScript');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="embedsocial-hashtag" data-ref="bcfa97f7911577ee4d68b7d69a521b65653450ff">
      <a
        className="feed-powered-by-es feed-powered-by-es-slider-img es-widget-branding"
        href="https://embedsocial.com/blog/embed-google-reviews/"
        target="_blank"
        rel="noopener noreferrer"
        title="Embed Google reviews"
      >
        <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
        <div className="es-widget-branding-text">Embed Google reviews</div>
      </a>
    </div>
  );
};

export default GoogleReviewsWidget;
