import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userAtom } from '../../Atoms/userAtom';
import { isNewRequrimentRequestAtom } from '../../Atoms/isNewRequrimentRequestAtom';
import {
  LayoutDashboard,
  Package,
  Star,
  MessageSquare,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  Bell
} from 'lucide-react';
import logo from '../../img/image.png';

const BRAND_COLOR = '#c5b173';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const isNewRequrimentRequest = useRecoilValue(isNewRequrimentRequestAtom);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      color: '#3b82f6'
    },
    {
      label: 'Manage Products',
      path: '/admin/manage-products',
      icon: Package,
      color: '#10b981'
    },
    {
      label: 'Customer Reviews',
      path: '/admin/customer-reviews',
      icon: Star,
      color: '#f59e0b'
    },
    {
      label: 'Client Requests',
      path: '/admin/client-requirements',
      icon: MessageSquare,
      color: '#ef4444',
      badge: isNewRequrimentRequest
    }
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed top-0 left-0 right-0 h-14 md:h-16 bg-white shadow-lg z-50 flex items-center justify-between px-3 md:px-4"
      >
        <Link to="/admin/dashboard" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 md:h-12" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: 0,
          width: sidebarOpen ? '280px' : '80px'
        }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block fixed left-0 top-0 h-screen bg-white shadow-2xl z-30 overflow-hidden"
      >
        {/* Logo Section */}
        <div className="h-20 border-b border-gray-200 flex items-center justify-between px-4">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <img src={logo} alt="Logo" className="h-12" />
              </motion.div>
            ) : (
              <motion.div
                key="logo-mini"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center w-full"
              >
                <img src={logo} alt="Logo" className="h-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-white shadow-lg border-2 flex items-center justify-center hover:scale-110 transition-transform"
          style={{ borderColor: BRAND_COLOR }}
        >
          {sidebarOpen ? (
            <ChevronLeft size={14} style={{ color: BRAND_COLOR }} />
          ) : (
            <ChevronRight size={14} style={{ color: BRAND_COLOR }} />
          )}
        </button>

        {/* User Info */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-gray-200"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${BRAND_COLOR}15` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: BRAND_COLOR }}>
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate text-sm">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@shashvat.com'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-280px)]">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${active 
                      ? 'shadow-lg scale-105' 
                      : 'hover:bg-gray-50 hover:scale-102'
                    }
                  `}
                  style={{
                    background: active ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)` : 'transparent',
                    color: active ? 'white' : '#4b5563'
                  }}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-all
                    ${active ? 'bg-white/20' : 'bg-gray-100'}
                  `}>
                    <Icon size={20} style={{ color: active ? 'white' : item.color }} />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex-1 flex items-center justify-between"
                      >
                        <span className="font-semibold text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                        {item.badge && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-red-500"
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!sidebarOpen && item.badge && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl 
              bg-red-50 hover:bg-red-100 transition-all duration-300
              text-red-600 font-semibold hover:scale-102
            `}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-white shadow-2xl z-40 overflow-y-auto"
          >
            {/* User Info Mobile */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${BRAND_COLOR}15` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: BRAND_COLOR }}>
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@shashvat.com'}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu Mobile */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${active 
                          ? 'shadow-lg' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                      style={{
                        background: active ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)` : 'transparent',
                        color: active ? 'white' : '#4b5563'
                      }}
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${active ? 'bg-white/20' : 'bg-gray-100'}
                      `}>
                        <Icon size={20} style={{ color: active ? 'white' : item.color }} />
                      </div>
                      <span className="font-semibold text-sm flex-1">{item.label}</span>
                      {item.badge && (
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Logout Button Mobile */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-red-600 font-semibold"
              >
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className="transition-all duration-300 pt-14 md:pt-16 lg:pt-0"
        style={{
          marginLeft: window.innerWidth >= 1024 ? (sidebarOpen ? '280px' : '80px') : '0',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
