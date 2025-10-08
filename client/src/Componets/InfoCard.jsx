import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const InfoCard = ({ icon, title, description }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div 
      className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border border-gray-100 h-full flex flex-col overflow-hidden"
      whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : { opacity: 1 }}
      whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="article"
      aria-label={`${title}: ${description}`}
    >
      {/* Gradient Background on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(197, 177, 115, 0.03) 0%, rgba(197, 177, 115, 0.08) 100%)'
        }}
      />

      {/* Icon Container */}
      <motion.div 
        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 flex items-center justify-center rounded-2xl text-4xl sm:text-5xl relative z-10 transition-all duration-300"
        style={{ 
          backgroundColor: 'rgba(197, 177, 115, 0.1)',
          color: '#c5b173'
        }}
        whileHover={!prefersReducedMotion ? { 
          rotate: [0, -10, 10, -10, 0],
          scale: 1.1
        } : {}}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 
        className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-gray-900 leading-tight relative z-10 transition-colors duration-300 group-hover:text-gray-800"
        style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p 
        className="text-sm sm:text-base text-gray-600 text-center leading-relaxed relative z-10 flex-grow"
        style={{ 
          fontFamily: "'Inter', 'Roboto', sans-serif",
          lineHeight: '1.7'
        }}
      >
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: '#c5b173' }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default InfoCard;
