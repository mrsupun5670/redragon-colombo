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

// Payment methods data
const paymentMethods = [
  { name: "Visa", logo: "/images/payment_methods/visa.png" },
  { name: "Mastercard", logo: "/images/payment_methods/master.png" },
  { name: "American Express", logo: "/images/payment_methods/american x.png" },
  { name: "KOKO", logo: "/images/payment_methods/koko.png" },
];

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
                <span>
                  3F18, 3rd Floor, Unity, Plaza, Bambalapitiya, Colombo 04
                </span>
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
            <h3 className="font-black mb-3 text-gray-900 uppercase text-sm">
              WE ACCEPT
            </h3>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method) => (
                <motion.img
                  key={method.name}
                  src={method.logo}
                  alt={method.name}
                  title={method.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-auto object-contain cursor-pointer transition-transform"
                />
              ))}
            </div>

            {/* Social Media */}
            <h3 className="font-black mb-3 text-gray-900 uppercase text-sm mt-6">
              FOLLOW US
            </h3>
            <div className="flex items-center gap-3">
              <motion.a
                target="_blank"
                href="https://www.facebook.com/redragoncolombo"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-white hover:bg-blue-600 border border-gray-300 transition-all shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                target="_blank"
                href="https://www.instagram.com/redragoncolombo/"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-white hover:bg-pink-600 border border-gray-300 transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                target="_blank"
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
            &copy; Designed & Developed by
            <a
              href="https://www.zipzipy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-bold"
            >
              ZipZipy Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
