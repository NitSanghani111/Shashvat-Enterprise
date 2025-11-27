import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  MessageSquare, 
  User,
  Send,
  CheckCircle,
  X,
  AlertCircle,
  Building2
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';

// EmailJS Configuration - Same as Contact page
const EMAILJS_SERVICE_ID = 'service_8a861ne';
const EMAILJS_TEMPLATE_ID = 'template_foi4fey';
const EMAILJS_PUBLIC_KEY = 'cSQRLe4Pgy9Kq4H8f';

const BRAND_COLOR = '#c5b173';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    product: '',
    description: '',
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({});

  const prefersReducedMotion = useReducedMotion();

  const contactItems = [
    { 
      icon: <Phone size={24} />, 
      title: "Contact Number", 
      value: "+91 9825049059",
      color: BRAND_COLOR,
      link: "tel:+919825049059"
    },
    { 
      icon: <Mail size={24} />, 
      title: "Email Address", 
      value: "shashvat2019@gmail.com",
      color: BRAND_COLOR,
      link: "mailto:shashvat2019@gmail.com"
    },
    { 
      icon: <FaWhatsapp size={24} />, 
      title: "Business WhatsApp", 
      value: "9099757588",
      color: BRAND_COLOR,
      link: "https://wa.me/919099757588"
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.product.trim()) {
      newErrors.product = 'Product/Service is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Prepare template parameters
    const templateParams = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      description: formData.description,
    };

    console.log('Sending email with params:', templateParams);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success:', result.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setShowModal(true);
      setFormData({
        product: '',
        description: '',
        name: '',
        company: '',
        email: '',
        phone: ''
      });
      setErrors({});
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrorMessage(error?.text || error?.message || 'Unknown error occurred');
      setIsSubmitting(false);
      setSubmitStatus('error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSubmitStatus(null), 300);
  };

  const handleReset = () => {
    setFormData({
      product: '',
      description: '',
      name: '',
      company: '',
      email: '',
      phone: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setShowModal(false);
  };

  // Success/Error Modal Component
  const StatusModal = () => (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {submitStatus === 'success' ? (
              <>
                {/* Success Animation */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We've received your inquiry and will get back to you within 24 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                    >
                      Got it, Thanks!
                    </button>
                  </div>
                </motion.div>

                {/* Confetti-like decoration */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>
              </>
            ) : (
              <>
                {/* Error Animation */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <AlertCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Failed to Send Message
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Something went wrong. Please try again or contact us directly via phone or email.
                  </p>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
                      Error: {errorMessage}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                    >
                      Try Again
                    </button>
                    <a
                      href="tel:+919825049059"
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Us
                    </a>
                  </div>
                </motion.div>

                {/* Decoration */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-200/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-200/30 rounded-full blur-2xl"></div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" 
            style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
          >
            Get in <span style={{ color: BRAND_COLOR }}>Touch</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl hover:border-amber-200 transition-all duration-200"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              Send us a Message
            </h3>
            
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Product/Service Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                  Product / Service Looking For <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="e.g., Brass Fittings, Sanitary Hardware"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                      errors.product 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                    }`}
                  />
                </div>
                {errors.product && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.product}</p>}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                  Describe Your Requirements <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="Please provide details about your requirements..."
                    rows={4}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors resize-none ${
                      errors.description 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                    }`}
                  />
                </div>
                {errors.description && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Name and Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                        errors.name 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                        errors.phone 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                  Company / Enterprise Name
                </label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Name (Optional)"
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors border-gray-200 hover:border-amber-400 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)`,
                    color: 'white',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all text-sm sm:text-base"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : {}}
              whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl hover:border-amber-200 transition-all duration-200"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={!prefersReducedMotion ? { opacity: 0, x: -20 } : {}}
                    whileInView={!prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200"
                      >
                        <div 
                          className="p-3 rounded-full flex-shrink-0 transition-colors duration-200"
                          style={{ backgroundColor: 'rgba(197, 177, 115, 0.1)' }}
                        >
                          <div style={{ color: item.color }}>
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-700 text-sm sm:text-base mb-1">{item.title}</p>
                          <p className="text-gray-600 text-sm sm:text-base break-words group-hover:text-amber-700 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-transparent">
                        <div 
                          className="p-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'rgba(197, 177, 115, 0.1)' }}
                        >
                          <div style={{ color: item.color }}>
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-700 text-sm sm:text-base mb-1">{item.title}</p>
                          <p className="text-gray-600 text-sm sm:text-base break-words">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : {}}
              whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-200"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MapPin size={20} style={{ color: BRAND_COLOR }} />
                  <h4 className="font-semibold text-gray-900">Our Location</h4>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14753.355199898504!2d70.0424243!3d22.4162705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395714caf410c4a7%3A0x68ebc92a77861b0d!2sGIDC%20Phase%20III%2C%20GIDC%20Phase-2%2C%20Dared%2C%20Jamnagar%2C%20Gujarat%20361006!5e0!3m2!1sen!2sin!4v1718983223811!5m2!1sen!2sin"
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Shashvat Location Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      <StatusModal />
    </section>
  );
};

export default ContactInfo;
