import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue, useRecoilState } from 'recoil';
import { allReviewsAtom } from '../../Atoms/allReviewsAtom';
import { clientRequirmentsAtom } from '../../Atoms/clientRequirmentsAtom';
import { productAtom } from '../../Atoms/productsAtom';
import { userAtom } from '../../Atoms/userAtom';
import { allProduct } from '../../backend/manageProduct';
import { allRequirementRequest } from '../../backend/manageRequrimentOfUser';
import { getAllReviews } from '../../backend/manageRewiew';
import {
  TrendingUp,
  Package,
  Star,
  MessageSquare,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShoppingCart,
  Award,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BRAND_COLOR = '#c5b173';

const Dashboard = () => {
  const [reviews, setReviews] = useRecoilState(allReviewsAtom);
  const [requirements, setRequirements] = useRecoilState(clientRequirmentsAtom);
  const [products, setProducts] = useRecoilState(productAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Load all data on mount if not already loaded
    const loadDashboardData = async () => {
      try {
        if (products === null) {
          const fetchedProducts = await allProduct();
          setProducts(fetchedProducts);
        }
        if (reviews === null) {
          const fetchedReviews = await getAllReviews();
          setReviews(fetchedReviews);
        }
        if (requirements === null) {
          const fetchedRequirements = await allRequirementRequest();
          setRequirements(fetchedRequirements);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };
    
    loadDashboardData();
  }, []);

  // Calculate stats
  const totalProducts = products?.length || 0;
  const totalReviews = reviews?.length || 0;
  const totalRequirements = requirements?.length || 0;
  
  const unreadRequirements = requirements?.filter(req => !req.isViewd).length || 0;
  const avgRating = reviews?.length 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1) 
    : '0.0';

  const recentReviews = reviews?.filter(r => {
    const reviewDate = new Date(r.createdAt || Date.now());
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return reviewDate >= weekAgo;
  }).length || 0;

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: '#10b981',
      bgColor: '#10b98115',
      change: '+12%',
      isIncrease: true,
      link: '/admin/manage-products'
    },
    {
      label: 'Customer Reviews',
      value: totalReviews,
      icon: Star,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      subtext: `${avgRating} avg rating`,
      change: `${recentReviews} this week`,
      link: '/admin/customer-reviews'
    },
    {
      label: 'Client Requests',
      value: totalRequirements,
      icon: MessageSquare,
      color: '#ef4444',
      bgColor: '#ef444415',
      subtext: `${unreadRequirements} unread`,
      change: unreadRequirements > 0 ? 'Action needed' : 'All clear',
      link: '/admin/client-requirements'
    },
    {
      label: 'Active Users',
      value: '2.4K',
      icon: Users,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      change: '+8.2%',
      isIncrease: true
    }
  ];

  const quickActions = [
    { label: 'Add New Product', path: '/admin/manage-products', icon: Package, color: '#10b981' },
    { label: 'View Reviews', path: '/admin/customer-reviews', icon: Star, color: '#f59e0b' },
    { label: 'Check Requests', path: '/admin/client-requirements', icon: MessageSquare, color: '#ef4444' }
  ];

  const recentActivity = [
    {
      type: 'review',
      message: 'New 5-star review received',
      time: '2 hours ago',
      icon: Star,
      color: '#f59e0b'
    },
    {
      type: 'request',
      message: 'Client inquiry for brass fittings',
      time: '4 hours ago',
      icon: MessageSquare,
      color: '#ef4444'
    },
    {
      type: 'product',
      message: 'Product stock updated',
      time: '6 hours ago',
      icon: Package,
      color: '#10b981'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl blur-3xl opacity-20" 
            style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }} />
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-2 shadow-2xl"
            style={{ borderColor: `${BRAND_COLOR}40` }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                    <Activity className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 mt-1 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                      <span className="truncate">Welcome back, {user?.name || 'Admin'}!</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-2 md:px-4 rounded-xl bg-white shadow-md border-2" 
                  style={{ borderColor: `${BRAND_COLOR}20` }}>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" style={{ color: BRAND_COLOR }} />
                    <span className="font-semibold text-gray-700 hidden sm:inline">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="font-semibold text-gray-700 sm:hidden">
                      {new Date().toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={stat.link || '#'} className="block group">
                <div className="relative overflow-hidden bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full blur-3xl opacity-10"
                    style={{ background: stat.color }} />
                  
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
                      style={{ backgroundColor: stat.bgColor }}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
                    </div>
                    {stat.isIncrease !== undefined && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                        stat.isIncrease ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {stat.isIncrease ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        <span className="hidden sm:inline">{stat.change}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 md:mb-2">
                      {stat.label}
                    </p>
                    <p className="text-2xl md:text-3xl font-black mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    {stat.subtext && (
                      <p className="text-xs text-gray-600 font-medium">{stat.subtext}</p>
                    )}
                    {stat.change && !stat.isIncrease && stat.isIncrease !== true && (
                      <p className="text-xs font-semibold mt-2" style={{ color: stat.color }}>
                        {stat.change}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0" 
                style={{ background: `${BRAND_COLOR}20` }}>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" style={{ color: BRAND_COLOR }} />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link to={action.path}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${action.color}10, ${action.color}05)`
                        }}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4"
                          style={{ background: `${action.color}20` }}>
                          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: action.color }} />
                        </div>
                        <p className="font-bold text-gray-900 text-xs md:text-sm">{action.label}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${BRAND_COLOR}20` }}>
                <Clock className="w-4 h-4 md:w-5 md:h-5" style={{ color: BRAND_COLOR }} />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${activity.color}15` }}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: activity.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${BRAND_COLOR}20` }}>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" style={{ color: BRAND_COLOR }} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Performance Overview</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <Award className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: BRAND_COLOR }} />
              <p className="text-xl md:text-2xl font-black mb-1" style={{ color: BRAND_COLOR }}>{avgRating}</p>
              <p className="text-xs font-semibold text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-600" />
              <p className="text-xl md:text-2xl font-black text-green-600 mb-1">
                {totalRequirements - unreadRequirements}
              </p>
              <p className="text-xs font-semibold text-gray-600">Completed</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-xl md:text-2xl font-black text-orange-600 mb-1">{unreadRequirements}</p>
              <p className="text-xs font-semibold text-gray-600">Pending</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-xl md:text-2xl font-black text-blue-600 mb-1">{totalProducts}</p>
              <p className="text-xs font-semibold text-gray-600">Products</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
