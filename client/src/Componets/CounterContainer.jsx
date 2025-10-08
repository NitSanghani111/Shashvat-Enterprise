import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { FaUsers, FaGlobe, FaBox } from 'react-icons/fa';

const counterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

const Counter = ({ icon, title, value, colorClass, startCounting, description, index }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (startCounting) {
      controls.start('visible');
      const end = parseInt(value, 10);
      const hasPlusSign = value.includes('+');
      const duration = 2000;
      const increment = end / (duration / 16);
      let currentCount = 0;

      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= end) {
          clearInterval(timer);
          setCount(end + (hasPlusSign ? '+' : ''));
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, startCounting, controls]);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 ease-out border border-gray-100"
      variants={counterVariants}
      initial="hidden"
      animate={controls}
      whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="article"
      aria-label={`${title}: ${count}`}
    >
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(197, 177, 115, 0.05) 0%, rgba(197, 177, 115, 0.15) 100%)'
        }}
      />

      <div className="relative p-6 sm:p-8 text-center">
        {/* Icon Container */}
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 flex items-center justify-center rounded-2xl transition-all duration-300"
          style={{ backgroundColor: 'rgba(197, 177, 115, 0.1)' }}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          whileHover={!prefersReducedMotion ? { 
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1 
          } : {}}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="text-4xl sm:text-5xl" style={{ color: '#c5b173' }}>
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 
          className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 leading-tight"
          style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
        >
          {title}
        </h3>

        {/* Counter Value */}
        <motion.span 
          className="text-4xl sm:text-5xl font-bold block"
          style={{ 
            color: '#c5b173',
            fontFamily: "'Inter', 'Roboto', sans-serif"
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
        >
          {count}
        </motion.span>

        {/* Description on mobile */}
        <p 
          className="mt-4 text-base text-gray-600 leading-relaxed sm:hidden"
          style={{ 
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            fontWeight: '400'
          }}
        >
          {description}
        </p>
      </div>

      {/* Hover Overlay Description (desktop only) */}
      <motion.div 
        className="hidden sm:flex absolute inset-0 bg-white/95 backdrop-blur-sm items-center justify-center p-6 sm:p-8 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <p 
          className="text-base sm:text-lg text-gray-700 text-center leading-relaxed max-w-xs"
          style={{ 
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontSize: '1rem',
            lineHeight: '1.65',
            fontWeight: '400',
            letterSpacing: '0.01em'
          }}
        >
          {description}
        </p>
      </motion.div>

      {/* Bottom Accent Line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: '#c5b173' }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

const CounterContainer = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const counters = [
    { 
      icon: <FaUsers />, 
      title: 'Happy Clients', 
      value: '250+', 
      description: 'We have more than 250 satisfied clients across various industries.' 
    },
    { 
      icon: <FaGlobe />, 
      title: 'Different State Clients', 
      value: '10+', 
      description: 'Our products are trusted and used in more than 10 different states.' 
    },
    { 
      icon: <FaBox />, 
      title: 'Products Available', 
      value: '50+', 
      description: 'We manufacture and supply over 50 high-quality brass products to meet diverse needs.' 
    },
  ];

  const [startCounting, setStartCounting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 overflow-hidden" 
      ref={containerRef}
      aria-labelledby="achievements-heading"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
          whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 
            id="achievements-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight tracking-tight"
            style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
          >
            Our Key <span style={{ color: '#c5b173' }}>Achievements</span>
          </h2>
          <div 
            className="w-24 h-1.5 mx-auto rounded-full"
            style={{ backgroundColor: '#c5b173' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {counters.map((counter, index) => (
            <Counter
              key={index}
              icon={counter.icon}
              title={counter.title}
              value={counter.value}
              startCounting={startCounting}
              description={counter.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterContainer;
