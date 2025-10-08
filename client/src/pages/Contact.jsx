import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { 
  MapPin, Phone, Mail, Globe, User, Send, Clock, 
  MessageSquare, CheckCircle, ArrowRight, Building2 
} from 'lucide-react';
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';

const BRAND_COLOR = '#c5b173';

const Contact = () => {
  const [formData, setFormData] = useState({
    product: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { title, description, keywords } = seoData.about;

  const contactInfo = [
    {
      icon: User,
      title: 'Contact Person',
      content: 'Mr. KamleshBhai Sanghani',
      link: null
    },
    {
      icon: MapPin,
      title: 'Our Location',
      content: 'Plot No. 3016, G.I.D.C.-Phase III, Dared, Jamnagar, Gujarat-361004, India',
      link: 'https://maps.google.com/?q=22.4162705,70.0424243'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      content: ['+91 98250 49059', '+91 90997 57588'],
      link: 'tel:+919825049059'
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'shashvat2019@gmail.com',
      link: 'mailto:shashvat2019@gmail.com'
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.shashvatenterprise.com',
      link: 'https://www.shashvatenterprise.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - sunday: 9:00 AM - 6:00 PM  ,Friday Off',
      link: null
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        product: '',
        description: '',
        name: '',
        email: '',
        phone: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      product: '',
      description: '',
      name: '',
      email: '',
      phone: ''
    });
    setSubmitStatus(null);
  };

  return (
    <div className="bg-gray-50">
      <SEO title={title} description={description} keywords={keywords} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
            linear-gradient(150deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
            linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
            linear-gradient(150deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR})`,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
          }}></div>
        </div>
        


        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
              <span className="px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
                Let's Connect
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              Get in Touch
              <span className="block mt-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Have questions about our high-quality brass components, hardware, and sanitary parts? 
              Our expert team is ready to assist you with your requirements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#contact-form"
                className="group px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center gap-3"
              >
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+919825049059"
                className="group px-10 py-4 rounded-xl border-2 border-amber-500/50 text-white font-bold text-lg transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-500 flex items-center gap-3 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: BRAND_COLOR }}>How to Reach Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              Contact <span style={{ color: BRAND_COLOR }}>Information</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${BRAND_COLOR}, rgba(197, 177, 115, 0.3))` }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BRAND_COLOR }}></div>
              <div className="w-24 h-0.5 rounded-full" style={{ background: `linear-gradient(to left, ${BRAND_COLOR}, rgba(197, 177, 115, 0.3))` }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6" style={{ color: BRAND_COLOR }} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  
                  {Array.isArray(info.content) ? (
                    <div className="space-y-1">
                      {info.content.map((item, idx) => (
                        <p key={idx} className="text-gray-600 font-medium">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {info.content}
                    </p>
                  )}
                  
                  {info.link && (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 font-semibold text-sm group-hover:gap-2 transition-all"
                      style={{ color: BRAND_COLOR }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section id="contact-form" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-medium">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product / Service Looking For <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      placeholder="e.g., Brass Fittings, Sanitary Hardware"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2 transition-all hover:border-gray-400"
                      style={{ borderColor: formData.product ? BRAND_COLOR : '' }}
                      onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                      onBlur={(e) => e.target.style.borderColor = ''}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe Your Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your requirements..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2 transition-all hover:border-gray-400 resize-none"
                      style={{ borderColor: formData.description ? BRAND_COLOR : '' }}
                      onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                      onBlur={(e) => e.target.style.borderColor = ''}
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2 transition-all hover:border-gray-400"
                        style={{ borderColor: formData.name ? BRAND_COLOR : '' }}
                        onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                        onBlur={(e) => e.target.style.borderColor = ''}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2 transition-all hover:border-gray-400"
                        style={{ borderColor: formData.phone ? BRAND_COLOR : '' }}
                        onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                        onBlur={(e) => e.target.style.borderColor = ''}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2 transition-all hover:border-gray-400"
                      style={{ borderColor: formData.email ? BRAND_COLOR : '' }}
                      onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                      onBlur={(e) => e.target.style.borderColor = ''}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleReset}
                      className="sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-all hover:scale-105"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Map & Company Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-6"
            >
              {/* Company Highlight */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
                    linear-gradient(150deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR})`,
                    backgroundSize: '40px 70px'
                  }}></div>
                </div>
                
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Shashvat Enterprise</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Trusted manufacturer of premium brass components, hardware, and sanitary parts serving India since 2019.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                      <span>ISO & BIS Certified Quality</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                      <span>Pan-India Delivery Network</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                      <span>50+ Product Varieties</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] group border-2 border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10 pointer-events-none group-hover:from-gray-900/10 transition-all"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14753.355199898504!2d70.0424243!3d22.4162705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395714caf410c4a7%3A0x68ebc92a77861b0d!2sGIDC%20Phase%20III%2C%20GIDC%20Phase-2%2C%20Dared%2C%20Jamnagar%2C%20Gujarat%20361006!5e0!3m2!1sen!2sin!4v1718983223811!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shashvat Enterprise Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJjMC0xLjEtLjktMi0yLTJ6bTAtNGgyYzEuMSAwIDIgLjkgMiAyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0wLTRoMnYyaC0ydi0yem0tNCA0djJoLTJ2LTJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnptMCA0di0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to discuss your requirements and get a customized solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919825049059"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                href="mailto:shashvat2019@gmail.com"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-amber-500/50 text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-500/10 hover:border-amber-500 transition-all"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
