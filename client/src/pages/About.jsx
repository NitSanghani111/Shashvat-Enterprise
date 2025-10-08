import React, { useEffect, useState, useRef } from 'react';
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  Award, Shield, Users, Heart, Lightbulb, Leaf, CheckCircle, Target,
  Factory, Sparkles, TrendingUp, Globe2, Zap, Star, Package, 
  Gauge, Clock, Headphones, MapPin, Phone, Mail, ArrowRight, 
  Eye, Rocket, Handshake, Building2, Truck, Settings, BarChart3
} from 'lucide-react';
import PopularProduct from '../Componets/PopularProduct';
import CounterContainer from '../Componets/CounterContainer';

const About = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const whyUsRef = useRef(null);
  
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isWhyUsInView = useInView(whyUsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { title, description, keywords } = seoData.about;

  // Infrastructure Stats - Single Brand Color
  const stats = [
    { icon: Building2, number: '10,000+', label: 'Sq. Ft. Infrastructure' },
    { icon: Users, number: '50+', label: 'Skilled Professionals' },
    { icon: Globe2, number: 'Pan India', label: 'Market Presence' },
    { icon: Package, number: '50+', label: 'Product Range' }
  ];

  // Why Choose Us - Inspired by Akshar Brass
  const whyChooseUs = [
    { icon: CheckCircle, title: 'Quality Certified', description: 'ISO 9001:2015 & BIS certified manufacturing' },
    { icon: Factory, title: 'Modern Manufacturing', description: 'Advanced machinery and production facility' },
    { icon: Users, title: 'Experienced Team', description: 'Skilled professionals with industry expertise' },
    { icon: Globe2, title: 'Pan-India Presence', description: 'Serving customers across all Indian states' },
    { icon: Settings, title: 'Custom Solutions', description: 'Tailored brass products for your needs' },
    { icon: Award, title: 'Quality Assurance', description: '100% inspection & testing of all products' },
    { icon: BarChart3, title: 'Competitive Pricing', description: 'Best value with wholesale rates available' }
  ];

  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />

      {/* Hero Section - Clean & Professional */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(30deg, #c5b173 12%, transparent 12.5%, transparent 87%, #c5b173 87.5%, #c5b173),
            linear-gradient(150deg, #c5b173 12%, transparent 12.5%, transparent 87%, #c5b173 87.5%, #c5b173),
            linear-gradient(30deg, #c5b173 12%, transparent 12.5%, transparent 87%, #c5b173 87.5%, #c5b173),
            linear-gradient(150deg, #c5b173 12%, transparent 12.5%, transparent 87%, #c5b173 87.5%, #c5b173)`,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
              <span className="px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
                Established 2019 • Jamnagar, Gujarat
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
            </motion.div>

            {/* Main Headline - Inspired by Shivom */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              Pioneer In Manufacturing
              <span className="block mt-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                Precision Brass Components
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Trusted manufacturer of precision machined components in <span className="font-semibold text-white">brass, copper, and allied materials</span> for electrical, electronics, automobile, and diverse industries across India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/products">
                <button className="group px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="group px-10 py-4 rounded-xl border-2 border-amber-500/50 text-white font-bold text-lg transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-500 flex items-center gap-3 backdrop-blur-sm">
                  <Mail className="w-5 h-5" />
                  Request Quote
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Company Overview - Clean Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Left - Content */}
              <div>
                <div className="inline-block px-6 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#c5b173' }}>About Shashvat Enterprise</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                  Engineered For <span style={{ color: '#c5b173' }}>Reliability</span>
                </h2>

                <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
                  <p>
                    We are <span className="font-semibold text-gray-900">Jamnagar (Gujarat)</span> based manufacturers of <span className="font-semibold" style={{ color: '#c5b173' }}>precision brass & copper components</span> as per customer requirements and specifications.
                  </p>
                  <p>
                    Supplying <span className="font-semibold">all over India</span>, our components are technologically advanced with high-level performance that has earned them recognition in the industry.
                  </p>
                  <p>
                    Our manufacturing facility features advanced CNC and automatic machines. Through continuous investment in technology and skilled workforce, we deliver <span className="font-semibold text-gray-900">high-quality brass products within specified timelines</span>.
                  </p>
                </div>

                {/* Quick Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Truck, text: 'Timely Delivery' },
                    { icon: Shield, text: 'Quality Assured' },
                    { icon: Settings, text: 'Customization' },
                    { icon: Headphones, text: '24/7 Support' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <Icon className="w-5 h-5 flex-shrink-0" style={{ color: '#c5b173' }} />
                        <span className="font-semibold text-gray-800 text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://res.cloudinary.com/dhv8cuh62/image/upload/v1759905091/138509_phtjet.jpg" 
                    alt="Manufacturing Facility" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-2 border-amber-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-600">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900">6+</div>
                      <div className="text-sm font-semibold text-gray-600">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Stats - Modern Professional Design */}
    
      {/* Mission & Values - Inspired by Akshar/Shivom */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-3xl shadow-lg border border-blue-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-6 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To manufacture <span className="font-semibold">quality products at competitive cost</span> through technology & teamwork and build <span className="font-semibold">strong relationships</span> with suppliers and customers.
                </p>
                <ul className="space-y-3">
                  {['Customer Satisfaction', 'Innovation', 'Long-term Relations', 'Sustainable Success'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-amber-50 to-white p-10 rounded-3xl shadow-lg border border-amber-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Values</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our core values guide every decision and action we take:
                </p>
                <ul className="space-y-3">
                  {[
                    'Dependability',
                    'Flexibility',
                    'Fairness & Tolerance',
                    'Teamwork',
                    'Social Responsibility',
                    'Environmental Dedication'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#c5b173' }}></div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - 7 Reasons Grid */}
      <section ref={whyUsRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isWhyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-block px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-400">Why Choose Us?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Why <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Shashvat Enterprise</span>
              </h2>
              <p className="text-xl text-gray-400">Some factors that make us the preferred choice</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isWhyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="w-10 h-10 mb-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quality Commitment Banner */}
          
          </div>
        </div>
      </section>
 <CounterContainer/>
      {/* Popular Products */}
      <PopularProduct />
    </>
  );
};

export default About;
