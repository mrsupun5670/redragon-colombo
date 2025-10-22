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
      title: "Information We Collect",
      icon: "📊",
      content: `We collect information from you in several ways:

Personal Identification Information:
• Name, email address, phone number
• Provided voluntarily during registration or checkout
• Updated through your account settings

Payment & Billing Information:
• Credit card details (securely processed by third-party providers)
• Billing address and payment method
• Order history and transaction details

Browsing Information:
• IP address and device information
• Browser type and operating system
• Pages visited and time spent on our website
• Cookies and similar tracking technologies
• Search queries and product preferences

Communications:
• Messages sent through contact forms
• Customer support correspondence
• Newsletter subscriptions
• Survey and feedback responses`,
    },
    {
      title: "How We Use Your Information",
      icon: "🔧",
      content: `We use your information for:

Processing Orders:
• Fulfill your purchases and deliver products
• Process refunds and handle exchanges
• Send order confirmations and shipping updates
• Manage your account and account history

Communication:
• Respond to inquiries and provide customer support
• Send newsletters and promotional offers
• Notify you of policy changes
• Important account notifications

Personalization:
• Customize your shopping experience
• Recommend products based on preferences
• Remember your saved items and wishlist
• Improve website functionality and design

Security & Analytics:
• Detect and prevent fraud and unauthorized access
• Protect against malicious activities
• Analyze website traffic and user behavior
• Improve our services and security measures

Marketing:
• Send promotional emails and special offers
• Conduct market research and surveys
• Understand customer preferences
• Improve our marketing strategies`,
    },
    {
      title: "Information Sharing",
      icon: "🔄",
      content: `Your privacy is important. We only share information when necessary:

Trusted Service Providers:
• Payment processors (to process transactions)
• Shipping companies (for delivery)
• Email service providers (for communications)
• Analytics providers (for website improvement)
• These partners are contractually obligated to protect your data

Legal Requirements:
• Required by law or court order
• In response to government requests
• To protect our rights and safety
• To prevent fraud or illegal activity
• To enforce our terms and conditions

We DO NOT:
• Sell your personal information to third parties
• Share data with unverified marketers
• Disclose payment information unnecessarily
• Rent or lease customer lists
• Share data without your consent (except as required by law)`,
    },
    {
      title: "Data Security",
      icon: "🔐",
      content: `We take data protection seriously:

Security Measures:
• SSL encryption for all website traffic
• Secure payment processing through trusted providers
• Regular security audits and updates
• Password encryption and secure authentication
• Firewall protection and intrusion detection
• Limited employee access to sensitive data

Your Responsibilities:
• Keep your password confidential
• Log out after accessing your account
• Don't share your account information
• Report suspicious activity immediately
• Use secure internet connections

Limitations:
• No internet transmission is 100% secure
• Email communications may not be encrypted
• We cannot guarantee absolute security
• We are not liable for unauthorized third-party access
• Report security breaches immediately to security@redragoncolombo.lk`,
    },
    {
      title: "Cookies & Tracking Technologies",
      icon: "🍪",
      content: `We use cookies and similar technologies:

What Are Cookies?
• Small data files stored on your browser
• Help us remember your preferences
• Track website usage and behavior
• Enable features like "remember me"

Types of Cookies:
• Essential Cookies: Required for website functionality
• Performance Cookies: Track website performance
• Preference Cookies: Remember your settings
• Marketing Cookies: Track marketing effectiveness

Your Cookie Choices:
• Disable cookies in browser settings
• Use browser privacy/incognito modes
• Opt-out of specific cookie categories
• Clear cookies regularly
• Use cookie management tools

Impact:
• Some website features may not work properly
• Personalization features may be limited
• You may need to re-enter information
• Advertising will still be shown but not personalized`,
    },
    {
      title: "Your Privacy Rights",
      icon: "⚖️",
      content: `You have rights regarding your data:

Access & Transparency:
• Request a copy of your personal data
• Know what information we collect
• Understand how we use your information
• Ask who has access to your data

Correction & Deletion:
• Update inaccurate information
• Request deletion of your data
• Remove yourself from mailing lists
• Close your account permanently

Data Portability:
• Receive your data in portable format
• Transfer data to another provider
• Opt-out of marketing communications
• Withdraw consent anytime

To Exercise Your Rights:
• Email: privacy@redragoncolombo.lk
• Include proof of identity
• Specify what you're requesting
• We'll respond within 30 days

Restrictions:
• We may retain data for legal compliance
• Some data may be anonymized first
• We may refuse if it risks others' privacy`,
    },
    {
      title: "Children's Privacy",
      icon: "👧",
      content: `Protection for younger users:

Our Commitment:
• We don't knowingly collect data from children under 13
• Our website is not directed at children
• We comply with COPPA (Children's Online Privacy Protection Act)

Parental Involvement:
• If a child provides information, we'll delete it immediately
• Parents can request deletion of child's data
• Contact us if you believe we have collected child's data
• We encourage parental monitoring of children's online activities

Responsibilities:
• Parents should supervise children's internet use
• Teach children about online privacy and safety
• Monitor what information children share online
• Discuss privacy practices with children

If You're a Parent/Guardian:
• Contact us immediately if your child's data was collected
• We'll remove the information promptly
• We can discuss child safety measures`,
    },
    {
      title: "Policy Changes",
      icon: "📝",
      content: `We may update this policy:

When We Change It:
• We'll post updates on this page
• We'll update the "Last Updated" date
• For major changes, we'll notify you via email
• You'll need to accept new terms to continue using the site

Your Rights:
• Review changes before accepting
• Opt-out if you disagree with changes
• Close your account if desired
• Request old policy versions

Effective Immediately:
• Updates take effect when posted
• Continued use means acceptance
• We recommend reviewing periodically
• Check back frequently for updates`,
    },
    {
      title: "Contact Us",
      icon: "📞",
      content: `Questions about our privacy practices?

Contact Information:
Email: privacy@redragoncolombo.lk
Phone: +94 11 234 5678
WhatsApp: +94 11 234 5678
Address: 123 Gaming Street, Colombo, Sri Lanka
Hours: Monday - Friday, 9 AM - 6 PM (Sri Lanka Time)

What We Can Help With:
• Privacy inquiries and concerns
• Data access or deletion requests
• Cookie management questions
• Security issue reporting
• Policy clarification
• Complaint resolution

Response Time:
• We aim to respond within 24 hours
• Complex requests may take up to 30 days
• You'll receive confirmation of receipt
• Updates provided throughout process`,
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
                  We're Committed to Your Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  At Redragon Colombo, protecting your personal information is our top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our privacy practices.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto"
        >
          {[
            { icon: <Lock className="w-8 h-8 text-white" />, title: "Secure", desc: "Industry-standard encryption" },
            { icon: <Eye className="w-8 h-8 text-white" />, title: "Transparent", desc: "Clear privacy practices" },
            { icon: <Share2 className="w-8 h-8 text-white" />, title: "Control", desc: "You control your data" },
            { icon: <Shield className="w-8 h-8 text-white" />, title: "Protected", desc: "We protect your information" },
          ].map((principle, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-500/20 transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4">
                {principle.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase">
                {principle.title}
              </h3>
              <p className="text-sm text-gray-600">{principle.desc}</p>
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

        {/* Data Protection Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white border-2 border-blue-400">
            <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              Protect Your Privacy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Use Strong Passwords", desc: "At least 12 characters with mixed case and symbols" },
                { title: "Enable 2FA", desc: "Add two-factor authentication for extra security" },
                { title: "Review Permissions", desc: "Check and update your privacy settings regularly" },
                { title: "Report Issues", desc: "Immediately report suspicious activity to us" },
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 text-xl">✓</div>
                  <div>
                    <h4 className="font-black uppercase mb-1">{tip.title}</h4>
                    <p className="text-white/80 text-sm">{tip.desc}</p>
                  </div>
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
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">
              🤝 Privacy Questions?
            </h2>
            <p className="text-gray-700 mb-6">
              We're here to answer any questions about our privacy practices and help you protect your data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:privacy@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-blue-300 transition-all font-bold text-blue-600 uppercase"
              >
                📧 privacy@redragoncolombo.lk
              </a>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-4 rounded-xl border-2 border-blue-300 transition-all font-bold text-blue-600 uppercase"
              >
                📞 +94 11 234 5678
              </a>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Last Updated: January 2025 • We regularly review and update this policy
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
