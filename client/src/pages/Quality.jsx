import React, { useEffect } from 'react';
import SEO from '../Componets/SEO';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Award, Microscope, Gauge, Wrench, 
  Target, TrendingUp, Shield, CheckCircle
} from 'lucide-react';

// Premium brass color palette
const COLORS = {
  primary: '#C5A76B',
  dark: '#7A6A4F',
  light: '#B19765',
  darkBg: '#F5F3F0',
  text: '#2D2D2D',
  border: '#D4C4B0',
  white: '#FFFFFF',
  lightGray: '#F9F8F6'
};

const Quality = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const machines = [
    {
      name: 'CMM Machine',
      description: 'Coordinate Measuring Machines for precision dimensional analysis with ±0.01mm accuracy',
      image: 'https://bakergauges.com/wp-content/uploads/2016/09/Feat-Zenith-3-584-x-600.jpg',
      icon: Gauge
    },
    {
      name: 'Spectrometer',
      description: 'Advanced material composition analysis and chemical testing',
      image: 'https://m.media-amazon.com/images/I/41APocCa64L._AC_UF1000,1000_QL80_.jpg',
      icon: Microscope
    },
    {
      name: 'Hardness Tester',
      description: 'Material hardness and strength verification',
      image: 'https://www.laboratory.com.ph/wp-content/uploads/2020/05/Hardness-Testers.jpg',
      icon: Target
    },
    {
      name: 'Surface Tester',
      description: 'Surface roughness and finish quality measurement',
      image: 'https://cdn.globalso.com/tmteck-instruments/6502.jpg',
      icon: TrendingUp
    },
    {
      name: 'Thread Gauge',
      description: 'Thread pitch, angle, and profile accuracy verification',
      image: 'https://m.media-amazon.com/images/I/71bXZi3BgdL.jpg',
      icon: Wrench
    },
    {
      name: 'Optical Comparator',
      description: 'High-precision dimensional and profile inspection',
      image: 'https://www.labotronics.com/assets/products/LB-64BIM/LB-64BIM.webp',
      icon: Microscope
    }
  ];
  return (
    <>
      <SEO 
        title="Quality Assurance | Premium Brass Manufacturing"
        description="Experience world-class quality assurance in brass manufacturing. Advanced testing equipment, precision measurements, and industry compliance."
      />

      {/* Hero Section */}
   <motion.section 
  className="relative w-full py-20 md:py-28 bg-cover bg-center"
  style={{
    backgroundImage:
      'url(https://www.shreetulsi.com/wp-content/uploads/2018/01/bigstock-Quality-Improve-93825626.jpg)',
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 container mx-auto px-4 md:px-8">
    <motion.div 
      className="max-w-3xl text-center mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 mb-6">
        <span className="text-xs tracking-wider font-semibold text-gray-200">
          Precision • Testing • Reliability
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
        Premium <span style={{ color: COLORS.primary }}>Quality Assurance</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
        Verified, certified, and trusted quality — engineered for precision and reliability.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <motion.a
          href="/catlog"
          className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-semibold flex items-center gap-3 bg-white text-black"
          whileHover={{ scale: 1.05 }}
          style={{ color: '#000' }}
        >
          Explore Capabilities <ArrowRight size={20} />
        </motion.a>

        <motion.a
          href="/contact"
          className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-semibold border-2 flex items-center gap-3 text-white"
          whileHover={{ scale: 1.05 }}
          style={{ borderColor: COLORS.primary }}
        >
          Request Quote
        </motion.a>
      </div>

    </motion.div>
  </div>
</motion.section>



      {/* Why Quality Matters */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6" style={{ backgroundColor: COLORS.lightGray }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Image */}
            <motion.div 
              className="order-2 md:order-1"
              whileInView={{ scale: 1.02 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://i0.wp.com/www.sterling-group.in/wp-content/uploads/2023/03/dslfjakldsfjl.jpg?fit=980%2C654&ssl=1 " 
                alt="Quality Testing"
                className="rounded-xl shadow-xl w-full"
              />
            </motion.div>

            {/* Content */}
            <motion.div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: COLORS.dark }}>
                Why Quality Matters
              </h2>
              <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
                In brass manufacturing, precision isn't negotiable. Every product that leaves our facility undergoes rigorous testing and verification to ensure it meets the most demanding specifications.
              </p>
              <div className="space-y-4">
                {[
                  'Precision measurement to ±0.01mm tolerance',
                  'Complete material composition verification',
                  'Thread and surface finish analysis',
                  'Full traceability and documentation'
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <div 
                      className="flex-shrink-0 w-6 h-6 rounded-full mt-1 flex items-center justify-center"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-base md:text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testing Machines Gallery */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: COLORS.dark }}>
              Testing Machines & Equipment
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              State-of-the-art equipment ensuring every component meets exact specifications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {machines.map((machine, idx) => {
             
              return (
                <motion.div 
                  key={idx}
                  className="rounded-lg overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.white
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="relative h-cover md:h-56 overflow-hidden">
                    <motion.img 
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-full object-contain bg-white p-4"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                   
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: COLORS.dark }}>
                      {machine.name}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {machine.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Combined Testing Standards & Certifications */}


      {/* Final CTA Section */}
    <motion.section 
  className="relative w-full py-20 md:py-28 px-4 bg-cover bg-center"
  style={{
    backgroundImage: 'url(https://www.fitbrass.com/images/quality.jpg)',
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center">
    
    {/* Brass Highlighted Heading */}
    <motion.h2 
      className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Ready to Experience{' '}
      <span className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, #e6d3a4)`
        }}
      >
        Premium Quality?
      </span>
    </motion.h2>

    {/* Subtext */}
    <motion.p 
      className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      Partner with us for brass components engineered to the highest international standards.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div 
      className="flex flex-col sm:flex-row justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <motion.a
        href="/contact"
        className="px-10 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 text-black"
        style={{ backgroundColor: COLORS.primary }}
        whileHover={{ scale: 1.05, boxShadow: `0 20px 40px rgba(197,167,107,0.3)` }}
        whileTap={{ scale: 0.95 }}
      >
        Request Quote <ArrowRight size={20} />
      </motion.a>

      <motion.a
        href="/contact"
        className="px-10 py-4 rounded-lg font-semibold border-2 text-white"
        style={{ borderColor: COLORS.primary }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us
      </motion.a>
    </motion.div>

  </div>
</motion.section>

    </>
  );
};

export default Quality;
