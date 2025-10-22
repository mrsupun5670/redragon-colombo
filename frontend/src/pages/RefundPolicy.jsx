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
      title: "Returns",
      icon: "📦",
      content: `We accept returns within 30 days from the date of purchase. To be eligible for a return, your item must be:
        • Unused and in the same condition as received
        • In the original packaging with all accessories included
        • Accompanied by the original receipt or proof of purchase

Items must be returned in their original condition. If a product shows signs of use or damage caused by the customer, it may not be eligible for a full refund.`,
    },
    {
      title: "Refunds",
      icon: "💰",
      content: `Once we receive your return and inspect the item, we will notify you of the refund status within 5-7 business days. If your return is approved:
        • A refund will be initiated to your original payment method
        • Please allow 7-14 business days for the refund to appear in your account
        • The refund amount will exclude any shipping charges from the initial purchase
        • Non-refundable items: Gift cards, downloadable products, personalized items, and perishable goods`,
    },
    {
      title: "Exchanges",
      icon: "🔄",
      content: `Would you like to exchange your item for a different size, color, or style? No problem!
        • Contact our customer support team within 30 days of receiving your order
        • Provide order number and details of the exchange desired
        • If the new item has a higher price, you'll need to pay the difference
        • If the new item is cheaper, we'll refund the difference
        • Return shipping is covered by us for quality/size issues only`,
    },
    {
      title: "Non-Returnable Items",
      icon: "🚫",
      content: `The following items are non-returnable and non-refundable:
        • Digital products & software (once downloaded)
        • Gift cards & store credit
        • Personalized or custom-made products
        • Perishable goods
        • Items without original packaging or missing components
        • Products damaged due to customer misuse`,
    },
    {
      title: "Damaged or Defective Items",
      icon: "⚠️",
      content: `If your item arrives damaged or defective, we're here to help!
        • Contact us immediately with photos of the damage
        • We will arrange for a replacement or full refund
        • No need to return the damaged item in most cases
        • Shipping costs for the replacement will be covered by us
        • We typically resolve these issues within 48 hours`,
    },
    {
      title: "Return Shipping",
      icon: "📮",
      content: `Return shipping responsibilities:
        • You are responsible for return shipping costs, except:
        • Returns due to our error (wrong item, defective product)
        • In these cases, we provide a prepaid shipping label
        • Use the prepaid label for faster processing
        • Include your original invoice in the return package
        • Insurance for your return is recommended but optional`,
    },
    {
      title: "Processing Time",
      icon: "⏱️",
      content: `Timeline for refunds and exchanges:
        • Inspection time: 3-5 business days after receiving return
        • Refund processing: 7-10 business days from approval
        • Bank processing time: 7-14 business days (depends on your bank)
        • Exchanges: 10-15 business days to ship the replacement
        • Tracking information will be provided for all returns and replacements`,
    },
    {
      title: "Contact & Support",
      icon: "📞",
      content: `Have questions about our refund policy? We're here to help!
        • Email: support@redragoncolombo.lk
        • Phone: +94 11 234 5678
        • WhatsApp: +94 11 234 5678
        • Hours: Monday - Friday, 9 AM - 6 PM (Sri Lanka Time)
        • We aim to respond to all inquiries within 24 hours`,
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
              Refund Policy
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              Your Satisfaction Guaranteed
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
                  At Redragon Colombo, we're committed to ensuring you're completely satisfied with your purchase. If for any reason you're not happy with your order, our straightforward refund policy makes it easy to return or exchange your items. Your trust is important to us!
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
              icon: <RotateCcw className="w-8 h-8 text-white" />,
              title: "30-Day Returns",
              desc: "Full refund within 30 days of purchase",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              title: "No Questions Asked",
              desc: "Hassle-free returns for unused items",
            },
            {
              icon: <PhoneCall className="w-8 h-8 text-white" />,
              title: "24/7 Support",
              desc: "Chat with our support team anytime",
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

        {/* How to Return */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white border-2 border-red-400">
            <h2 className="text-3xl font-black mb-8 uppercase flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              How to Start Your Return
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { num: "1", title: "Contact Us", desc: "Email or call us with your order number" },
                { num: "2", title: "Get Approval", desc: "We'll approve and provide return details" },
                { num: "3", title: "Ship Back", desc: "Pack securely and ship to our warehouse" },
                { num: "4", title: "Get Refund", desc: "Receive refund after inspection" },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-red-600 rounded-full font-black text-lg mb-3">
                    {step.num}
                  </div>
                  <h4 className="font-black uppercase mb-1">{step.title}</h4>
                  <p className="text-white/80 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase">
              ❓ Common Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "How long do I have to return an item?",
                  a: "You have 30 days from the date of purchase to initiate a return.",
                },
                {
                  q: "Will I get a full refund?",
                  a: "Yes, full refund for unused items. Refund excludes original shipping charges.",
                },
                {
                  q: "Who pays for return shipping?",
                  a: "You typically cover return shipping unless it's our error or defective item.",
                },
                {
                  q: "How long does refund processing take?",
                  a: "After receiving and inspecting, 7-10 business days. Banks may take 7-14 additional days.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                  <h4 className="font-black text-gray-900 mb-2 uppercase text-red-600">
                    Q: {faq.q}
                  </h4>
                  <p className="text-gray-700">A: {faq.a}</p>
                </div>
              ))}
            </div>
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
              📞 Need Help With Your Return?
            </h2>
            <p className="text-gray-700 mb-6">
              Our friendly support team is here to help you through every step of the return process. Don't hesitate to reach out!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:support@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-red-300 transition-all font-bold text-red-600 uppercase"
              >
                📧 support@redragoncolombo.lk
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
