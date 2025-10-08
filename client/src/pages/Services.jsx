import React, { useEffect, useRef } from 'react';
import SEO from '../Componets/SEO';
import { motion, useInView } from 'framer-motion';
import { 
  Settings, Package, Shield, Truck, Headphones, FileText,
  CheckCircle, Cog, Wrench, Sparkles, Factory, Target,
  Zap, Award, TrendingUp, Users, Clock, Globe2,
  ArrowRight, Gauge, Hammer, Box, TestTube, Layers,
  GitBranch, BarChart3, ThumbsUp, Phone, Mail, Send
} from 'lucide-react';
import IndustriesServed from '../Componets/IndustriesServed';

const BRAND_COLOR = '#c5b173';

const Services = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const industriesRef = useRef(null);

  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const isCapabilitiesInView = useInView(capabilitiesRef, { once: true, amount: 0.2 });
  const isIndustriesInView = useInView(industriesRef, { once: true, amount: 0.2 });

  // Core Services
  const coreServices = [
    {
      icon: Settings,
      title: 'Custom Manufacturing',
      description: 'Tailored brass components designed and manufactured to your exact specifications and requirements.',
      features: ['Custom Designs', 'Prototype Development', 'Technical Support']
    },
    {
      icon: Package,
      title: 'Bulk Production',
      description: 'High-volume manufacturing capabilities with consistent quality across large production runs.',
      features: ['Mass Production', 'Quality Consistency', 'Cost Effective']
    },
    {
      icon: FileText,
      title: 'Design Consultation',
      description: 'Expert technical guidance to optimize your product designs for manufacturability and performance.',
      features: ['CAD Support', 'Material Selection', 'Process Optimization']
    },
    {
      icon: Shield,
      title: 'Quality Testing',
      description: '100% inspection and testing of all products to ensure they meet BIS and ISO quality standards.',
      features: ['Dimensional Testing', 'Material Analysis', 'Performance Testing']
    },
    {
      icon: Box,
      title: 'Custom Packaging',
      description: 'Professional packaging solutions tailored to protect your products during transit and storage.',
      features: ['Custom Boxes', 'Bulk Packaging', 'Secure Packaging']
    },
    {
      icon: Truck,
      title: 'Timely Delivery',
      description: 'Reliable logistics network ensuring on-time delivery across Gujarat, Maharashtra, Rajasthan & all Indian states.',
      features: ['Pan-India Delivery', 'Fast Shipping', 'Order Tracking']
    }
  ];

  // Manufacturing Process Steps
  const manufacturingProcess = [
    {
      step: '01',
      icon: Layers,
      title: 'Raw Material Selection',
      description: 'Premium quality brass rods sourced from certified suppliers, inspected for composition and quality standards.',
      highlights: ['Material Certification', 'Quality Inspection', 'Composition Testing']
    },
    {
      step: '02',
      icon: Cog,
      title: 'Precision Machining',
      description: 'Advanced CNC machines and precision lathes transform raw materials into accurate components.',
      highlights: ['CNC Machining', 'Precision Turning', 'Hot Forging']
    },
    {
      step: '03',
      icon: GitBranch,
      title: 'Threading & Finishing',
      description: 'Specialized threading operations and surface finishing to achieve perfect fit and smooth finish.',
      highlights: ['Internal Threading', 'External Threading', 'Knurling']
    },
    {
      step: '04',
      icon: TestTube,
      title: 'Quality Control',
      description: 'Rigorous quality checks at every stage using advanced testing equipment and skilled inspectors.',
      highlights: ['Dimensional Check', 'Thread Testing', 'Visual Inspection']
    },
    {
      step: '05',
      icon: Sparkles,
      title: 'Surface Treatment',
      description: 'Premium electroplating and finishing processes for enhanced durability and aesthetic appeal.',
      highlights: ['Nickel Plating', 'Chrome Plating', 'Powder Coating']
    },
    {
      step: '06',
      icon: Package,
      title: 'Packaging & Dispatch',
      description: 'Careful packaging with proper labeling and documentation before timely dispatch to customers.',
      highlights: ['Quality Packaging', 'Proper Labeling', 'Fast Dispatch']
    }
  ];

  // Manufacturing Capabilities
  const capabilities = [
    { icon: Cog, title: 'CNC Machining', description: 'High-precision computer-controlled machining' },
    { icon: Hammer, title: 'Hot Forging', description: 'Heavy-duty forging for complex shapes' },
    { icon: Wrench, title: 'Precision Turning', description: 'Accurate turning operations' },
    { icon: GitBranch, title: 'Threading', description: 'Internal & external thread cutting' },
    { icon: Gauge, title: 'Knurling', description: 'Textured surface patterns' },
    { icon: Sparkles, title: 'Surface Finishing', description: 'Electroplating & coating services' },
    { icon: TestTube, title: 'Quality Testing', description: 'Advanced testing equipment' },
    { icon: Box, title: 'Custom Packaging', description: 'Tailored packaging solutions' }
  ];

  // Industries Served
  const industries = [
    { icon: Factory, name: 'Sanitary & Plumbing', desc: 'Faucets, valves, fittings' },
    { icon: Wrench, name: 'Hardware & Fittings', desc: 'Door handles, hinges, locks' },
    { icon: Zap, name: 'Electrical Components', desc: 'Terminals, connectors, contacts' },
    { icon: Settings, name: 'Automotive Parts', desc: 'Fasteners, fittings, bushings' },
    { icon: Factory, name: 'Industrial Equipment', desc: 'Couplings, adapters, flanges' },
    { icon: Globe2, name: 'Pan-India Supply', desc: 'Serving all Indian states' }
  ];

  // Quality Standards
  const qualityStandards = [
    { icon: Award, title: 'ISO & BIS Certified', desc: 'Indian & international standards' },
    { icon: Shield, title: '100% Inspection', desc: 'Every product tested' },
    { icon: TestTube, title: 'Material Testing', desc: 'Certified raw materials' },
    { icon: CheckCircle, title: 'Quality Assurance', desc: 'Zero defect policy' }
  ];

  return (
    <>
      <SEO 
        title="Services - Shashvat Enterprise" 
        description="Professional brass manufacturing services including custom production, bulk orders, quality testing, and timely delivery across India." 
        keywords="brass manufacturing services, custom brass components, bulk production, quality testing, brass machining" 
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden" style={{ background: `linear-gradient(135deg, #8b7355 0%, ${BRAND_COLOR} 50%, #8b7355 100%)` }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff),
              linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff)`,
              backgroundSize: '80px 140px',
              backgroundPosition: '0 0, 40px 70px'
            }}></div>
          </div>

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              >
                <Factory className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">MANUFACTURING EXCELLENCE</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-lg" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Premium Brass Manufacturing
                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl">Services & Solutions</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                From concept to delivery, we provide end-to-end brass component manufacturing services with precision, quality, and reliability.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#manufacturing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                >
                  Our Process
                  <Factory className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
            </svg>
          </div>
        </section>

        {/* Core Services Section */}
        <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-bold uppercase tracking-wider mb-3 inline-block" style={{ color: BRAND_COLOR }}>
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Our Core Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Comprehensive brass manufacturing solutions tailored to meet your specific requirements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white transform group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                  >
                    <service.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section id="manufacturing" ref={processRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-bold uppercase tracking-wider mb-3 inline-block" style={{ color: BRAND_COLOR }}>
                How We Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Our Manufacturing Process
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                A systematic 6-step process ensuring precision, quality, and consistency in every product we manufacture
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {manufacturingProcess.map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex flex-col lg:flex-row gap-8 mb-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 lg:w-64">
                    <div className="relative">
                      <div
                        className="w-32 h-32 rounded-3xl flex items-center justify-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                      >
                        <process.icon className="w-16 h-16" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-black shadow-lg">
                        {process.step}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{process.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">{process.description}</p>

                    <div className="flex flex-wrap gap-3">
                      {process.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md"
                          style={{ backgroundColor: BRAND_COLOR }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Flow Visualization */}
            <div className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Complete Process Timeline</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {manufacturingProcess.map((process, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
                        style={{ backgroundColor: BRAND_COLOR }}
                      >
                        <process.icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-semibold">{process.title.split(' ')[0]}</span>
                    </div>
                    {index < manufacturingProcess.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section ref={capabilitiesRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-bold uppercase tracking-wider mb-3 inline-block" style={{ color: BRAND_COLOR }}>
                Advanced Technology
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Manufacturing Capabilities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Advanced equipment and skilled workforce for precision brass manufacturing
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isCapabilitiesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: BRAND_COLOR }}
                  >
                    <capability.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{capability.title}</h3>
                  <p className="text-sm text-gray-600">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">Quality Standards</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Committed to delivering excellence through rigorous quality control
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {qualityStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                  >
                    <standard.icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{standard.title}</h3>
                  <p className="text-sm text-gray-600">{standard.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
      <IndustriesServed/>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR})`,
              backgroundSize: '80px 140px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Get in touch with our team for custom manufacturing solutions, bulk orders, or technical consultation.
                </p>

                <div className="flex flex-wrap gap-6 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 rounded-full font-bold text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg"
                    style={{ backgroundColor: BRAND_COLOR }}
                  >
                    <Send className="w-6 h-6" />
                    Request Quote
                  </motion.a>

                  <motion.a
                    href="tel:+919924103036"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-transparent border-2 border-white rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-3 text-lg"
                  >
                    <Phone className="w-6 h-6" />
                    Call Us Now
                  </motion.a>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-300">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                      <span>+91 98250 49059</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                      <span>shashvat2019@gmail.com</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
