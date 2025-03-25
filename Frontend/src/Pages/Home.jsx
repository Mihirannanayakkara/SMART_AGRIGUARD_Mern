import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaSearch, FaMobileAlt } from 'react-icons/fa';
import { RiPlantLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WhatWeOffer from '../components/WhatWeOffer';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleGetStarted = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-green-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            filter: 'blur(8px)',
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="relative z-20 text-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold mb-4 text-white text-shadow-lg"
          >
            AgriGuard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl mb-8 text-white text-shadow-md"
          >
            Advanced Plant Disease Identification System
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      <WhatWeOffer />

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaLeaf, title: 'Accurate Detection', description: 'Identify plant diseases with high precision' },
              { icon: FaSearch, title: 'Instant Results', description: 'Get quick analysis of plant health' },
              { icon: FaMobileAlt, title: 'Mobile Friendly', description: 'Use AgriGuard on any device, anywhere' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: scrollY > 300 ? 1 : 0, y: scrollY > 300 ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <feature.icon className="text-5xl text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            {[
              { step: 1, text: 'Take a photo of your plant' },
              { step: 2, text: 'Upload it to AgriGuard' },
              { step: 3, text: 'Get instant disease analysis' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: scrollY > 800 ? 1 : 0, x: scrollY > 800 ? 0 : -50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <p className="text-center max-w-xs">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Call to Action Section */}
      <section className="py-6 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: scrollY > 1200 ? 1 : 0, y: scrollY > 1200 ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to protect your plants?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: scrollY > 1200 ? 1 : 0, y: scrollY > 1200 ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8"
          >
            Join AgriGuard today and keep your crops healthy!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300"
            onClick={() => navigate('/register')}
         >
            Sign Up Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 AgriGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;