import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, RotateCcw, CheckCircle, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const RefundPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    {
      title: "Non-Refundable Policy",
      icon: "💳",
      content: `At Redragon Colombo, we strive to provide a seamless and satisfying shopping experience. Please note that all purchases made through our website using PayHere are non-refundable under any circumstances.

We understand that each purchase matters to you. Therefore, if you have any doubts or questions before placing an order, we encourage you to contact us through our hotline, WhatsApp, or live chat. Our support team is always ready to help you make the right purchase decision.`,
    },
    {
      title: "Warranty Policy",
      icon: "🛡️",
      content: `The warranty period for each product is clearly mentioned on the respective product page on our official website, www.redragoncolombo.lk, as well as on your warranty card and invoice. The warranty becomes valid from the date of delivery.

If a product is found to be defective within 7 days from the purchase date, and no signs of misuse or tampering are detected, it will qualify for an immediate replacement.`,
    },
    {
      title: "Warranty Voiding Conditions",
      icon: "⚠️",
      content: `The warranty will be considered void if:

• The issue occurs after the warranty period has expired.
• The product has been misused, modified, or altered without prior authorization.
• The product was exposed to unsuitable environmental conditions or accidents beyond our control.
• Damage resulted from natural disasters such as lightning, fire, flooding, or earthquakes.

Battery Warranty Exclusions:
This limited warranty does not apply to batteries if:
• They were charged using an unauthorized charger.
• Seals are broken or show signs of tampering.
• The battery was used in a device not specified by the manufacturer.

Power Supply Unit (PSU) Exclusions:
Warranty does not apply if the PSU is damaged due to electrical surges or lightning.

Display / Dead Pixel Policy:
Warranty will not cover displays or monitors with fewer than seven (7) dead pixels.`,
    },
    {
      title: "Warranty Claim Procedure",
      icon: "📋",
      content: `• Customers must bring or courier the product to our Redragon Colombo showroom for inspection.
  (Return shipping costs are the customer's responsibility. We recommend using a trackable courier service.)

• Our technical team will inspect the item to determine if the defect is covered under warranty.

• If covered, the product will be repaired or replaced at no additional cost.

• In some cases, customers may be asked to visit the showroom for live testing.

• The inspection and repair/replacement process generally takes 7–14 working days.

• If specific parts are unavailable, the duration may extend up to 1 month or more, depending on the repair nature.

• If the issue is not covered under warranty but can be repaired, the customer can choose to have it repaired at a reasonable cost.

• Once repairs are complete or if the claim is rejected, customers are notified to collect their product within 1 month.

• Products not collected within this period will be disposed of after an additional reminder and acknowledgment from the customer.

• Storage time can be extended upon request in special situations.`,
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
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 pt-24 pb-20 border-b-4 border-red-700">
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
              Refund & Warranty Policy
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              Your Satisfaction & Product Protection
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
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="flex gap-4 mb-4">
              <div className="text-4xl">🛡️</div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase">
                  We Value Your Satisfaction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  At Redragon Colombo, we're committed to protecting your investment in our products. This policy outlines our warranty coverage, claims procedure, and warranty exclusions. If you have any questions before making a purchase, please don't hesitate to contact our support team.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <PhoneCall className="w-8 h-8 text-white" />,
              title: "Contact Before Purchase",
              desc: "Get expert advice before buying",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              title: "7-Day Replacement",
              desc: "Defective items replaced within 7 days",
            },
            {
              icon: <RotateCcw className="w-8 h-8 text-white" />,
              title: "Warranty Coverage",
              desc: "Comprehensive warranty protection",
            },
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-red-500/20 transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </motion.div>
          ))}
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
            Policy Details
          </h2>

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-red-500/30 overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === idx ? -1 : idx)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors"
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
                    <ChevronDown className="w-6 h-6 text-red-600" />
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
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">
              📞 Questions About Warranty?
            </h2>
            <p className="text-gray-700 mb-6">
              Before placing an order, feel free to contact our team with any questions or concerns. We're here to help you make an informed purchase decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:info@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-red-300 transition-all font-bold text-red-600 uppercase"
              >
                📧 info@redragoncolombo.lk
              </a>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-red-300 transition-all font-bold text-red-600 uppercase"
              >
                📞 +94 11 234 5678
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RefundPolicy;
