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
      title: "1. Definitions",
      icon: "📖",
      content: `Throughout these Terms and Conditions:

"Customer", "User", "You", or "Your" refers to any individual who visits or uses this website and agrees to the company's policies.

"Company", "We", "Our", or "Us" refers to Redragon Colombo.

"Party", "Parties" refers collectively to both the User and Redragon Colombo.

All terms refer to the agreement, acceptance, and understanding necessary to provide the services offered by Redragon Colombo in accordance with the laws of Sri Lanka.`,
    },
    {
      title: "2. Cookies",
      icon: "🍪",
      content: `We use cookies to enhance your browsing experience. By using www.redragoncolombo.lk, you consent to the use of cookies in accordance with our Privacy Policy.

Cookies help us remember your preferences, improve functionality, and analyze website usage. Some third-party affiliates or advertising partners may also utilize cookies.`,
    },
    {
      title: "3. User Comments",
      icon: "💬",
      content: `When visitors leave comments on our site, we collect the information provided in the comment form, including the visitor's IP address and browser details, to help prevent spam. Once approved, your comment and profile image (if available) may be visible publicly.

We do not edit or pre-screen comments before they appear on the website. Comments solely represent the opinions of the individuals posting them, and Redragon Colombo will not be held liable for any loss, claim, or damage resulting from such comments.

We reserve the right to review and remove any comments that are inappropriate, offensive, or violate these Terms and Conditions.

By posting comments, you confirm that:
• You have the right and permission to post the content.
• Your comment does not infringe on any copyright, trademark, or other intellectual property rights.
• Your comment does not contain defamatory, abusive, obscene, or unlawful material.
• Your comment is not used for promotional or illegal purposes.

By submitting comments, you grant Redragon Colombo a non-exclusive, worldwide license to use, modify, and publish your content in any form or media.`,
    },
    {
      title: "4. Intellectual Property Rights",
      icon: "©️",
      content: `All materials on www.redragoncolombo.lk — including text, images, graphics, and code — are owned by Redragon Colombo or its licensors. All rights are reserved.

You may view and print content for personal, non-commercial use only, subject to the following restrictions:
• You may not republish, sell, rent, or sub-license website content.
• You may not reproduce, duplicate, or copy any part of the site for commercial purposes.
• You may not redistribute content from this website without written permission.`,
    },
    {
      title: "5. Linking to Our Website",
      icon: "🔗",
      content: `The following organizations may link to our website without prior written approval:
• Government bodies
• Search engines
• News outlets
• Online directories linking to other business sites
• System-wide accredited businesses (excluding non-profit solicitation groups)

These entities may link to our homepage or publications as long as the link:
• Is not misleading or deceptive,
• Does not falsely imply sponsorship or endorsement, and
• Fits within the context of the linking party's site.

To request link approval, please email us at support@redragoncolombo.lk, providing your details and the URLs you intend to link from and to.

Approved organizations may link to our website by using:
• Our corporate name,
• The website URL, or
• A description consistent with the linking site's content.

Use of the Redragon Colombo logo or artwork for linking is prohibited without a trademark license agreement.`,
    },
    {
      title: "6. iFrames",
      icon: "🖼️",
      content: `Creating frames around our webpages that alter the site's visual presentation or appearance is strictly prohibited without prior written consent.`,
    },
    {
      title: "7. Content Liability",
      icon: "⚠️",
      content: `We will not be held responsible for any content appearing on third-party websites that link to us. You agree to indemnify Redragon Colombo against any claims arising from content on your site.

No links should appear on websites containing unlawful, obscene, defamatory, or criminal material, or content that infringes third-party rights.`,
    },
    {
      title: "8. Reservation of Rights",
      icon: "✋",
      content: `We reserve the right to request the removal of any link to our website at any time. By continuing to link to our site, you agree to remove any links upon our request.

We also reserve the right to update these Terms and Conditions and our linking policies at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.`,
    },
    {
      title: "9. Removal of Links from Our Website",
      icon: "🗑️",
      content: `If you find any link on www.redragoncolombo.lk or any linked website that you find inappropriate or offensive, please contact us. We will review such requests but are not obligated to remove the link or respond directly.`,
    },
    {
      title: "10. Pricing Policy",
      icon: "💰",
      content: `Product prices displayed on RedragonColombo.lk may differ from the actual retail price. We do our best to ensure accurate pricing; however, errors may occur.

If an item is incorrectly priced, we will:
• Notify you before delivery for confirmation or cancellation, or
• Cancel the order if necessary and issue a refund if payment was already made.`,
    },
    {
      title: "11. Product Availability",
      icon: "📦",
      content: `Some listed items may occasionally be out of stock. If you order a product that is unavailable after completing payment via PayHere or bank transfer, we will refund the full amount paid.

You will receive an Order Confirmation Email once your order is placed. This confirmation only acknowledges receipt of your order — it does not constitute acceptance. Your order will be confirmed once the product is verified to be in stock and ready for dispatch.`,
    },
    {
      title: "12. Vouchers and Gift Cards",
      icon: "🎁",
      content: `Purchased vouchers or gift cards are non-refundable, cannot be exchanged for cash, and are valid for one-time use only.`,
    },
    {
      title: "13. Disclaimer",
      icon: "📌",
      content: `To the fullest extent permitted by law, Redragon Colombo disclaims all warranties and representations relating to the use of this website.

Nothing in this disclaimer will:
• Limit or exclude liability for death or personal injury;
• Limit or exclude liability for fraud or fraudulent misrepresentation;
• Limit any liability not permitted under applicable law.

As long as this website and its content are provided free of charge, we are not responsible for any loss or damage incurred from its use.`,
    },
    {
      title: "14. Updates to These Terms",
      icon: "🔄",
      content: `Redragon Colombo reserves the right to modify, update, or replace any part of these Terms and Conditions at our discretion. Updates will be posted on this page, and continued use of the website constitutes acceptance of the revised terms.`,
    },
    {
      title: "15. Contact Us",
      icon: "📞",
      content: `If you have any questions or concerns about these Terms and Conditions, please reach out to us via the Contact Form on our website or email us at info@redragoncolombo.lk.`,
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
                  These Terms and Conditions outline the guidelines and rules for using our website, www.redragoncolombo.lk.

By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of the website immediately.
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
              If you have any questions or concerns about our Terms & Conditions, don't hesitate to reach out to us.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:info@redragoncolombo.lk"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl border-2 border-white/30 transition-all font-bold uppercase"
              >
                📧 info@redragoncolombo.lk
              </a>
              <a
                href="tel:+94112345678"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl border-2 border-white/30 transition-all font-bold uppercase"
              >
                📞 +94 11 234 5678
              </a>
            </div>

            <p className="text-white/80 text-sm mt-6">
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

export default TermsConditions;
