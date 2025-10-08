import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { comingSoonConfig } from '../config/comingSoonConfig';

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

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
            'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)',
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 150, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(197, 177, 115, 0.15)' }}
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -100, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(197, 177, 115, 0.1)' }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: 'rgba(197, 177, 115, 0.4)',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(197, 177, 115, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197, 177, 115, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Logo/Badge */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            stiffness: 100,
          }}
          className="mb-12 flex justify-center"
        >
          <div className="relative">
            {/* Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(197, 177, 115, 0.2), transparent)',
                filter: 'blur(10px)',
              }}
            />

            {/* Logo Container */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(197, 177, 115, 0.3)',
                  '0 0 60px rgba(197, 177, 115, 0.6)',
                  '0 0 30px rgba(197, 177, 115, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                border: '3px solid rgba(197, 177, 115, 0.5)',
              }}
            >
              <div className="text-center">
                <div
                  className="text-5xl sm:text-6xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #c5b173, #f0d590)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  S
                </div>
                <div className="text-xs font-semibold tracking-widest" style={{ color: '#c5b173' }}>
                  SHASHVAT
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(197, 177, 115, 0.1)',
              border: '1px solid rgba(197, 177, 115, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg className="w-4 h-4" style={{ color: '#c5b173' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </motion.div>
            <span className="text-xs sm:text-sm font-semibold" style={{ color: '#c5b173' }}>
              COMING SOON
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">
            {comingSoonConfig.mainHeading.split(' ').slice(0, 1).join(' ')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c5b173, #f0d590)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {comingSoonConfig.mainHeading.split(' ').slice(1, 2).join(' ')}
            </span>
            <br />
            {comingSoonConfig.mainHeading.split(' ').slice(2).join(' ')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {comingSoonConfig.subHeading}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 mt-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="absolute -inset-1 rounded-2xl blur-xl"
                  style={{ background: 'rgba(197, 177, 115, 0.2)' }}
                />

                {/* Timer Card */}
                <div
                  className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.8), rgba(26, 26, 26, 0.8))',
                    border: '2px solid rgba(197, 177, 115, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                  >
                    <div
                      className="h-full w-1/2"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(197, 177, 115, 0.1), transparent)',
                      }}
                    />
                  </motion.div>

                  {/* Number */}
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #c5b173, #f0d590)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>

                  {/* Label */}
                  <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                    {unit.label}
                  </div>

                  {/* Pulse Indicator */}
                  {unit.label === 'Seconds' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                      className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
                      style={{ backgroundColor: '#c5b173' }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Preview */}
        {comingSoonConfig.showFeaturePreviews && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {comingSoonConfig.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-xl backdrop-blur-sm"
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(197, 177, 115, 0.2)',
              }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        )}

        {/* Notify Me Form */}
        {comingSoonConfig.showEmailForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                style={{
                  background: 'rgba(26, 26, 26, 0.8)',
                  border: '1px solid rgba(197, 177, 115, 0.3)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(197, 177, 115, 0.6)';
                  e.target.style.ringColor = '#c5b173';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(197, 177, 115, 0.3)';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-semibold text-black transition-all duration-300 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #c5b173, #f0d590)',
                  boxShadow: '0 4px 20px rgba(197, 177, 115, 0.3)',
                }}
              >
                Notify Me
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Be the first to know when we launch!
            </p>
          </motion.div>
        )}

        {/* Social Links */}
        {comingSoonConfig.showSocialLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex justify-center gap-6"
          >
            {Object.entries(comingSoonConfig.socialLinks).map(([platform, url], index) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(26, 26, 26, 0.6)',
                  border: '1px solid rgba(197, 177, 115, 0.3)',
                }}
              >
                <svg className="w-5 h-5" style={{ color: '#c5b173' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        {comingSoonConfig.showFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-800"
          >
            <p className="text-sm text-gray-500">
              © 2019-2025 Shashvat Enterprise. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Premium Brass Fittings & Components Manufacturing
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
