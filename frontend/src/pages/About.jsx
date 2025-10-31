import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  TrendingUp,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import DevelopmentWatermark from "../components/common/DevelopmentWatermark";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Genuine",
      description: "All products come with official warranty and authenticity guarantee",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Trusted by thousands of gamers across Sri Lanka",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Truck,
      title: "Island Wide",
      description: "Fast delivery to all parts of Sri Lanka within 2-3 days",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Dedicated support team ready to help 24/7",
      color: "from-red-500 to-red-600",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Products Sold", icon: TrendingUp },
    { number: "5,000+", label: "Happy Customers", icon: Users },
    { number: "100%", label: "Genuine Products", icon: Shield },
    { number: "24/7", label: "Customer Support", icon: Clock },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide Sri Lankan gamers with authentic, high-quality gaming peripherals at competitive prices, backed by excellent customer service.",
    },
    {
      icon: Zap,
      title: "Our Vision",
      description:
        "To become Sri Lanka's most trusted gaming peripherals retailer, empowering every gamer to reach their full potential.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Authenticity, customer satisfaction, competitive pricing, and unwavering support for the gaming community.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* <DevelopmentWatermark /> */}
      <ParticleEffect />
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 pt-24 pb-20 border-b-4 border-red-700 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex w-24 h-24 bg-white/20 backdrop-blur-md rounded-full items-center justify-center mb-6"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              About Redragon Colombo
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-semibold leading-relaxed px-4">
              Sri Lanka's premier destination for authentic Redragon gaming peripherals.
              We're passionate gamers serving gamers with genuine products and exceptional service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
              <span className="text-red-600">Our</span> Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-sm sm:text-base md:text-lg">
                Founded with a vision to bring world-class gaming peripherals to Sri Lankan gamers,
                <span className="font-bold text-red-600"> Redragon Colombo</span> has grown to become
                the most trusted name in gaming gear.
              </p>
              <p className="text-lg">
                We understand that gaming isn't just a hobby—it's a passion, a lifestyle, and for many,
                a profession. That's why we're committed to providing only{" "}
                <span className="font-bold">100% genuine Redragon products</span> with full warranty coverage.
              </p>
              <p className="text-lg">
                From mechanical keyboards that give you the edge in competitive gaming, to precision
                mice that track your every move, we've got everything you need to level up your setup.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-500">
              <img
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop"
                alt="Gaming Setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent" />
            </div>
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border-4 border-red-500"
            >
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                5+ Years
              </div>
              <div className="text-sm font-black text-gray-700 uppercase">
                Serving Gamers
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16 border-y-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex w-16 h-16 bg-white/20 backdrop-blur-md rounded-full items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-black text-white/90 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight px-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Us?</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold max-w-2xl mx-auto px-4">
            We're not just a store—we're your gaming partner
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-red-500/20"
            >
              <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base md:text-xl font-black text-gray-900 mb-3 uppercase">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-4 md:p-8 shadow-xl border-2 border-gray-100 hover:border-red-500/20 transition-all"
              >
                <div className="inline-flex w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full items-center justify-center mb-6 shadow-lg">
                  <value.icon className="w-8 md:w-10 h-8 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-4 uppercase">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight px-4">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold px-4">
            Visit us or reach out—we're always here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto px-4 md:px-0">
          {[
            {
              icon: MapPin,
              title: "Visit Us",
              info: "123 Gaming Street, Colombo 07, Sri Lanka",
              color: "from-red-500 to-red-600",
            },
            {
              icon: Phone,
              title: "Call Us",
              info: "+94 11 234 5678",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Mail,
              title: "Email Us",
              info: "info@redragoncolombo.lk",
              color: "from-green-500 to-green-600",
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-red-500/20 text-center"
            >
              <div className={`inline-flex w-14 md:w-16 h-14 md:h-16 bg-gradient-to-br ${contact.color} rounded-xl items-center justify-center mb-4 shadow-lg`}>
                <contact.icon className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-xl font-black text-gray-900 mb-3 uppercase">
                {contact.title}
              </h3>
              <p className="text-gray-600 font-semibold text-sm md:text-base">
                {contact.info}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16 border-t-4 border-red-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 uppercase px-4">
              Ready to Upgrade Your Gaming Setup?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 font-semibold px-4">
              Browse our collection of authentic Redragon products
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-2xl hover:shadow-3xl transition-all"
            >
              Shop Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
