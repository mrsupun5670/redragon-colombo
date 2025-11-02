import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom TikTok icon component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  // Handle footer link navigation to products with category filtering
  const handleShopLinkClick = (e, item) => {
    e.preventDefault();

    // Map footer items to database categories/subcategories
    const categoryMapping = {
      Keyboards: { type: "subcategory", value: "Keyboards" },
      Mice: { type: "subcategory", value: "Mice" },
      Headsets: { type: "subcategory", value: "Headsets" },
      "Mouse Pads": { type: "search", value: "mouse pad" },
      Accessories: { type: "category", value: "Computer Accessories" },
    };

    const mapping = categoryMapping[item];
    if (mapping) {
      let searchParams = new URLSearchParams();

      if (mapping.type === "category") {
        searchParams.set("category", mapping.value);
      } else if (mapping.type === "subcategory") {
        searchParams.set("subcategory", mapping.value);
      } else if (mapping.type === "search") {
        searchParams.set("search", mapping.value);
      }

      navigate(`/products?${searchParams.toString()}`);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t-4 border-red-500">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-black mb-4 text-red-600 uppercase">
              REDRAGON COLOMBO
            </h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              Official Redragon gaming peripherals store in Sri Lanka with
              genuine products and warranty.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>3F18, 3rd Floor, Unity, Plaza, Bambalapitiya, Colombo 04</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>+94 77 76 24 028</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>info@redragoncolombo.lk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black mb-4 text-gray-900 uppercase text-sm">
              SHOP
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Keyboards",
                "Mice",
                "Headsets",
                "Mouse Pads",
                "Accessories",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => handleShopLinkClick(e, item)}
                    className="text-gray-700 hover:text-red-500 transition-colors hover:translate-x-1 inline-block cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-black mb-4 text-gray-900 uppercase text-sm">
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Categories", href: "/categories" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-red-500 transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Social */}
          <div>
            <h3 className="font-black mb-4 text-gray-900 uppercase text-sm">
              WE ACCEPT
            </h3>
            <div className="flex items-center gap-3 mb-4">
              {/* Visa */}
              <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                <svg viewBox="0 0 48 32" className="w-12 h-6">
                  <path
                    fill="#1434CB"
                    d="M20.176 11.512l-2.294 9.975h-3.009l2.294-9.975h3.009zm13.038 6.461l1.585-4.373.907 4.373h-2.492zm3.373 3.514h2.779l-2.426-9.975h-2.557c-.577 0-1.062.334-1.277.85l-4.501 9.125h3.162l.628-1.74h3.862l.33 1.74zm-7.373-3.273c.013-2.632-3.641-2.779-3.617-3.956.008-.357.349-.739 1.094-.836.369-.048 1.387-.085 2.542.446l.453-2.113c-.62-.226-1.418-.443-2.411-.443-3.337 0-5.686 1.775-5.704 4.318-.02 1.879 1.677 2.927 2.957 3.552 1.315.641 1.757 1.052 1.751 1.625-.01.877-1.052 1.271-2.025 1.286-1.701.027-2.688-.459-3.475-.826l-.613 2.865c.79.364 2.248.681 3.762.697 3.551 0 5.873-1.753 5.886-4.47l-.6-.145zm-13.438-6.702l-4.917 9.975h-3.186l-2.421-9.373c-.146-.573-.273-.784-.719-.999-1.165-.56-2.989-1.156-4.626-1.501l.074-.351h7.975c1.016 0 1.931.677 2.162 1.85l1.977 10.505 4.885-12.106h3.162l-4.366 12.001z"
                  />
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                <svg viewBox="0 0 48 32" className="w-12 h-6">
                  <circle cx="18" cy="16" r="10" fill="#EB001B" />
                  <circle cx="30" cy="16" r="10" fill="#F79E1B" />
                  <path
                    fill="#FF5F00"
                    d="M24 8.8c-2.264 1.888-3.7 4.742-3.7 7.95s1.436 6.062 3.7 7.95c2.264-1.888 3.7-4.742 3.7-7.95s-1.436-6.062-3.7-7.95z"
                  />
                </svg>
              </div>
            </div>

            {/* Social Media */}
            <h3 className="font-black mb-3 text-gray-900 uppercase text-sm mt-6">
              FOLLOW US
            </h3>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://www.facebook.com/redragoncolombo"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-white hover:bg-blue-600 border border-gray-300 transition-all shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/redragoncolombo/"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-white hover:bg-pink-600 border border-gray-300 transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@redragoncolombo"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-white hover:bg-black border border-gray-300 transition-all shadow-sm"
              >
                <TikTokIcon className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-300 py-6">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
            <a
              href="/privacy-policy"
              className="text-gray-700 hover:text-red-500 transition-colors font-semibold"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/terms-conditions"
              className="text-gray-700 hover:text-red-500 transition-colors font-semibold"
            >
              Terms & Conditions
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/refund-policy"
              className="text-gray-700 hover:text-red-500 transition-colors font-semibold"
            >
              Refund Policy
            </a>
          </div>
        </div>

        {/* Copyright - Single Statement */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 Redragon Colombo - Authorized Redragon Dealer in Sri
            Lanka. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            &copy; Designed & Developed by{" "}
            <a
              href="https://www.zipzipy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-bold"
            >
              ZipZipy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
