import React, { useState, useEffect } from 'react';
import { Factory, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const IndustriesServed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const industries = [
     {
      title: 'AGRICULTURE',
      subtitle: 'Farming Equipment',
      description: 'Robust brass parts for agricultural machinery, irrigation systems, and farming equipment',
      image: 'https://th.bing.com/th/id/R.d37c0faebca8257dda7aa5863bee21e8?rik=haQw5%2bWJyYAu%2fA&riu=http%3a%2f%2fwww.theneweconomy.com%2fwp-content%2fuploads%2f2015%2f07%2fFarmlink-1.jpg&ehk=W6z0W1CBtBf7jDFP05dOs4KKDhOIWDQn5wrG%2bgjaAOs%3d&risl=&pid=ImgRaw&r=0',
      products: ['Irrigation Fittings', 'Sprinkler Parts', 'Pump Components', 'Farm Equipment Parts']
    },
    {
      title: 'ELECTRONICS',
      subtitle: 'Precision Components',
      description: 'High-quality brass terminals, connectors, and electrical components for electronic devices and systems',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      products: ['Electrical Terminals', 'Brass Connectors', 'Switch Parts', 'Cable Glands']
    },  
    {
      title: 'CONSTRUCTION',
      subtitle: 'Building Solutions',
      description: 'Durable brass hardware and architectural fittings for modern construction and infrastructure projects',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      products: ['Door Hardware', 'Window Fittings', 'Brass Hinges', 'Architectural Parts']
    },
    {
      title: 'AUTO INDUSTRY',
      subtitle: 'Automotive Excellence',
      description: 'Precision-engineered brass parts for automotive applications, ensuring reliability and performance',
      image: 'https://res.cloudinary.com/dhv8cuh62/image/upload/v1759920189/shutterstock_605472758-1200x799_cflqu5.png',
      products: ['Engine Components', 'Fuel System Parts', 'Brake Fittings', 'Custom Auto Parts']
    },
    {
      title: 'PNEUMATIC',
      subtitle: 'Air Systems',
      description: 'Premium brass fittings and components for pneumatic systems and compressed air applications',
      image: 'https://res.cloudinary.com/dhv8cuh62/image/upload/v1759920353/r-optisort-w-05_757_583_f5rt2z.jpg',
      products: ['Air Fittings', 'Quick Couplers', 'Pneumatic Valves', 'Compression Fittings']
    },
    {
      title: 'OIL & GAS',
      subtitle: 'Energy Sector',
      description: 'Heavy-duty brass components designed for demanding oil, gas, and petrochemical applications',
      image: 'https://res.cloudinary.com/dhv8cuh62/image/upload/v1759919301/offshore_platform_qcnlak.jpg',
      products: ['Pressure Fittings', 'Industrial Valves', 'Safety Components', 'Specialized Parts']
    },
    {
      title: 'ELECTRICAL',
      subtitle: 'Power Solutions',
      description: 'High-conductivity brass components for electrical power distribution and transmission systems',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      products: ['Earthing Parts', 'Switchgear Components', 'Power Terminals', 'Cable Accessories']
    },
   
    {
      title: 'PLUMBING',
      subtitle: 'Sanitary Solutions',
      description: 'Premium brass fittings, valves, and sanitary components for residential and commercial plumbing',
      image: 'https://res.cloudinary.com/dhv8cuh62/image/upload/v1759920722/plumbing-493595376-2_h5d9v2.jpg',
      products: ['Angel Cocks', 'Brass Valves', 'Faucet Parts', 'Sanitary Fittings']
    }
  ];

  const updateSlidesToShow = () => {
    if (window.innerWidth <= 640) {
      setSlidesToShow(1);
    } else if (window.innerWidth <= 1024) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, industries.length - slidesToShow) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= industries.length - slidesToShow ? 0 : prev + 1
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header - Modern & Clean */}
        <div className="text-center mb-16 relative">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-9xl font-bold" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              INDUSTRIES
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative">
            {/* Subtitle Badge */}
            <div className="inline-block mb-6">
              <span 
                className="px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border-2 border-amber-200 bg-amber-50 transition-all duration-300 hover:scale-105"
                style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}
              >
                Our Expertise
              </span>
            </div>
            
            {/* Main Title */}
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent" 
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif", lineHeight: '1.2' }}
            >
              Industries We Serve
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              Every Industry Requires A Custom Solution. We Serve Businesses Across A Wide Range Of Industries With Precision-Engineered Brass Components.
            </p>
            
            {/* Decorative Line with Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: 'linear-gradient(to right, #c5b173, rgba(197, 177, 115, 0.3))' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: 'linear-gradient(to left, #c5b173, rgba(197, 177, 115, 0.3))' }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-amber-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-amber-50 -ml-6"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#c5b173' }} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-amber-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-amber-50 -mr-6"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#c5b173' }} />
          </button>

          {/* Carousel Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group"
                  style={{ width: `calc(${100 / slidesToShow}% - ${(slidesToShow - 1) * 24 / slidesToShow}px)` }}
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-amber-200">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90"></div>
                      {/* Amber Accent Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-8">
                      {/* Title Section */}
                      <div className="mb-4">
                        <div className="inline-block px-4 py-1 rounded-full mb-3 border-2 border-amber-200" style={{ backgroundColor: 'rgba(197, 177, 115, 0.2)', backdropFilter: 'blur(10px)' }}>
                          <span className="text-sm font-semibold tracking-wide" style={{ color: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                            {industry.subtitle}
                          </span>
                        </div>
                        <h3 
                          className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors duration-300" 
                          style={{ fontFamily: "'Inter', 'Roboto', sans-serif", letterSpacing: '0.05em' }}
                        >
                          {industry.title}
                        </h3>
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                          {industry.description}
                        </p>
                      </div>

                      {/* Products - Visible on Hover */}
                      <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-out">
                        <div className="pt-4 border-t border-amber-200/30">
                          <div className="grid grid-cols-2 gap-2">
                            {industry.products.map((product, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#c5b173' }}></div>
                                <span className="text-xs text-gray-200 font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                                  {product}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Learn More Link */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <a
                          href="/products"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-900 transition-all duration-300 hover:gap-3"
                          style={{ backgroundColor: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Index Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(industries.length - slidesToShow + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-12' : 'w-2'
                }`}
                style={{ 
                  backgroundColor: currentIndex === index ? '#c5b173' : '#d1d5db'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="mt-20 relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: '#c5b173' }}></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#c5b173' }}></div>
          </div>
          
          <div className="relative p-12 md:p-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 
                className="text-3xl md:text-4xl font-bold text-white mb-6" 
                style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
              >
                Don't See Your Industry? Let's Create A Custom Solution!
              </h3>
              <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                We specialize in precision brass manufacturing for diverse applications. Our expert team is ready to discuss your specific requirements and deliver tailored solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-5 rounded-xl font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
                  style={{ 
                    backgroundColor: '#c5b173',
                    fontFamily: "'Inter', 'Roboto', sans-serif"
                  }}
                >
                  Get Custom Quote
                </a>
                <a
                  href="/products"
                  className="px-10 py-5 bg-transparent border-3 rounded-xl font-bold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg"
                  style={{ borderWidth: '3px', borderColor: '#c5b173', fontFamily: "'Inter', 'Roboto', sans-serif" }}
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default IndustriesServed;
