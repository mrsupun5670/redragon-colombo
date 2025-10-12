import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap, Shield, Cpu, Gamepad2, ChevronDown, Monitor,
  MemoryStick, Fan, HardDrive, Radio
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ParticleEffect from "../components/ParticleEffect";
import FuturisticProductCard from "../components/FuturisticProductCard";
import { featuredProducts, bestSellers } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const HomeGaming3D = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP 3D PC Interior Dive Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero - Zoom into PC
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: false,
        },
      })
        .to(".hero-content", {
          scale: 0.8,
          opacity: 0,
          y: -100,
          ease: "power2.inOut",
        })
        .to(".pc-case-frame", {
          scale: 1.5,
          opacity: 0.5,
          ease: "power2.inOut",
        }, "<");

      // PC Component Layers - Dive Effect
      const components = [".gpu-layer", ".cpu-layer", ".ram-layer", ".mobo-layer", ".cooling-layer"];

      components.forEach((component, index) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: component,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
          .fromTo(component,
            {
              z: -1000 * (index + 1),
              opacity: 0,
              scale: 0.5,
            },
            {
              z: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
            }
          )
          .to(component, {
            z: 500,
            opacity: 0.3,
            scale: 1.2,
            ease: "power2.in",
          });
      });

      // Product Cards - Slide & Rotate Animation
      gsap.utils.toArray(".product-card-animated").forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.8,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            ease: "power3.out",
          }
        );
      });

      // Stats Animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top center+=100",
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white overflow-x-hidden" style={{ perspective: "2000px" }}>
      <Navbar />
      <ParticleEffect />

      {/* Hero Section - PC Case Entry */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1920&q=80"
            alt="Gaming Setup"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white/98 to-white"></div>
        </div>

        {/* PC Case Frame */}
        <div className="pc-case-frame absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center">
            {/* Subtle PC Case Border */}
            <div className="absolute inset-0 m-12 border-4 border-gray-300/30 rounded-3xl"
                 style={{
                   boxShadow: "inset 0 0 100px rgba(0,0,0,0.05)",
                   transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                 }}>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white border-2 border-red-500/20 rounded-full px-6 py-2 mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 text-red-500" />
              <span className="text-gray-900 font-bold uppercase text-sm">
                Official Redragon Store Sri Lanka
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                DIVE INTO
              </span>
              <span className="block text-gray-900">
                GAMING EXCELLENCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Explore the interior of gaming perfection. Every component branded with{" "}
              <span className="font-bold text-red-500">Redragon</span> quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold uppercase text-white shadow-lg flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                Explore Products
              </motion.a>

              <motion.a
                href="#components"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-bold uppercase text-gray-900 hover:border-red-500 transition-all shadow-lg"
              >
                See Components
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-sm text-gray-500 mt-2 font-semibold">Scroll to dive in</p>
          </motion.div>
        </div>
      </section>

      {/* PC Component Layers - Dive Into PC */}
      <div id="components" className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* GPU Layer */}
        <section className="gpu-layer relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1920&q=80"
              alt="Gaming GPU"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-gray-50"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-red-500/10 border-2 border-red-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Monitor className="w-6 h-6 text-red-500" />
                <span className="text-red-600 font-bold uppercase text-sm">Graphics Power</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
                Powered by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Redragon Peripherals
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Experience ultra-responsive gaming keyboards and mice engineered for precision and speed
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="product-card-animated"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FuturisticProductCard product={product} showCategory />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CPU Layer */}
        <section className="cpu-layer relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1920&q=80"
              alt="Gaming CPU"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white/95 to-white"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-orange-500/10 border-2 border-orange-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Cpu className="w-6 h-6 text-orange-500" />
                <span className="text-orange-600 font-bold uppercase text-sm">Processing Excellence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
                Performance
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  That Dominates
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Mechanical keyboards with ultra-fast response times for competitive gaming
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.slice(3, 6).map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="product-card-animated"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FuturisticProductCard product={product} showCategory />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* RAM Layer */}
        <section className="ram-layer relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&q=80"
              alt="Gaming RAM"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-red-50"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-red-500/10 border-2 border-red-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <MemoryStick className="w-6 h-6 text-red-500" />
                <span className="text-red-600 font-bold uppercase text-sm">Memory & Speed</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
                Lightning Fast
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Response Times
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Gaming mice with pixel-perfect accuracy and customizable DPI settings
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bestSellers.slice(0, 3).map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="product-card-animated"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FuturisticProductCard product={product} showCategory />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Motherboard Layer */}
        <section className="mobo-layer relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=1920&q=80"
              alt="Gaming Motherboard"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-white/95 to-white"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-gray-900/10 border-2 border-gray-900/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <HardDrive className="w-6 h-6 text-gray-900" />
                <span className="text-gray-900 font-bold uppercase text-sm">Core Foundation</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
                Complete
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Gaming Arsenal
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Headsets and accessories to complete your ultimate gaming setup
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bestSellers.slice(3, 6).map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="product-card-animated"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FuturisticProductCard product={product} showCategory />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cooling Layer */}
        <section className="cooling-layer relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=1920&q=80"
              alt="Gaming PC Cooling"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-gray-50"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 bg-red-500/10 border-2 border-red-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Fan className="w-6 h-6 text-red-500" />
                <span className="text-red-600 font-bold uppercase text-sm">Premium Quality</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase">
                Stay Cool
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Under Pressure
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Durable, reliable gaming gear built to last through intense gaming sessions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.slice(6, 9).map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="product-card-animated"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FuturisticProductCard product={product} showCategory />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>


      {/* Stats Section */}
      <section className="stats-section relative py-24 px-4 overflow-hidden bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { number: "50K+", label: "GAMERS", icon: Gamepad2 },
              { number: "100%", label: "GENUINE", icon: Shield },
              { number: "24/7", label: "SUPPORT", icon: Zap },
              { number: "1 YEAR", label: "WARRANTY", icon: Radio },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
              >
                <div className="inline-flex w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2 text-white">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-white/90 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="featured" className="relative py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80"
            alt="Gaming Desk Setup"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white/98 to-white"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase">
              Best
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"> Sellers</span>
            </h2>
            <p className="text-lg text-gray-600">
              Top picks trusted by the gaming community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                className="product-card-animated"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FuturisticProductCard product={product} showCategory />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold uppercase text-white shadow-lg"
            >
              View All Products
              <Gamepad2 className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 overflow-hidden bg-white">
        <div className="container mx-auto relative z-10 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase"
          >
            Ready to Level Up?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Join thousands of gamers who trust{" "}
            <span className="font-bold text-red-500">Redragon</span> for their competitive edge
          </motion.p>

          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold uppercase text-lg shadow-xl"
          >
            <Gamepad2 className="w-6 h-6" />
            Shop Now
          </motion.a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomeGaming3D;
