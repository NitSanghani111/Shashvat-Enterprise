
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { loadingAtom } from "../Atoms/loadingAtom";
import Loading from "../Componets/Loading";
import { isNewRequrimentRequestAtom } from "../Atoms/isNewRequrimentRequestAtom";
import { clientRequirmentsAtom } from "../Atoms/clientRequirmentsAtom";
import { login } from "../backend/auth";
import { allRequirementRequest } from "../backend/manageRequrimentOfUser";
import { authAtom } from "../Atoms/authAtom";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Sparkles, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import official Shashvat Enterprise logo
import shashvatLogo from "../img/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useRecoilState(userAtom);
  const setToken = useSetRecoilState(authAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [isNewRequrimentRequest, setIsNewRequrimentRequest] = useRecoilState(isNewRequrimentRequestAtom);
  const [requirements, setRequirements] = useRecoilState(clientRequirmentsAtom);
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();

  const validate = () => {
    let errors = {};
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = "Email is required";
    else if (!emailPattern.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const res = await login(email, password, navigator);
      if (res && res.user && res.user.isAdmin) {
        setUser(res.user);
        setToken({ isAuthenticated: true, token: res.token });
        if (requirements === null) {
          const allRequest = await allRequirementRequest();
          setRequirements(allRequest);
          for (let i = 0; i < allRequest.length; i++) {
            if (allRequest[i].isViewd == false) {
              setIsNewRequrimentRequest(true);
              break;
            }
          }
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Floating particles - reduced count for better performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #0c0c0c 100%)' }}>
      
      {isLoading && <Loading />}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{ background: 'linear-gradient(135deg, #c5a172, #8b6914)' }}
          animate={{
            x: ['-20%', '10%', '-20%'],
            y: ['-20%', '20%', '-20%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{ background: 'linear-gradient(135deg, #c5a172, #d4af37)' }}
          animate={{
            x: ['20%', '-10%', '20%'],
            y: ['20%', '-20%', '20%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: 'rgba(197, 161, 114, 0.4)',
              boxShadow: '0 0 10px rgba(197, 161, 114, 0.3)',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(197,161,114,0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(197,161,114,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Card Glow Effect */}
        <div
          className="absolute -inset-[1px] rounded-3xl opacity-40 blur-sm"
          style={{
            background: 'radial-gradient(600px circle at 50% 50%, rgba(197,161,114,0.3), transparent 50%)',
          }}
        />
        
        {/* Card Border Gradient */}
        <div className="absolute -inset-[1px] rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(197,161,114,0.3), rgba(197,161,114,0.1), rgba(197,161,114,0.3))',
          }}
        />

        {/* Card Content */}
        <div className="relative bg-[#0d0d0d] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Panel - Branding */}
            <div className="relative p-8 lg:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-[600px]"
              style={{ background: 'linear-gradient(180deg, rgba(197,161,114,0.08) 0%, transparent 100%)' }}>
              
              {/* Decorative Lines */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-20 -left-20 w-40 h-[1px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(197,161,114,0.5), transparent)' }}
                  animate={{ x: [0, 100, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-32 -right-20 w-60 h-[1px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(197,161,114,0.5), transparent)' }}
                  animate={{ x: [0, -80, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>

              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(197,161,114,0.2), rgba(197,161,114,0.05))',
                      border: '1px solid rgba(197,161,114,0.2)',
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img src={shashvatLogo} alt="Logo" className="w-12 h-12 object-contain" />
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">SHASHVAT</h2>
                    <p className="text-xs tracking-[0.3em] text-[#c5a172]">ENTERPRISE</p>
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles className="w-4 h-4 text-[#c5a172]" />
                    <span className="text-xs tracking-widest text-[#c5a172] uppercase">Admin Portal</span>
                  </motion.div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Welcome to
                    <span className="block mt-2 bg-gradient-to-r from-[#c5a172] via-[#d4af37] to-[#c5a172] bg-clip-text text-transparent">
                      Control Center
                    </span>
                  </h1>
                </div>
                
                <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                  Access your dashboard to manage products, track analytics, and control your business operations.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Secure', 'Real-time', 'Analytics'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="px-3 py-1.5 text-xs rounded-full border border-[#c5a172]/20 text-[#c5a172] bg-[#c5a172]/5"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5"
              >
                {[
                  { value: '99.9%', label: 'Uptime' },
                  { value: '256-bit', label: 'Encryption' },
                  { value: '24/7', label: 'Monitoring' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-lg font-semibold text-[#c5a172]">{stat.value}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
              
              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #c5a172, #8b6914)' }}>
                  <img src={shashvatLogo} alt="Logo" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">SHASHVAT</h2>
                  <p className="text-[10px] tracking-widest text-[#c5a172]">ENTERPRISE</p>
                </div>
              </div>

              {/* Form Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@shashvat.com"
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#c5a172] focus:ring-1 focus:ring-[#c5a172]/30"
                    />
                    {email && email.includes('@') && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-2 flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-4 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#c5a172] focus:ring-1 focus:ring-[#c5a172]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c5a172]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength - Simple version */}
                  {password && (
                    <div className="mt-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-1 flex-1 rounded-full bg-[#222] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-200"
                              style={{
                                width: password.length >= i * 2 ? '100%' : '0%',
                                backgroundColor: password.length >= 8 ? '#22c55e' : password.length >= 6 ? '#c5a172' : '#ef4444',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {password.length >= 8 ? 'Strong password' : password.length >= 6 ? 'Good password' : 'Use at least 6 characters'}
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-2 flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-[#c5a172]/50 transition-colors">
                      <input type="checkbox" className="sr-only peer" />
                      <motion.div
                        className="w-3 h-3 rounded-sm bg-[#c5a172] opacity-0 peer-checked:opacity-100"
                        whileTap={{ scale: 0.8 }}
                      />
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-[#c5a172] hover:text-[#d4af37] transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !email || password.length < 6}
                  className="relative w-full py-4 rounded-xl font-semibold text-black overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c5a172] via-[#d4af37] to-[#c5a172] bg-[length:200%_100%] group-hover:animate-shimmer" />
                  
                  {/* Button Shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Button Content */}
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-white/5"
              >
                <div className="flex items-center justify-center gap-6 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#c5a172]" />
                    <span className="text-xs">SSL Secured</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#c5a172]" />
                    <span className="text-xs">Encrypted</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;