'use client'

import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faBuilding, faStore, faArrowRight, faPlay, faPause, faIndustry } from '@fortawesome/free-solid-svg-icons'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const companyData = [
  { 
    icon: faGlobe, 
    title: 'Nature of Business', 
    description: 'Manufacturers, Trader, Supplier',
    color: '#c5b173'
  },
  { 
    icon: faBuilding, 
    title: 'Year of Establishment', 
    description: '2019',
    color: '#3b82f6'
  },
  { 
    icon: faStore, 
    title: 'Market Covered', 
    description: 'India',
    color: '#10b981'
  },
  { 
    icon: faIndustry, 
    title: 'Industries We Serve', 
    description: 'Supplying high-quality brass components to electrical, plumbing, and automotive industries.',
    color: '#8b5cf6'
  },
]

export default function Info() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsVideoPlaying(true)
      } else {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      }
    }
  }

  const handleViewProducts = () => {
    navigate('/products')
  }

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header - Clean & Centered */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
          initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : { opacity: 1 }}
          whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
          >
            Welcome to{' '}
            <span className="text-amber-600">Shashvat</span>
          </h2>

          <p 
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
            style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
          >
            Based in Jamnagar, Gujarat, Shashvat Enterprise has emerged as a trusted name in brass manufacturing and supply across India. Since its inception in 2019, the company has grown rapidly, delivering precision-engineered brass products that meet the highest industry standards.
          </p>
        </motion.div>

        {/* Video Section - Clean & Modern */}
        <motion.div
          className="mb-20 md:mb-24"
          initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1 }}
          whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                src="https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/videos%2Fshasvat-video-homepage.mp4?alt=media&token=2c654d01-8aaa-4856-b9cd-007d474d47e7"
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
                aria-label="Shashvat Enterprise company overview video"
              />
              
              {/* Simple Play/Pause Button */}
              <motion.button
                onClick={toggleVideo}
                className="absolute bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 rounded-full shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
              >
                <FontAwesomeIcon 
                  icon={isVideoPlaying ? faPause : faPlay} 
                  className="w-5 h-5" 
                  style={{ color: '#c5b173' }}
                />
              </motion.button>
            </div>
            
            {/* CTA Button Below Video */}
            <div className="text-center mt-8">
              <motion.button
                onClick={handleViewProducts}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
                whileHover={!prefersReducedMotion ? { y: -2 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
              >
                <span>Explore Our Products</span>
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="w-4 h-4" 
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Company Info Cards - Simple Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {companyData.map((item, index) => (
              <motion.div
                key={index}
                className="group"
                initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : { opacity: 1 }}
                whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div
                  className="relative h-full bg-white rounded-xl p-8 border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
                  style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
                >
                  {/* Simple Icon */}
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-lg mb-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: hoveredCard === index ? `${item.color}15` : '#f9fafb',
                      border: `2px solid ${hoveredCard === index ? item.color + '30' : '#f3f4f6'}`
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-2xl transition-colors duration-300"
                      style={{ color: hoveredCard === index ? item.color : '#9ca3af' }}
                    />
                  </div>

                  {/* Content */}
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {item.title}
                  </h4>
                  <p className="text-lg font-semibold text-gray-900 leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
