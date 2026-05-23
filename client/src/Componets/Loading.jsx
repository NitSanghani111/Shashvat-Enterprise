import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * Premium Interactive Loading Component
 * Unique animated logo with mouse tracking, particles & 3D effects
 * Inspired by Shivom Brass, Aksar Brass Industries, Exact Metal Craft
 */
const Loading = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Mouse position for interactive 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), springConfig);

  // Brass industry color palette
  const colors = useMemo(() => ({
    brass: "#C5A572",
    brassLight: "#D4B896",
    brassDark: "#A68B5B",
    gold: "#D4AF37",
    copper: "#B87333",
    deep: "#0D1117",
    charcoal: "#161B22",
    slate: "#21262D",
    textPrimary: "#F0F6FC",
    textSecondary: "#8B949E",
  }), []);

  // Floating particles for premium effect
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    })), []
  );

  // Handle mouse move for 3D effect
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  // Reset rotation on mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Smooth progress simulation
  useEffect(() => {
    let frame;
    let start = Date.now();
    const duration = 2800;

    const animate = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  // Container animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Stagger children animation
  const childVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Logo entrance animation
  const logoVariants = {
    initial: { opacity: 0, scale: 0, rotate: -180 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        opacity: { duration: 0.6 }
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="loader"
          ref={containerRef}
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.charcoal} 0%, ${colors.deep} 100%)`,
            willChange: "opacity, transform"
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle, ${colors.brass} 0%, transparent 70%)`,
                }}
                animate={{
                  y: [0, -80, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Ambient glow that follows mouse */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colors.brass}50 0%, transparent 60%)`,
              x: useTransform(mouseX, (v) => v * 0.3),
              y: useTransform(mouseY, (v) => v * 0.3),
            }}
          />

          {/* Main content container */}
          <motion.div
            initial="initial"
            animate="animate"
            className="relative flex flex-col items-center px-6 text-center"
            style={{ perspective: 1000 }}
          >
            {/* 3D Interactive Logo */}
            <motion.div
              variants={logoVariants}
              className="relative mb-10"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setIsHovered(true)}
            >
              {/* Outer hexagonal glow ring */}
              <motion.div
                className="absolute -inset-6"
                style={{
                  background: `conic-gradient(from 0deg, ${colors.brass}00, ${colors.brass}40, ${colors.gold}60, ${colors.brass}40, ${colors.brass}00)`,
                  borderRadius: "50%",
                  filter: "blur(20px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Orbiting rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: 140 + i * 20,
                    height: 140 + i * 20,
                    left: -(20 + i * 10),
                    top: -(20 + i * 10),
                    border: `1px solid ${colors.brass}${20 - i * 5}`,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{ 
                    rotate: i % 2 === 0 ? 360 : -360,
                    rotateX: isHovered ? [0, 15, 0] : 0,
                  }}
                  transition={{ 
                    rotate: { duration: 8 + i * 4, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              ))}

              {/* Main logo container with 3D depth */}
              <motion.div
                className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${colors.slate} 0%, ${colors.charcoal} 50%, ${colors.deep} 100%)`,
                  boxShadow: `
                    0 0 0 2px ${colors.brass}40,
                    0 0 30px ${colors.brass}20,
                    0 20px 60px ${colors.deep}90,
                    inset 0 2px 4px ${colors.brass}15,
                    inset 0 -2px 4px ${colors.deep}50
                  `,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)"
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Inner glow pulse */}
                <motion.div
                  className="absolute inset-3 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${colors.brass}20 0%, transparent 60%)`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Metallic shine sweep */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{ transform: "translateZ(5px)" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${colors.brassLight}30 45%, ${colors.brassLight}50 50%, ${colors.brassLight}30 55%, transparent 60%)`,
                    }}
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  />
                </motion.div>

                {/* Elegant "S" monogram with 3D effect */}
                <motion.div
                  className="relative select-none"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* Shadow layer */}
                  <span
                    className="absolute text-5xl font-bold"
                    style={{
                      color: colors.deep,
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      top: 3,
                      left: 2,
                      opacity: 0.5,
                    }}
                  >
                    S
                  </span>
                  {/* Main letter with gradient */}
                  <motion.span
                    className="relative text-5xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${colors.brassLight} 0%, ${colors.brass} 30%, ${colors.gold} 50%, ${colors.brass} 70%, ${colors.brassDark} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      filter: `drop-shadow(0 2px 4px ${colors.brass}40)`,
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    S
                  </motion.span>
                </motion.div>

                {/* Corner accents */}
                {[0, 90, 180, 270].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute w-2 h-2"
                    style={{
                      background: colors.brass,
                      borderRadius: "1px",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateY(-52px) translateX(-50%)`,
                      boxShadow: `0 0 8px ${colors.brass}60`,
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: angle / 360,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Floating brass dots around logo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${colors.brassLight}, ${colors.brass})`,
                    boxShadow: `0 0 6px ${colors.brass}80`,
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI * 2) / 6) * 80],
                    y: [0, Math.sin((i * Math.PI * 2) / 6) * 80],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Brand name with staggered letters */}
            <motion.div variants={childVariants} className="mb-6">
              <div className="flex items-center justify-center gap-0.5 mb-2">
                {"SHASHVAT".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-xl sm:text-2xl font-semibold tracking-wider"
                    style={{
                      color: colors.textPrimary,
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                    whileHover={{ 
                      color: colors.brass,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.p
                className="text-[11px] sm:text-xs tracking-[0.4em] uppercase"
                style={{ color: colors.brass }}
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Enterprise
              </motion.p>
            </motion.div>

            {/* Modern progress indicator */}
            <motion.div variants={childVariants} className="w-56 sm:w-64">
              {/* Circular progress ring */}
              <div className="relative flex items-center justify-center mb-4">
                <svg width="60" height="60" className="transform -rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="30"
                    cy="30"
                    r="26"
                    stroke={`${colors.brass}20`}
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Progress ring */}
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="26"
                    stroke={`url(#brassGradient)`}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 163.36,
                      strokeDashoffset: 163.36 * (1 - progress / 100),
                      filter: `drop-shadow(0 0 4px ${colors.brass}60)`,
                    }}
                    initial={{ strokeDashoffset: 163.36 }}
                    animate={{ strokeDashoffset: 163.36 * (1 - progress / 100) }}
                    transition={{ duration: 0.1 }}
                  />
                  <defs>
                    <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={colors.brassLight} />
                      <stop offset="50%" stopColor={colors.brass} />
                      <stop offset="100%" stopColor={colors.gold} />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage in center */}
                <motion.span
                  className="absolute text-sm font-medium tabular-nums"
                  style={{ color: colors.textPrimary }}
                  key={progress}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Linear progress bar */}
              <div
                className="relative h-[3px] rounded-full overflow-hidden"
                style={{ background: `${colors.brass}15` }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${colors.brassDark}, ${colors.brass}, ${colors.brassLight}, ${colors.gold})`,
                    boxShadow: `0 0 15px ${colors.brass}60`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.textPrimary}40, transparent)`,
                    width: "30%"
                  }}
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Tagline with typewriter effect */}
            <motion.div
              variants={childVariants}
              className="mt-8 overflow-hidden"
            >
              <motion.p
                className="text-[11px] sm:text-xs tracking-widest uppercase"
                style={{ color: colors.textSecondary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Precision Brass Manufacturing
              </motion.p>
            </motion.div>

            {/* Interactive loading dots */}
            <motion.div
              variants={childVariants}
              className="flex items-center gap-2 mt-6"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full cursor-pointer"
                  style={{ background: colors.brass }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.6, 1.2, 0.6],
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 2,
                    background: colors.gold,
                    transition: { duration: 0.2 }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
            <motion.div
              key={pos}
              className={`absolute w-20 h-20 ${
                pos === "top-left" ? "top-6 left-6" :
                pos === "top-right" ? "top-6 right-6 rotate-90" :
                pos === "bottom-left" ? "bottom-6 left-6 -rotate-90" :
                "bottom-6 right-6 rotate-180"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div
                className="w-full h-[1px] absolute top-0"
                style={{ background: `linear-gradient(90deg, ${colors.brass}40, transparent)` }}
              />
              <div
                className="h-full w-[1px] absolute left-0"
                style={{ background: `linear-gradient(180deg, ${colors.brass}40, transparent)` }}
              />
            </motion.div>
          ))}

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.brass}50, ${colors.gold}80, ${colors.brass}50, transparent)`
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
