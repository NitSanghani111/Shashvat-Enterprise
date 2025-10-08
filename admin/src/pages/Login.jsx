
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
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, Sparkles } from "lucide-react";

const BRAND_COLOR = '#c5b173';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useRecoilState(userAtom);
  const setToken = useSetRecoilState(authAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [isNewRequrimentRequest, setIsNewRequrimentRequest] = useRecoilState(
    isNewRequrimentRequestAtom
  );
  const [requirements, setRequirements] = useRecoilState(clientRequirmentsAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigator = useNavigate();

  const validate = () => {
    let errors = {};
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission
      const res = await login(email, password, navigator);
      setUser(res.user);

      if (res.user !== null) {
        if (res.user.isAdmin) {
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
    }
    setIsLoading(false);
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 px-4" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)' }}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(30deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR}),
          linear-gradient(150deg, ${BRAND_COLOR} 12%, transparent 12.5%, transparent 87%, ${BRAND_COLOR} 87.5%, ${BRAND_COLOR})`,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 40px 70px'
        }}></div>
      </div>

      {/* Decorative Animated Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: BRAND_COLOR, animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: BRAND_COLOR, animationDuration: '6s' }}></div>

      {isLoading && <Loading />}

      <div className="relative z-10 w-full max-w-md">
        {/* Card Container with Better Shadow */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl animate-fadeIn">
          {/* Header Section with Brand Color */}
          <div className="relative px-8 pt-10 pb-8 text-white" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #d4a574 100%)` }}>
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff)`,
                backgroundSize: '40px 70px'
              }}></div>
            </div>

            <div className="relative text-center">
              {/* Animated Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <Shield className="w-10 h-10 text-white animate-pulse" style={{ animationDuration: '2s' }} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-2 animate-slideDown" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                Admin Portal
              </h2>
              <p className="text-white/90 text-sm font-medium animate-slideDown" style={{ animationDelay: '0.1s' }}>
                Shashvat Enterprise Management
              </p>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-2 mt-6 animate-slideDown" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-0.5 bg-white/30 rounded-full"></div>
                <Sparkles className="w-4 h-4 text-white/70 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="w-12 h-0.5 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Form Section with Better Spacing */}
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field with Improved UX */}
              <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300">
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'scale-110' : ''}`} style={{ color: focusedField === 'email' ? BRAND_COLOR : '#9CA3AF' }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/30' 
                        : focusedField === 'email'
                        ? 'border-gray-900 shadow-lg transform scale-[1.01]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: focusedField === 'email' && !errors.email ? BRAND_COLOR : undefined,
                      boxShadow: focusedField === 'email' && !errors.email ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                    }}
                    placeholder="admin@shashvatenterprise.com"
                  />
                  {/* Success Indicator */}
                  {email && !errors.email && email.includes('@') && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <svg className="w-5 h-5 text-green-500 animate-scaleIn" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {errors.email && (
                    <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium flex items-center gap-1.5 animate-shake">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field with Improved UX */}
              <div className="pt-2 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'scale-110' : ''}`} style={{ color: focusedField === 'password' ? BRAND_COLOR : '#9CA3AF' }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/30' 
                        : focusedField === 'password'
                        ? 'border-gray-900 shadow-lg transform scale-[1.01]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: focusedField === 'password' && !errors.password ? BRAND_COLOR : undefined,
                      boxShadow: focusedField === 'password' && !errors.password ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                    }}
                    placeholder="Enter your password"
                  />
                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 transition-all duration-200 group"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <div className="relative">
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      ) : (
                        <Eye className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      )}
                    </div>
                  </button>
                  {/* Success Indicator */}
                  {password && !errors.password && password.length >= 6 && !showPassword && (
                    <div className="absolute inset-y-0 right-12 flex items-center">
                      <svg className="w-5 h-5 text-green-500 animate-scaleIn" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {errors.password && (
                    <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium flex items-center gap-1.5 animate-shake">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </div>
                  )}
                </div>
                {/* Password Strength Indicator */}
                {password && !errors.password && (
                  <div className="mt-2 animate-slideDown">
                    <div className="flex gap-1.5">
                      <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 2 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 4 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 6 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= 8 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                      {password.length < 6 ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                          Weak - Use at least 6 characters
                        </>
                      ) : password.length < 8 ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          Good - Consider 8+ characters
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          Strong password
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Remember Me & Forgot Password with Better Alignment */}
              <div className="flex items-center justify-between pt-2 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-5 w-5 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer appearance-none checked:border-0"
                      style={{ 
                        backgroundColor: rememberMe ? BRAND_COLOR : 'white',
                        backgroundImage: rememberMe ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")` : 'none',
                        focusRingColor: BRAND_COLOR 
                      }}
                    />
                  </div>
                  <label htmlFor="remember-me" className="ml-2.5 block text-sm font-medium text-gray-700 cursor-pointer select-none group-hover:text-gray-900 transition-colors duration-200">
                    Remember me for 30 days
                  </label>
                </div>

                <div className="text-sm">
                  <a 
                    href="#" 
                    className="font-semibold transition-all duration-200 hover:underline inline-flex items-center gap-1 group"
                    style={{ color: BRAND_COLOR }}
                  >
                    Forgot password?
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Submit Button with Enhanced Interaction */}
              <div className="pt-6 animate-slideUp" style={{ animationDelay: '0.6s' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-bold text-base shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #d4a574 100%)` }}
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                  
                  <Lock className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="relative">Sign In to Dashboard</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            {/* Sign Up Link with Better Visual Separation */}
            <div className="mt-8 text-center pt-6 border-t-2 border-gray-100 animate-slideUp" style={{ animationDelay: '0.7s' }}>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <span>Not registered yet?</span>
                <Link 
                  to="/signup" 
                  className="font-bold transition-all duration-200 hover:underline inline-flex items-center gap-1 group"
                  style={{ color: BRAND_COLOR }}
                >
                  Create Account
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info with Better Spacing */}
        <div className="mt-8 text-center space-y-3 animate-slideUp" style={{ animationDelay: '0.8s' }}>
          <p className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
            <Shield className="w-4 h-4 animate-pulse" style={{ color: BRAND_COLOR, animationDuration: '2s' }} />
            Secure Admin Access with SSL Encryption
          </p>
          <p className="text-gray-500 text-xs">
            © 2025 Shashvat Enterprise. All rights reserved.
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;