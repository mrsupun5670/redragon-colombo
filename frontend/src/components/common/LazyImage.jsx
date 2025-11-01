import React, { useState, memo } from 'react';

const LazyImage = memo(({ src, alt, className, style, onLoad, onError, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  if (hasError && placeholder) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`} style={style}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`${className} bg-gray-200 animate-pulse`} style={style} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={style}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;