/**
 * REDRAGON COLOMBO - IMMERSIVE 3D HOMEPAGE (LIGHT THEME)
 *
 * An immersive scroll experience that takes users through a gaming PC build.
 * Features 3D depth scrolling with camera movement using React Three Fiber.
 *
 * Scroll Journey:
 * 1. Hero - Wide view of gaming setup
 * 2. Zoom into monitor
 * 3. Dive into PC case internals
 * 4. Content sections reveal
 *
 * Tech Stack: React + Three.js (React Three Fiber) + Framer Motion
 */

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion, useScroll as useFramerScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import {
  Monitor,
  Cpu,
  Zap,
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  ArrowDown,
  Sparkles,
  Gamepad2,
  Package,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

// Image Layer Component
const ImageLayer = ({ position, scale, imageUrl, opacity = 1 }) => {
  const textureLoader = new THREE.TextureLoader();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    textureLoader.load(imageUrl, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [imageUrl]);

  if (!texture) return null;

  return (
    <mesh position={position}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// 3D Scene Component with Scroll-based Camera Movement and Real Images
const ScrollScene = () => {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Camera journey based on scroll
    if (scrollProgress < 0.2) {
      // Stage 1: Wide view of setup (hero)
      const t = scrollProgress / 0.2;
      camera.position.z = 15 - t * 4;
      camera.position.y = 1 - t * 0.3;
    } else if (scrollProgress < 0.4) {
      // Stage 2: Zooming into monitor
      const t = (scrollProgress - 0.2) / 0.2;
      camera.position.z = 11 - t * 3;
      camera.position.y = 0.7 - t * 0.3;
    } else if (scrollProgress < 0.6) {
      // Stage 3: Moving through monitor into PC case
      const t = (scrollProgress - 0.4) / 0.2;
      camera.position.z = 8 - t * 4;
      camera.position.y = 0.4 - t * 0.4;
      camera.position.x = t * 0.5;
    } else {
      // Stage 4: Inside PC case view
      camera.position.z = 4;
      camera.position.y = 0;
      camera.position.x = 0.5;
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Bright ambient lighting for light theme */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <pointLight position={[0, 5, 10]} intensity={0.5} color="#ff4444" />

      {/* Layer 1: Background - Gaming Room Setup (far) */}
      <ImageLayer
        position={[0, 0, -10]}
        scale={[25, 15]}
        imageUrl="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=90"
        opacity={0.9}
      />

      {/* Layer 2: Gaming Desk with Monitor (middle) */}
      <ImageLayer
        position={[0, 0, -5]}
        scale={[18, 11]}
        imageUrl="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1000&q=90"
        opacity={0.95}
      />

      {/* Layer 3: Close-up Monitor/PC (near) */}
      <ImageLayer
        position={[0, 0, 0]}
        scale={[12, 8]}
        imageUrl="https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=90"
        opacity={1}
      />

      {/* Layer 4: PC Internals (nearest) */}
      <ImageLayer
        position={[0.5, 0, 5]}
        scale={[8, 6]}
        imageUrl="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=90"
        opacity={1}
      />

      {/* Layer 5: GPU Close-up (very near) */}
      <ImageLayer
        position={[-0.3, 0, 8]}
        scale={[6, 4]}
        imageUrl="https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=90"
        opacity={0.95}
      />
    </>
  );
};

const HomeImmersive3D = () => {
  const { scrollYProgress } = useFramerScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <Navbar />
      <WhatsAppButton />

      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 1, 15]} fov={75} />
          <Suspense fallback={null}>
            <ScrollScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section - Full viewport */}
        <section className="h-screen flex items-center justify-center text-center relative">
          <motion.div style={{ opacity }} className="max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border-2 border-red-200 shadow-lg px-6 py-3 rounded-full mb-8">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-bold text-sm uppercase tracking-wider">
                  Welcome to Redragon Colombo
                </span>
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-none drop-shadow-sm">
                GAME
                <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  BEYOND LIMITS
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 font-bold drop-shadow-sm">
                Custom PC Builds • Gaming Laptops • Premium Accessories
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <motion.a
                  href="#builds"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-red-500/30 border-2 border-red-400 inline-flex items-center gap-2"
                >
                  <Cpu className="w-5 h-5" />
                  Build Your PC
                </motion.a>

                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-md hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-bold border-2 border-gray-300 hover:border-red-500 shadow-lg inline-flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Shop Now
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <ArrowDown className="w-8 h-8 text-red-500 drop-shadow-lg" />
              <p className="text-sm text-gray-700 font-bold mt-2 drop-shadow-sm">Scroll to explore</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Spacer for scroll depth */}
        <div className="h-[100vh]" />

        {/* Content Sections */}
        <div className="relative bg-gradient-to-b from-white/90 via-white to-gray-50 backdrop-blur-md">
          {/* Custom PC Builds Section */}
          <section id="builds" className="py-32 px-4">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 px-4 py-2 rounded-full mb-6 shadow-sm">
                  <Cpu className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-bold text-sm uppercase">Custom Builds</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                  Build Your Dream PC
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                  Tailored gaming rigs built with premium components for maximum performance
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Entry Build",
                    price: "LKR 150,000+",
                    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80",
                    specs: ["Ryzen 5 / i5", "RTX 3060", "16GB RAM", "500GB SSD"],
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Performance Build",
                    price: "LKR 300,000+",
                    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
                    specs: ["Ryzen 7 / i7", "RTX 4070", "32GB RAM", "1TB SSD"],
                    color: "from-red-500 to-pink-500",
                    featured: true,
                  },
                  {
                    title: "Ultimate Build",
                    price: "LKR 500,000+",
                    image: "https://images.unsplash.com/photo-1600861194802-a2b11076bc51?w=600&q=80",
                    specs: ["Ryzen 9 / i9", "RTX 4090", "64GB RAM", "2TB SSD"],
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((build, index) => (
                  <motion.div
                    key={build.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`relative bg-white rounded-2xl overflow-hidden border-2 shadow-xl ${
                      build.featured ? "border-red-500 shadow-red-500/20" : "border-gray-200"
                    } hover:border-red-500 hover:shadow-2xl transition-all group`}
                  >
                    {build.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        POPULAR
                      </div>
                    )}

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={build.image}
                        alt={build.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${build.color} opacity-40 group-hover:opacity-50 transition-opacity`} />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-black text-gray-900 mb-2">{build.title}</h3>
                      <p className={`text-3xl font-black bg-gradient-to-r ${build.color} bg-clip-text text-transparent mb-4`}>
                        {build.price}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {build.specs.map((spec) => (
                          <li key={spec} className="text-gray-600 flex items-center gap-2 font-medium">
                            <Zap className="w-4 h-4 text-red-500" />
                            {spec}
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full bg-gradient-to-r ${build.color} text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                      >
                        Customize Build
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Gaming Laptops Section */}
          <section id="laptops" className="py-32 px-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-purple-50 border-2 border-purple-200 px-4 py-2 rounded-full mb-6 shadow-sm">
                  <Monitor className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-600 font-bold text-sm uppercase">Gaming Laptops</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                  Portable Powerhouses
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                  High-performance gaming laptops for gaming anywhere, anytime
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "ASUS ROG Strix G16",
                    price: "LKR 350,000",
                    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
                    specs: ["Intel i7-13650HX", "RTX 4060 8GB", "16GB DDR5", "165Hz Display"],
                  },
                  {
                    title: "Lenovo Legion Pro 5",
                    price: "LKR 450,000",
                    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
                    specs: ["AMD Ryzen 7", "RTX 4070 8GB", "32GB DDR5", "240Hz Display"],
                  },
                ].map((laptop, index) => (
                  <motion.div
                    key={laptop.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-purple-500 hover:shadow-2xl transition-all group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={laptop.image}
                        alt={laptop.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/40 to-transparent" />
                    </div>

                    <div className="p-8">
                      <h3 className="text-3xl font-black text-gray-900 mb-2">{laptop.title}</h3>
                      <p className="text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                        {laptop.price}
                      </p>

                      <ul className="space-y-3 mb-6">
                        {laptop.specs.map((spec) => (
                          <li key={spec} className="text-gray-600 flex items-center gap-2 text-lg font-medium">
                            <Zap className="w-5 h-5 text-purple-500" />
                            {spec}
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl text-lg transition-all"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Accessories Section */}
          <section id="accessories" className="py-32 px-4">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-cyan-50 border-2 border-cyan-200 px-4 py-2 rounded-full mb-6 shadow-sm">
                  <Gamepad2 className="w-5 h-5 text-cyan-600" />
                  <span className="text-cyan-600 font-bold text-sm uppercase">Accessories</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                  Complete Your Setup
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                  Premium gaming peripherals and accessories
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Gaming Keyboards",
                    icon: "⌨️",
                    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
                  },
                  {
                    title: "Gaming Mice",
                    icon: "🖱️",
                    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
                  },
                  {
                    title: "Headsets",
                    icon: "🎧",
                    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80",
                  },
                  {
                    title: "Monitors",
                    icon: "🖥️",
                    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
                  },
                ].map((category, index) => (
                  <motion.a
                    key={category.title}
                    href="/products"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-cyan-500 hover:shadow-xl transition-all group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-lg">
                        {category.icon}
                      </div>
                    </div>
                    <div className="p-4 bg-white text-center">
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center mt-12"
              >
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl text-lg transition-all"
                >
                  <Package className="w-5 h-5" />
                  Browse All Products
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 bg-red-500/20 border-2 border-red-500/40 px-4 py-2 rounded-full mb-6 shadow-sm">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-bold text-sm uppercase">Visit Us</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Redragon Colombo
                </h2>
                <p className="text-xl text-gray-300 font-medium">
                  Your premium gaming gear destination in Sri Lanka
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/20 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                        <MapPin className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-1">Location</h3>
                        <p className="text-gray-300">
                          123 Gaming Street, Colombo 03<br />
                          Sri Lanka
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                        <Phone className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-1">Phone</h3>
                        <p className="text-gray-300">+94 11 234 5678</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                        <Mail className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-1">Email</h3>
                        <p className="text-gray-300">info@redragoncolombo.lk</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl text-lg inline-flex items-center gap-2 transition-all"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeImmersive3D;
