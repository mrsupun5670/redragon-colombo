import React from 'react';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
      <div className="text-center px-6 py-12 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/images/logo/redragon_logo.png" 
            alt="Redragon Logo" 
            className="w-32 h-32 mx-auto mb-4 filter drop-shadow-lg"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            REDRAGON
          </h1>
          <p className="text-xl md:text-2xl text-red-400 font-semibold">
            COLOMBO
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            🚀 Coming Soon
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            We're working hard to bring you the best gaming experience with authentic 
            <span className="text-red-400 font-semibold"> Redragon </span> 
            gaming peripherals in Sri Lanka.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="text-2xl mb-2">⌨️</div>
              <h3 className="text-white font-semibold mb-2">Mechanical Keyboards</h3>
              <p className="text-gray-400 text-sm">Premium gaming keyboards</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="text-2xl mb-2">🖱️</div>
              <h3 className="text-white font-semibold mb-2">Gaming Mice</h3>
              <p className="text-gray-400 text-sm">Precision gaming mice</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="text-2xl mb-2">🎧</div>
              <h3 className="text-white font-semibold mb-2">Gaming Headsets</h3>
              <p className="text-gray-400 text-sm">Immersive audio experience</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Get Notified When We Launch!</h3>
          <p className="text-gray-300 mb-4">
            Follow us on social media for updates and exclusive launch offers.
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.facebook.com/redragoncolombo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/redragoncolombo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.807-2.026 1.217-3.323 1.217zm7.058 0c-1.297 0-2.448-.49-3.323-1.297-.876-.876-1.366-2.027-1.366-3.324s.49-2.448 1.366-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.807-2.026 1.217-3.323 1.217z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Redragon Colombo. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Authentic Gaming Gear • Genuine Warranty • Sri Lanka
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;