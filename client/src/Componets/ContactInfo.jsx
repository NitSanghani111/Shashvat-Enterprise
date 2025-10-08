import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  MessageSquare, 
  User,
  Send,
  CheckCircle2
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactInfo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    sendCopy: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const prefersReducedMotion = useReducedMotion();

  const contactItems = [
    { 
      icon: <FileText size={24} />, 
      title: "GST NO", 
      value: "24BGIPS7190F1Z1",
      color: '#c5b173'
    },
    { 
      icon: <Phone size={24} />, 
      title: "Contact Number", 
      value: "+91 9825049059",
      color: '#c5b173',
      link: "tel:+919825049059"
    },
    { 
      icon: <Mail size={24} />, 
      title: "Email Address", 
      value: "shashvat2019@gmail.com",
      color: '#c5b173',
      link: "mailto:shashvat2019@gmail.com"
    },
    { 
      icon: <FaWhatsapp size={24} />, 
      title: "Business WhatsApp", 
      value: "9099757588",
      color: '#c5b173',
      link: "https://wa.me/919099757588"
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log(formData);
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

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
            Get in <span style={{ color: '#c5b173' }}>Touch</span>
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
            {isSubmitted ? (
              <motion.div
                initial={!prefersReducedMotion ? { opacity: 0, scale: 0.9 } : {}}
                animate={!prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-50 rounded-full">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 mb-6">Your message has been sent successfully. We'll get back to you soon.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '', sendCopy: false });
                    setErrors({});
                  }}
                  className="px-6 py-2.5 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-amber-400 hover:bg-amber-50 transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
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
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                        errors.name 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
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
                      placeholder="example@gmail.com"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                        errors.email 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors resize-none ${
                        errors.message 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Send Copy Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sendCopy"
                    checked={formData.sendCopy}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-gray-600 text-sm">Send me a copy of this message</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-semibold transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#c5b173', 
                    borderColor: '#c5b173',
                    color: 'white',
                    fontFamily: "'Inter', 'Roboto', sans-serif"
                  }}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
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
                  <MapPin size={20} style={{ color: '#c5b173' }} />
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
    </section>
  );
};

export default ContactInfo;
