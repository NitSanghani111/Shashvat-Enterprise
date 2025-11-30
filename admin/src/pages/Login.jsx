
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
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, Sparkles, LogIn, KeyRound, CheckCircle, Award, TrendingUp } from "lucide-react";

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
      } else {
        console.warn('Login failed: User is not an admin or response is invalid');
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-4 px-4" 
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ background: BRAND_COLOR, animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(${BRAND_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BRAND_COLOR} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {isLoading && <Loading />}

      {/* Main Card - HORIZONTAL Layout */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
          
          {/* Horizontal Split Layout */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* LEFT SIDE - Branding & Info */}
            <div className="relative p-8 lg:p-12 flex flex-col justify-center text-white overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #b8935f 50%, #d4a574 100%)` }}>
              
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Animated Circles */}
              <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>

              <div className="relative z-10 space-y-8">
                {/* Logo/Shield */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md shadow-2xl animate-pulse" style={{ animationDuration: '3s' }}>
                  <Shield className="w-10 h-10 text-white" />
                </div>

                {/* Heading */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black mb-3 animate-slideDown">
                    Admin Portal
                  </h1>
                  <p className="text-xl text-white/90 font-medium animate-slideDown" style={{ animationDelay: '0.1s' }}>
                    Shashvat Enterprise
                  </p>
                  <div className="flex items-center gap-2 mt-3 animate-slideDown" style={{ animationDelay: '0.2s' }}>
                    <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                    <p className="text-white/80 text-sm">Management System</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-20 h-1 bg-white/40 rounded-full animate-slideDown" style={{ animationDelay: '0.3s' }}></div>

                {/* Features */}
                <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Secure Access</p>
                      <p className="text-sm text-white/80">SSL Encrypted</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Real-time Analytics</p>
                      <p className="text-sm text-white/80">Live Visitor Tracking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Professional Dashboard</p>
                      <p className="text-sm text-white/80">Complete Control</p>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-8 border-t border-white/20 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                  <p className="text-sm text-white/70">© 2025 Shashvat Enterprise</p>
                  <p className="text-xs text-white/60 mt-1">All rights reserved</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
              
              {/* Welcome Section */}
              <div className="mb-8 animate-slideDown">
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <span>Sign in to access your admin dashboard</span>
                  <ArrowRight className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="admin@shashvat.com"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                      style={{
                        borderColor: focusedField === 'email' ? BRAND_COLOR : undefined,
                        boxShadow: focusedField === 'email' ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                      }}
                      required
                    />
                    {focusedField === 'email' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND_COLOR }}></div>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-fadeIn">
                      <Shield className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-900 pr-12"
                      style={{
                        borderColor: focusedField === 'password' ? BRAND_COLOR : undefined,
                        boxShadow: focusedField === 'password' ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3 animate-fadeIn">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">Password Strength</span>
                        <span className={`text-xs font-bold ${
                          password.length >= 8 ? 'text-green-600' :
                          password.length >= 6 ? 'text-blue-600' :
                          password.length >= 4 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {password.length >= 8 ? 'Strong' :
                           password.length >= 6 ? 'Good' :
                           password.length >= 4 ? 'Fair' : 'Weak'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            password.length >= 8 ? 'bg-green-500' :
                            password.length >= 6 ? 'bg-blue-500' :
                            password.length >= 4 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((password.length / 8) * 100, 100)}%` }}
                        ></div>
                      </div>
                      {password.length < 6 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Use at least 6 characters for better security
                        </p>
                      )}
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-fadeIn">
                      <Shield className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between animate-slideUp" style={{ animationDelay: '0.3s' }}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 accent-current cursor-pointer"
                      style={{ accentColor: BRAND_COLOR }}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-semibold hover:underline transition-all"
                    style={{ color: BRAND_COLOR }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email || password.length < 6}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 animate-slideUp"
                  style={{ 
                    background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #d4a574 100%)`,
                    animationDelay: '0.4s'
                  }}
                >
                  {isLoading ? (
                    <>
                      <LogIn className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                <p className="text-center text-xs text-gray-500">
                  Protected by enterprise-grade security
                </p>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">SSL Encrypted</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">Secure Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;