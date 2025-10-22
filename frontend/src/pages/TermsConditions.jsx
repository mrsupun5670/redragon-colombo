import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, FileText, AlertCircle, Check } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const TermsConditions = () => {
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    {
      title: "Use of Website",
      icon: "🌐",
      content: `By accessing and using our website, you agree to comply with these terms and conditions:

Age Requirements:
• You must be at least 18 years old to use our website
• Parental/guardian consent required for users under 18
• We reserve the right to verify age upon request

Account Responsibility:
• You are responsible for maintaining account confidentiality
• Your username and password are your responsibility
• You agree not to share login credentials with anyone
• You must immediately notify us of unauthorized access
• All activities under your account are your responsibility

Acceptable Use:
• You agree NOT to use our website for illegal activities
• No harassment, threats, or abusive behavior
• No unauthorized access or hacking attempts
• No spamming or sending unsolicited messages
• No data scraping or automated access
• No copying content without permission
• No disrupting site functionality or services
• No circumventing security measures`,
    },
    {
      title: "Product Information & Pricing",
      icon: "🏷️",
      content: `Important information about our products and prices:

Accuracy of Information:
• We strive to provide accurate product descriptions
• Images are representative of actual products
• Colors may vary due to screen display differences
• We are not liable for image inaccuracies
• Product specifications are subject to change
• Technical specs are provided "as-is"

Pricing:
• All prices are in Sri Lankan Rupees (LKR)
• Prices are subject to change without notice
• Promotions are valid for limited time only
• Discounts may have specific terms and conditions
• We reserve the right to correct pricing errors
• Advertised prices may differ online vs. in-store (if applicable)

Stock Availability:
• Product availability is subject to stock levels
• We do not guarantee continuous stock
• Out-of-stock items may be subject to backorder
• We'll notify you of unavailable items
• Pre-orders may have different terms
• Quantity limits may apply during promotions`,
    },
    {
      title: "Orders & Payments",
      icon: "💳",
      content: `Terms governing orders and payment:

Order Placement:
• Placing an order is an offer to purchase
• We reserve the right to refuse or cancel any order
• Cancellation may occur for:
  - Product unavailability
  - Pricing errors
  - Incorrect product information
  - Suspected fraudulent activity
  - Your violation of these terms
  - Delivery to restricted areas

Payment Requirements:
• You must provide valid payment information
• Credit/debit cards must be authorized for the amount
• You authorize us to charge your payment method
• You are responsible for all charges
• Fraudulent cards will be reported to authorities

Payment Processing:
• Payment is processed by secure third-party providers
• We do not store full payment card details
• Payment details are handled per PCI compliance
• Processing may take 1-3 business days
• Confirmation email will be sent upon successful payment
• Failed payments will result in order cancellation

Taxes & Fees:
• Prices may exclude applicable taxes
• GST/VAT calculated at checkout
• Shipping fees shown before order confirmation
• Additional duties/customs fees may apply
• You are responsible for any import duties`,
    },
    {
      title: "Shipping & Delivery",
      icon: "🚚",
      content: `Our shipping terms and conditions:

Shipping Policy:
• We make reasonable efforts to ship promptly
• Estimated delivery times are provided for reference
• Actual delivery times may vary based on location
• We use reputable courier services
• Shipping is at your risk after handover to courier
• We're not liable for carrier delays

Delivery Timeframe:
• Processing: 1-3 business days
• Shipping: 2-7 business days (depending on location)
• Remote areas may take longer
• Holidays may affect delivery schedules
• Tracking information will be provided via email
• You'll receive SMS updates when available

Delivery Risks:
• Delivered items are your responsibility
• We recommend signature on delivery
• Report damage immediately upon receipt
• Keep original packaging for returns
• Undelivered items will be returned to us
• Refunds issued for undelivered packages

Address Requirements:
• Complete and accurate address required
• Apartment/building numbers must be clear
• Contact number must be valid
• We are not liable for incomplete addresses
• Address changes must be made before shipment
• Redelivery fees may apply for address issues`,
    },
    {
      title: "Returns & Refunds",
      icon: "🔄",
      content: `Detailed terms for returns and refunds:

Return Eligibility:
• Returns accepted within 30 days of purchase
• Items must be unused and in original condition
• Original packaging must be included
• Non-returnable items: Digital products, gift cards
• Damaged items by customer are non-returnable
• Final sale items cannot be returned

Return Process:
• Contact us to initiate a return
• Obtain return authorization number
• Follow instructions for packaging
• Ship item to our warehouse
• We'll inspect upon receipt
• Refund approved within 5-7 business days

Refund Details:
• Original shipping costs are non-refundable
• Return shipping is customer's responsibility
• Full refund issued for approved returns
• Refunds are to original payment method
• Bank processing takes 7-14 business days
• Partial refunds issued for damaged items

Exchange Option:
• Exchange for different size/color/style
• No additional shipping for exchanges
• Exchanges processed within 10-15 days
• Price differences may apply
• Contact us within 30 days to exchange`,
    },
    {
      title: "Intellectual Property",
      icon: "©️",
      content: `Protection of our intellectual property:

Ownership of Content:
• All website content is proprietary
• Text, images, logos, graphics are protected
• Product photos are protected by copyright
• Written descriptions are our intellectual property
• You have no ownership rights to content

Your License:
• Limited license to view and print content
• Personal, non-commercial use only
• No modification or alteration allowed
• No republishing or distribution
• No removing copyright notices
• License terminates upon violating these terms

Prohibited Activities:
• No reproducing content for public use
• No modifying our logos or branding
• No creating derivative works
• No framing or embedding our content
• No using our content for commercial purposes
• No crawling or scraping our website
• Violators may face legal action

Reporting Infringement:
• Report copyright violations to: legal@redragoncolombo.lk
• Include details of infringement
• Provide evidence and documentation
• We'll investigate within 5 business days
• Proper DMCA notices will be honored`,
    },
    {
      title: "Limitation of Liability",
      icon: "⚠️",
      content: `Important limitations on our liability:

Disclaimers:
• Website provided "as-is" without warranties
• No warranties of merchantability or fitness
• No guarantees on product quality or performance
• We don't warrant uninterrupted service
• Third-party links are not endorsed
• Third-party content is not our responsibility

Limitation of Damages:
• We are NOT liable for:
  - Direct or indirect damages
  - Lost profits or business interruption
  - Loss of data or files
  - Personal injury or property damage
  - Emotional distress or reputational harm
  - Damages from third-party actions
  - Service interruptions or errors

Liability Caps:
• Our total liability limited to purchase amount
• For disputes, maximum refund only
• We are not liable for consequential damages
• No liability for third-party actions
• Some jurisdictions don't allow limitations
• Check local laws for applicability

Your Responsibility:
• You assume all risks of using our website
• You are responsible for backup of data
• You agree to indemnify us for violations
• You must not hold us responsible for losses
• Use website at your own risk`,
    },
    {
      title: "Amendments & Termination",
      icon: "📜",
      content: `Terms regarding changes and account termination:

Modifications:
• We reserve right to modify these terms anytime
• Changes posted on this page with new date
• Major changes notified via email
• Continued use means acceptance of new terms
• You can reject new terms by closing account
• Check back periodically for updates

Termination of Service:
• We may terminate service for:
  - Violation of these terms
  - Illegal activity or fraud
  - Repeated policy violations
  - Non-payment
  - Your request
  - Business necessity

Account Termination:
• You can close account anytime
• Request account closure via email
• Data will be handled per Privacy Policy
• Termination effective immediately
• Non-refundable prepaid amounts kept
• Outstanding orders still processed

Effect of Termination:
• Access to account revoked immediately
• Right to use website ends
• All licenses granted are terminated
• Obligations continue after termination
• Dispute resolution terms still apply
• Survival provisions remain in effect

Surviving Terms:
• Payment obligations
• Intellectual property rights
• Limitation of liability
• Indemnification
• Dispute resolution
• Privacy policies`,
    },
    {
      title: "Dispute Resolution",
      icon: "⚖️",
      content: `How we handle disputes and complaints:

Governing Law:
• These terms governed by Sri Lankan law
• Disputes subject to Sri Lankan jurisdiction
• Courts in Colombo have exclusive jurisdiction
• International disputes handled per agreement
• Local laws take precedence

Dispute Process:
• First step: Contact customer service
• Provide order number and details
• Explain issue clearly
• Allow 5 business days for response
• Follow up via email if needed
• Escalate to management if unresolved

Negotiation:
• We will attempt good faith negotiation
• Reasonable time given for resolution
• Both parties have opportunity to present case
• Settlement terms must be in writing
• Agreed settlements are binding

Arbitration:
• If negotiation fails, arbitration may apply
• Arbitration is binding and final
• Costs shared equally between parties
• Arbitrator's decision is enforceable
• Limited appeal rights in arbitration

Complaints:
• Submit complaints to: support@redragoncolombo.lk
• Include detailed description
• Provide supporting documentation
• Reference order/transaction number
• We aim to respond within 24 hours
• Formal complaint form available on request`,
    },
    {
      title: "Contact & Support",
      icon: "📞",
      content: `How to reach us with questions or issues:

Customer Support:
Email: support@redragoncolombo.lk
Phone: +94 11 234 5678
WhatsApp: +94 11 234 5678
Hours: Monday - Friday, 9 AM - 6 PM (Sri Lanka Time)
Response Time: Usually within 24 hours

Legal/Compliance:
Email: legal@redragoncolombo.lk
For: Terms violations, intellectual property, legal matters

Privacy Concerns:
Email: privacy@redragoncolombo.lk
For: Privacy policy questions, data requests

Technical Issues:
Email: tech@redragoncolombo.lk
For: Website technical problems, bugs, errors

Feedback & Suggestions:
Email: feedback@redragoncolombo.lk
For: Comments, suggestions, feedback

Mailing Address:
Redragon Colombo
123 Gaming Street
Colombo, Sri Lanka

Response Guarantee:
• All inquiries acknowledged within 24 hours
• Complex issues may require more time
• We maintain detailed support logs
• Escalation available if needed
• Your satisfaction is our priority`,
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
      <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 pt-24 pb-20 border-b-4 border-purple-700">
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
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              Please Read Before Using Our Website
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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <div className="flex gap-4">
              <div className="text-4xl">📋</div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase">
                  Welcome to Redragon Colombo
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms and Conditions govern your use of our website, purchases, and all transactions. By accessing and using our platform, you agree to be legally bound by these terms. Please read them carefully. If you don't agree with any part, please don't use our website.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Points Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {[
            { icon: <Check className="w-6 h-6" />, title: "18+ Required", desc: "Must be 18 to purchase" },
            { icon: <AlertCircle className="w-6 h-6" />, title: "Legal Binding", desc: "These terms are legally binding" },
            { icon: <FileText className="w-6 h-6" />, title: "Regular Updates", desc: "Terms may change anytime" },
            { icon: <Check className="w-6 h-6" />, title: "Read Carefully", desc: "Understand before purchasing" },
          ].map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-purple-500/20 transition-all flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
                  {point.icon}
                </div>
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase text-sm mb-1">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600">{point.desc}</p>
              </div>
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
            Full Terms & Conditions
          </h2>

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-500/30 overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === idx ? -1 : idx)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-purple-50 transition-colors"
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
                    <ChevronDown className="w-6 h-6 text-purple-600" />
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

        {/* Acknowledgment Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-2 border-purple-300">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">
              ✓ Your Agreement
            </h2>
            <p className="text-gray-800 mb-4 leading-relaxed">
              By clicking "I Agree" or continuing to use our website, you acknowledge that you have:
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Read and understood these Terms & Conditions",
                "Confirmed you are at least 18 years old",
                "Agree to be legally bound by these terms",
                "Understood our Return, Privacy, and Refund policies",
                "Accept all risks associated with online shopping",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-purple-600 font-black">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white border-2 border-purple-400">
            <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-3">
              <span className="text-3xl">📬</span>
              Questions About These Terms?
            </h2>
            <p className="text-white/90 mb-6">
              If you have any questions or concerns about our Terms & Conditions, don't hesitate to reach out to our legal team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:legal@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl border-2 border-white/30 transition-all font-bold uppercase"
              >
                ⚖️ legal@redragoncolombo.lk
              </a>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl border-2 border-white/30 transition-all font-bold uppercase"
              >
                📞 +94 11 234 5678
              </a>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Last Updated: January 2025 • Effective Date: February 1, 2025
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TermsConditions;
