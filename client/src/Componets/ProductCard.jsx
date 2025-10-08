import React, { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BRAND_COLOR = '#c5b173';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  // Dynamic product specifications
  const productSpecs = [
    { label: 'MOQ', value: product.moq, show: !!product.moq },
    { label: 'Size', value: product.size, show: !!product.size },
    { label: 'Material', value: product.material, show: !!product.material },
    { label: 'Weight', value: product.weight, show: !!product.weight }
  ].filter(spec => spec.show);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className="relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-opacity-50"
      style={{ focusRingColor: BRAND_COLOR }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => { 
        e.stopPropagation();
        handleProductClick(product.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProductClick(product.id);
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out transform hover:scale-110"
        />

        {/* Product Name Bar (Initially Visible) */}
        <motion.div
          className="absolute bottom-0 w-full text-white text-center py-3 font-semibold"
          style={{ 
            background: `linear-gradient(to right, ${BRAND_COLOR}, #d4a574, ${BRAND_COLOR})`,
            fontFamily: "'Inter', 'Roboto', sans-serif",
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ 
            opacity: isHovered ? 0 : 1,
            y: isHovered ? '100%' : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {product.name}
        </motion.div>
      </div>

      {/* Hover Overlay with Product Details */}
      <motion.div
        className="absolute inset-0 text-white flex flex-col items-center justify-center p-4 sm:p-6 space-y-3 sm:space-y-4 rounded-xl"
        style={{
          background: `linear-gradient(135deg, rgba(197, 177, 115, 0.95) 0%, rgba(212, 165, 116, 0.95) 50%, rgba(197, 177, 115, 0.95) 100%)`
        }}
        initial={{ opacity: 0, y: '100%' }}
        animate={{ 
          opacity: isHovered ? 0.95 : 0,
          y: isHovered ? 0 : '100%'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Product Name */}
        <motion.h2 
          className="text-lg sm:text-xl font-bold text-center text-white drop-shadow-lg" 
          style={{ 
            fontFamily: "'Inter', 'Roboto', sans-serif",
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {product.name}
        </motion.h2>

        {/* Decorative Divider */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="w-8 h-0.5 rounded-full bg-white drop-shadow-md"></div>
          <div className="w-2 h-2 rounded-full bg-white drop-shadow-md"></div>
          <div className="w-8 h-0.5 rounded-full bg-white drop-shadow-md"></div>
        </motion.div>

        {/* Product Specifications - Dynamic */}
        <motion.ul 
          className="space-y-1.5 sm:space-y-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          {productSpecs.map((spec, index) => (
            <li 
              key={index} 
              className="text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span className="font-semibold capitalize text-white drop-shadow-md">
                {spec.label}:
              </span>
              <span className="text-white/95 drop-shadow-md">
                {spec.value}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* View Details Button */}
        <motion.button
          onClick={(e) => { 
            e.stopPropagation();
            handleProductClick(product.id);
          }}
          className="mt-2 sm:mt-4 px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-gray-900 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-bold hover:scale-105 hover:bg-gray-100 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          aria-label={`View details for ${product.name}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.div>

      {/* Bottom Gradient Accent */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1" 
        style={{ background: `linear-gradient(to right, ${BRAND_COLOR}, #d4a574, ${BRAND_COLOR})` }}
      />

      {/* Top Right Icon */}
      <motion.div
        className="absolute top-3 right-3 rounded-full p-2 shadow-md"
        style={{ backgroundColor: BRAND_COLOR }}
        animate={{ 
          rotate: isHovered ? 90 : 0
        }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <ArrowRight className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;