import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { comingSoonConfig } from '../config/comingSoonConfig';
import shashvatLogo from '../img/image.png';

const ComingSoon = () => {
  // Set target date based on config
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + comingSoonConfig.countdownDays);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  // Mouse tracking for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#0f0f0f]">
      {/* Clean Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 70%)',
        }}
      />

      {/* Subtle Ambient Glow - Centered behind logo */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, rgba(197, 177, 115, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        
        {/* Logo Section - Clean & Premium */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 flex justify-center"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
          <motion.div
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer"
          >
            {/* Logo Glow Ring */}
            <motion.div
              animate={{
                opacity: isHoveringLogo ? 0.6 : 0.3,
                scale: isHoveringLogo ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(197, 177, 115, 0.2) 0%, transparent 70%)',
              }}
            />
            
            {/* Rotating Border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(197, 177, 115, 0.4), transparent, rgba(197, 177, 115, 0.2), transparent)',
              }}
            />

            {/* Logo Container - Clean white/cream background for visibility */}
            <motion.div
              animate={{
                boxShadow: isHoveringLogo 
                  ? '0 0 60px rgba(197, 177, 115, 0.4), 0 20px 60px rgba(0,0,0,0.4)'
                  : '0 0 40px rgba(197, 177, 115, 0.2), 0 10px 40px rgba(0,0,0,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #fefefe 0%, #f5f0e6 50%, #ebe5d6 100%)',
                border: '2px solid rgba(197, 177, 115, 0.6)',
              }}
            >
              <img 
                src={shashvatLogo} 
                alt="Shashvat Enterprise" 
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-sm"
                style={{ filter: 'contrast(1.05)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-widest"
            style={{
              background: 'linear-gradient(135deg, rgba(197, 177, 115, 0.15) 0%, rgba(197, 177, 115, 0.05) 100%)',
              border: '1px solid rgba(197, 177, 115, 0.3)',
              color: '#c5b173',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#c5b173]"
            />
            COMING SOON
          </motion.span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-white leading-tight tracking-tight">
            {comingSoonConfig.mainHeading.split(' ').slice(0, 1).join(' ')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c5b173 0%, #e8d5a3 50%, #c5b173 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {comingSoonConfig.mainHeading.split(' ').slice(1, 2).join(' ')}
            </span>
            <br />
            <span className="text-gray-300">
              {comingSoonConfig.mainHeading.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed font-light">
            {comingSoonConfig.subHeading}
          </p>
        </motion.div>

        {/* Countdown Timer - Minimalist Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex justify-center gap-3 sm:gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative group"
              >
                {/* Timer Card */}
                <div
                  className="relative px-4 py-5 sm:px-8 sm:py-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)',
                    border: '1px solid rgba(197, 177, 115, 0.2)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Number */}
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-1 tabular-nums"
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #c5b173 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>

                  {/* Label */}
                  <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {unit.label}
                  </div>

                  {/* Live Indicator for Seconds */}
                  {unit.label === 'Seconds' && (
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: '#c5b173',
                        boxShadow: '0 0 10px rgba(197, 177, 115, 0.6)',
                      }}
                    />
                  )}
                </div>

                {/* Separator */}
                {index < timeUnits.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-3 text-2xl sm:text-3xl text-gray-600 font-light hidden sm:block">
                    :
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        {comingSoonConfig.showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="pt-8 border-t border-gray-800/50"
          >
            <p className="text-sm text-gray-500">
              © 2019-2025 Shashvat Enterprise. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Premium Brass Fittings & Components Manufacturing
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
