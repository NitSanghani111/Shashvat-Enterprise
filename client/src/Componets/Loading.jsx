import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingStates = [
    "Initializing",
    "Loading Assets",
    "Preparing Content",
    "Almost Ready",
    "Finalizing"
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update loading text based on progress
    const textIndex = Math.min(
      Math.floor((progress / 100) * loadingStates.length),
      loadingStates.length - 1
    );
    setLoadingText(loadingStates[textIndex]);
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)'
        }}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(197, 177, 115, 0.2)' }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -150, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(197, 177, 115, 0.15)' }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(197, 177, 115, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(197, 177, 115, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ 
              scale: showLogo ? 1 : 0,
              rotateY: showLogo ? 0 : 180
            }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="mb-8 sm:mb-12"
          >
            {/* Animated Logo Circle */}
            <div className="relative">
              {/* Outer Ring - Rotating */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  width: '140px',
                  height: '140px',
                  background: 'linear-gradient(135deg, rgba(197, 177, 115, 0.3), transparent)',
                  filter: 'blur(2px)'
                }}
              />

              {/* Middle Ring - Counter Rotating */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-2 rounded-full"
                style={{
                  width: '132px',
                  height: '132px',
                  background: 'linear-gradient(225deg, rgba(197, 177, 115, 0.2), transparent)',
                  filter: 'blur(1px)'
                }}
              />

              {/* Pulsing Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  width: '140px',
                  height: '140px',
                  border: '2px solid rgba(197, 177, 115, 0.4)',
                }}
              />

              {/* Center Logo */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(197, 177, 115, 0.5)',
                    '0 0 40px rgba(197, 177, 115, 0.8)',
                    '0 0 20px rgba(197, 177, 115, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                  border: '3px solid rgba(197, 177, 115, 0.5)'
                }}
              >
                {/* Shimmering Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(197, 177, 115, 0.3), transparent)'
                  }}
                />

                {/* Logo Text */}
                <div className="relative text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div 
                      className="text-4xl sm:text-5xl font-bold mb-1"
                      style={{ 
                        background: 'linear-gradient(135deg, #c5b173, #f0d590)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Inter', 'Roboto', sans-serif"
                      }}
                    >
                      S
                    </div>
                    <div 
                      className="text-xs font-semibold tracking-widest"
                      style={{ color: '#c5b173' }}
                    >
                      SHASHVAT
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Text with Typing Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6 sm:mb-8"
          >
            <motion.h2
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              {loadingText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.h2>
            <motion.p
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="text-xs sm:text-sm text-gray-400"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              Premium Brass Products & Solutions
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-72 sm:w-80 md:w-96">
            {/* Progress Container */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(197, 177, 115, 0.1), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Progress Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #c5b173, #f0d590, #c5b173)',
                  boxShadow: '0 0 10px rgba(197, 177, 115, 0.5)'
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Moving shimmer on progress bar */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  width: '30%'
                }}
                animate={{
                  x: ['-100%', '400%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex justify-between items-center text-xs sm:text-sm"
            >
              <motion.span 
                className="text-gray-500"
                style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                Loading Assets...
              </motion.span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ scale: 1.2, color: '#f0d590' }}
                animate={{ scale: 1, color: '#c5b173' }}
                className="font-bold"
                style={{ 
                  fontFamily: "'Inter', 'Roboto', sans-serif"
                }}
              >
                {Math.floor(Math.min(progress, 100))}%
              </motion.span>
            </motion.div>
          </div>

          {/* Animated Loading Dots */}
          <div className="flex gap-2 mt-6 sm:mt-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#c5b173' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>

          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-12 px-4 sm:px-6 py-2 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#c5b173' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </motion.div>
              <span className="text-xs font-semibold text-gray-400" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Since 2019 • ISO Certified • Premium Quality
              </span>
            </div>
          </motion.div>

          {/* Fun Fact Rotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 sm:mt-8 text-center max-w-md"
          >
            <motion.p
              animate={{
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                times: [0, 0.1, 0.9, 1]
              }}
              className="text-xs sm:text-sm text-gray-500 italic"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              "Crafting excellence in brass since 2019"
            </motion.p>
          </motion.div>
        </div>

        {/* Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: 'rgba(197, 177, 115, 0.3)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Circular Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full border-2"
              style={{
                borderColor: progress > (i * 20) ? '#c5b173' : 'rgba(197, 177, 115, 0.2)',
                backgroundColor: progress > (i * 20) ? '#c5b173' : 'transparent'
              }}
              animate={{
                scale: progress > (i * 20) && progress < ((i + 1) * 20) ? [1, 1.3, 1] : 1
              }}
              transition={{
                duration: 0.5,
                repeat: progress > (i * 20) && progress < ((i + 1) * 20) ? Infinity : 0
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
