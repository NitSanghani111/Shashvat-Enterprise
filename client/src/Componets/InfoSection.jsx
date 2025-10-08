'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaRocket, FaCogs, FaUsers } from 'react-icons/fa'

const infoData = [
  {
    icon: <FaRocket className="text-4xl sm:text-5xl" style={{ color: '#c5b173' }} />, 
    title: 'Our Customer',
    description: 'We focus on customer satisfaction and ensure we cater to their unique needs across the nation with premium service.',
  },
  {
    icon: <FaCogs className="text-4xl sm:text-5xl" style={{ color: '#c5b173' }} />, 
    title: 'Products',
    description: 'Offering quality brass fittings, inserts, and hardware solutions to meet diverse industrial needs across India.',
  },
  {
    icon: <FaUsers className="text-4xl sm:text-5xl" style={{ color: '#c5b173' }} />, 
    title: 'Team & Expertise',
    description: 'Our experienced professionals drive innovation and ensure high-quality production standards in every product.',
  }
]

const InfoCard = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden p-6 sm:p-8 border border-gray-100 h-full"
      initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
        className="mb-6 flex justify-center relative z-10"
        initial={{ scale: 1 }}
        animate={!prefersReducedMotion ? { 
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? [0, -5, 5, -5, 0] : 0
        } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div 
          className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl transition-all duration-300"
          style={{ backgroundColor: 'rgba(197, 177, 115, 0.1)' }}
          aria-hidden="true"
        >
          {icon}
        </div>
      </motion.div>

      {/* Title */}
      <h3 
        className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-gray-900 leading-tight relative z-10"
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
  )
}

const InfoSection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="core-competencies-heading"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
          whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            id="core-competencies-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight tracking-tight"
            style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
          >
            Our Core <span style={{ color: '#c5b173' }}>Competencies</span>
          </h2>
          <div 
            className="w-24 h-1.5 mx-auto rounded-full"
            style={{ backgroundColor: '#c5b173' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {infoData.map((info, index) => (
            <InfoCard key={index} {...info} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoSection
