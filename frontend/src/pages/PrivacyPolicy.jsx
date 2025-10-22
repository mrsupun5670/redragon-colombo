import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Lock, Eye, Share2, Shield } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    {
      title: "Who We Are",
      icon: "🏢",
      content: `Redragon Colombo ("we", "us", or "our") is a company engaged in the import and distribution of high-performance gaming and technology products in Sri Lanka.

We operate the website www.redragoncolombo.lk, which provides product information, online purchases, and customer support related to Redragon gaming gear and accessories.`,
    },
    {
      title: "Information We Collect",
      icon: "📊",
      content: `To provide and improve our services, we may collect various types of personal data, including:

• Full name
• Email address
• Contact number
• Billing and shipping address (including city, province, and postal code)
• Identification details (such as NIC or Passport number, if applicable)
• Cookies and usage data

This information may be collected when you:
• Register or create an account
• Place an order
• Subscribe to our newsletter
• Leave a comment or fill out a contact form
• Browse our website (usage data may be collected automatically)`,
    },
    {
      title: "Comments",
      icon: "💬",
      content: `When visitors leave comments, we collect the information provided in the form, as well as the visitor's IP address and browser details to help prevent spam.

After approval, your comment and profile image (if applicable) may appear publicly in connection with your comment.`,
    },
    {
      title: "Cookies",
      icon: "🍪",
      content: `Cookies are small text files stored on your device to help us improve your browsing experience.

We use cookies and similar tracking technologies (such as tags or scripts) to:
• Remember your preferences
• Maintain session data
• Analyze website traffic and performance

You can choose to disable cookies through your browser settings. However, certain features of our website may not function properly if cookies are disabled.

Examples:
• Login cookies last for two days.
• Display preference cookies last for one year.
• "Remember Me" cookies last for two weeks unless you log out.`,
    },
    {
      title: "Embedded Content & Third-Party Services",
      icon: "🔗",
      content: `Our website may include embedded content (e.g., videos, social media links, analytics tools) or links to external websites.

These third-party websites may collect data about you, use cookies, or track your interaction with that content.

We are not responsible for the privacy practices or content of any third-party website. We encourage you to review their Privacy Policies before interacting with them.`,
    },
    {
      title: "Web Analytics",
      icon: "📈",
      content: `We use Google Analytics to understand how visitors interact with our website.

Google may collect information such as your IP address, device type, and browsing behavior. This data helps us improve our website and user experience.

You can prevent Google Analytics from tracking your data by installing the Google Analytics Opt-out Browser Add-on.

To learn more, please refer to the Google Privacy Policy.`,
    },
    {
      title: "Usage Data",
      icon: "⏱️",
      content: `We may automatically collect information about how our website is accessed and used. This may include:

• IP address
• Browser type and version
• Device identifiers
• Pages visited and duration
• Date and time of visit

This data is collected solely for system administration, performance monitoring, and analytics purposes.`,
    },
    {
      title: "How We Use Your Data",
      icon: "🔧",
      content: `We use collected data to:

• Provide and maintain our services
• Process orders and deliver products
• Send service-related updates or notifications
• Improve website performance and customer experience
• Provide customer support
• Detect, prevent, and resolve technical issues
• Comply with legal or regulatory requirements`,
    },
    {
      title: "Data Retention",
      icon: "💾",
      content: `Comments and their metadata are stored indefinitely to recognize follow-up comments automatically.

Registered users' account information is stored as long as their account remains active. Users can view, edit, or delete their information (excluding their username).

Website administrators have access to edit or remove data when necessary.`,
    },
    {
      title: "Your Rights",
      icon: "⚖️",
      content: `You have the right to:

• Request a copy of the personal data we hold about you
• Request correction or deletion of your personal data
• Withdraw consent to data collection (where applicable)
• Object to processing or request data portability

To exercise any of these rights, please contact us through the Contact Form on our website.`,
    },
    {
      title: "Data Transfer",
      icon: "🌍",
      content: `Your personal data may be transferred to and stored on servers located in Sri Lanka or other countries.

By submitting your information, you consent to this transfer, provided that adequate security measures are in place to protect your data.`,
    },
    {
      title: "Data Security",
      icon: "🔐",
      content: `We implement industry-standard measures to safeguard your data, including secure servers and encryption.

However, please note that no system is completely secure. We cannot guarantee absolute protection of your data transmitted over the internet.`,
    },
    {
      title: "Data from Third Parties",
      icon: "🤝",
      content: `Our website may receive limited information from trusted partners or analytics providers for performance tracking.

We do not sell or share your personal information with unaffiliated third parties for marketing purposes.`,
    },
    {
      title: "Legal Disclosure",
      icon: "📝",
      content: `We may disclose your information if required by law or in good faith when such action is necessary to:

• Comply with a legal obligation
• Protect or defend the rights and property of Redragon Colombo
• Investigate potential misconduct or fraudulent activity
• Protect user safety and public security
• Prevent or address legal liability`,
    },
    {
      title: "Policy Updates",
      icon: "🔄",
      content: `We may update this Privacy Policy periodically.

Changes will be posted on this page with the revised "Effective Date."

We may also notify users via email or a prominent notice on our homepage before changes take effect.

We encourage you to review this page regularly to stay informed about how we protect your data.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 pt-24 pb-20 border-b-4 border-blue-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              Your Data, Your Control
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="flex gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase">
                  Welcome to Redragon Colombo
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit or interact with our website, www.redragoncolombo.lk ("the Site", "Service", or "Platform").

By accessing or using our website, you agree to the practices described in this Privacy Policy. If you do not agree with the terms outlined here, please refrain from using our website or providing any personal information.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase text-center">
            Privacy Details
          </h2>

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-500/30 overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === idx ? -1 : idx)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl">{section.icon}</span>
                    <h3 className="text-xl font-black text-gray-900 uppercase">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedSection === idx ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedSection === idx ? "auto" : 0,
                    opacity: expandedSection === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 bg-gradient-to-r from-gray-50 to-gray-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">
              🤝 Privacy Questions?
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us through our Contact Form on www.redragoncolombo.lk or email us.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:info@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-blue-300 transition-all font-bold text-blue-600 uppercase"
              >
                📧 info@redragoncolombo.lk
              </a>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-blue-300 transition-all font-bold text-blue-600 uppercase"
              >
                📞 +94 11 234 5678
              </a>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Effective Date: January 2025
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PrivacyPolicy;
