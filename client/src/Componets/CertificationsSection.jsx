import React from 'react';
import { Award, CheckCircle, Shield, Star, TrendingUp, Globe, BadgeCheck, Sparkles } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management',
      description: 'Certified quality management system ensuring consistent excellence in brass products',
      badge: 'Certified',
      color: '#c5b173'
    },
    {
      icon: BadgeCheck,
      title: 'BIS Certified',
      subtitle: 'Indian Standards',
      description: 'Bureau of Indian Standards certification for quality brass fittings',
      badge: 'Verified',
      color: '#c5b173'
    },
    {
      icon: Award,
      title: 'Quality Tested',
      subtitle: 'Premium Grade',
      description: 'Every product undergoes strict quality control and testing',
      badge: 'Approved',
      color: '#c5b173'
    },
    {
      icon: Globe,
      title: 'Pan-India Supply',
      subtitle: 'All States Coverage',
      description: 'Reliable delivery across Gujarat, Maharashtra, Rajasthan & all Indian states',
      badge: 'Available',
      color: '#c5b173'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(197, 177, 115, 0.3)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(197, 177, 115, 0.2)' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          {/* Background Decorative Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-9xl font-bold" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              QUALITY
            </div>
          </div>
          
          <div className="relative">
            {/* Subtitle Badge */}
            {/* <div className="inline-block mb-6">
              <span 
                className="px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border-2 border-amber-200 bg-amber-50 transition-all duration-300 hover:scale-105"
                style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}
              >
                Trusted Excellence
              </span>
            </div> */}
            
            {/* Main Title */}
            {/* <h2 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent" 
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif", lineHeight: '1.2' }}
            >
              Certifications & Quality Standards
            </h2> */}
            
            {/* <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              Committed to excellence with internationally recognized certifications and rigorous quality assurance processes
            </p> */}
            
            {/* Decorative Line */}
            {/* <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: 'linear-gradient(to right, #c5b173, rgba(197, 177, 115, 0.3))' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: 'linear-gradient(to left, #c5b173, rgba(197, 177, 115, 0.3))' }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
            </div> */}
          </div>
        </div>

        {/* Certifications Grid - Modern Card Design */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-amber-200 transition-all duration-500 hover:shadow-2xl overflow-hidden"
              >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                
                <div className="relative">
                 
                  <div className="absolute -top-4 -right-4">
                    <div className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg" style={{ backgroundColor: '#c5b173' }}>
                      {cert.badge}
                    </div>
                  </div>

                
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <IconComponent className="w-10 h-10" style={{ color: cert.color }} />
                    </div>
                  </div>

                 
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    {cert.subtitle}
                  </div>

                  <h3 
                    className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors" 
                    style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
                  >
                    {cert.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    {cert.description}
                  </p>

                 
                  <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div> */}

     
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Quality Stats */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                  Our Quality Promise
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-6">
                <div className="text-center py-4">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    100%
                  </div>
                  <div className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    Quality Tested
                  </div>
                </div>
                <div className="text-center py-4 sm:border-x border-gray-700">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    500+
                  </div>
                  <div className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    Products Range
                  </div>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    6+
                  </div>
                  <div className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Quality Features */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-2 border-amber-100">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              <Shield className="w-6 h-6 md:w-7 md:h-7" style={{ color: '#c5b173' }} />
              Why Choose Our Products
            </h3>
            <div className="space-y-4 md:space-y-5">
              {[
                { icon: Star, text: 'Premium grade brass with superior finish and durability' },
                { icon: CheckCircle, text: 'Rigorous quality checks at every production stage' },
                { icon: TrendingUp, text: 'Continuous innovation in brass fittings technology' },
                { icon: Globe, text: 'Serving customers across all Indian states' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 md:gap-4 group">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#c5b173' }} />
                    </div>
                    <p className="text-sm md:text-base text-gray-700 font-medium pt-1 md:pt-2" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 border-amber-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0">
                <Award className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#c5b173' }} />
              </div>
              <div>
                <h4 
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2" 
                  style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
                >
                  Trusted by Businesses Across India
                </h4>
                <p className="text-sm md:text-base text-gray-600 font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                  Delivering excellence since 2019 to Gujarat, Maharashtra, Rajasthan & beyond
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap text-sm md:text-base w-full sm:w-auto text-center"
              style={{ backgroundColor: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              Get Certified Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
