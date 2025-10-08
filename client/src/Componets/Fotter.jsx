import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Globe, Facebook, Twitter, 
  Instagram, Linkedin, ArrowRight, Heart, Code,
  Award, Shield, Truck, Headphones
} from 'lucide-react';
import logo from '../img/image.png';

const BRAND_COLOR = '#c5b173';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' }
  ];

  const productCategories = [
    { name: 'Brass Components', path: '/products' },
    { name: 'Sanitary Parts', path: '/products' },
    { name: 'Hardware Parts', path: '/products' },
    { name: 'Custom Solutions', path: '/products' }
  ];

  const features = [
    { icon: Award, text: 'Quality Assured' },
    { icon: Shield, text: 'ISO Certified' },
    { icon: Truck, text: 'Fast Delivery' },
    { icon: Headphones, text: '24/7 Support' }
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      text: '+91 98250 49059',
      link: 'tel:+919825049059'
    },
    { 
      icon: Mail, 
      text: 'shashvat2019@gmail.com',
      link: 'mailto:shashvat2019@gmail.com'
    },
    { 
      icon: MapPin, 
      text: 'Jamnagar, Gujarat, India'
    }
  ];

  const socialLinks = [
    { icon: Facebook, link: '#', name: 'Facebook' },
    { icon: Twitter, link: '#', name: 'Twitter' },
    { icon: Instagram, link: '#', name: 'Instagram' },
    { icon: Linkedin, link: '#', name: 'LinkedIn' }
  ];

  const developers = [
    { name: 'Nit Sanghani', link: 'https://nitportfolio.pages.dev/' },
    { name: 'Kishan Vyas', link: 'https://kishanvyas.tech/' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
          linear-gradient(150deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR})`,
          backgroundSize: '40px 70px',
          backgroundPosition: '0 0, 20px 35px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section with Features */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6 group">
                <img
                  src={logo}
                  alt="Shashvat Enterprise"
                  className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Shashvat Enterprise
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Trusted manufacturer of precision brass components, hardware, and sanitary parts serving customers across India with quality and excellence.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <info.icon className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-600">{info.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-6 relative inline-block" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${BRAND_COLOR}, rgba(197, 177, 115, 0.3))` }}></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-2" style={{ backgroundColor: BRAND_COLOR }}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLOR }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-6 relative inline-block" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Our Products
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${BRAND_COLOR}, rgba(197, 177, 115, 0.3))` }}></div>
              </h3>
              <ul className="space-y-3">
                {productCategories.map((product, index) => (
                  <li key={index}>
                    <Link
                      to={product.path}
                      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-2" style={{ backgroundColor: BRAND_COLOR }}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{product.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLOR }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-6 relative inline-block" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Connect With Us
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${BRAND_COLOR}, rgba(197, 177, 115, 0.3))` }}></div>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Stay updated with our latest products and offers.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 hover:border-amber-200 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </a>
                ))}
              </div>

              {/* Quality Badge */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                  <span className="font-bold text-sm">Quality Guaranteed</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  ISO 9001:2015 & BIS certified manufacturing with rigorous quality control
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                  © 2025 Shashvat Enterprise. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Powered by <span className="font-semibold" style={{ color: BRAND_COLOR }}>KamleshBhai Sanghani</span>
                </p>
              </div>

              {/* Developer Credits */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                  <Code className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                  <span className="text-gray-600">Crafted with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-gray-600">by</span>
                  <div className="flex items-center gap-2">
                    {developers.map((dev, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <span className="text-gray-400">•</span>}
                        <a
                          href={dev.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline transition-colors"
                          style={{ color: BRAND_COLOR }}
                        >
                          {dev.name}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
