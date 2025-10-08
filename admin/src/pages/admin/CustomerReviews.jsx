import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllReviews } from "../../backend/manageRewiew";
import DeleteReviewButton from "../../Componets/admin/DeleteReviewButton";
import { useRecoilState } from "recoil";
import { allReviewsAtom } from "../../Atoms/allReviewsAtom";
import { 
  Star, Search, User, Building2, MessageSquare, 
  Trash2, X, Filter, Grid3x3, List, Award,
  TrendingUp, Users, Quote
} from "lucide-react";

const BRAND_COLOR = '#c5b173';

const CustomerReviews = () => {
  const [reviews, setReviews] = useRecoilState(allReviewsAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [filterRating, setFilterRating] = useState("all"); // all, 5, 4, 3, 2, 1
  const [imageErrors, setImageErrors] = useState({}); // Track broken images

  async function setUp() {
    if (reviews === null) {
      setReviews(await getAllReviews());
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleImageError = (reviewId) => {
    setImageErrors(prev => ({ ...prev, [reviewId]: true }));
  };

  const getImageSrc = (review) => {
    if (imageErrors[review.id] || !review.photoUrl) {
      // Return a placeholder with user's initials
      return null;
    }
    return review.photoUrl;
  };

  useEffect(() => {
    setUp();
    scrollToTop();
  }, []);

  // Filter reviews based on search and rating
  const filteredReviews = reviews?.filter((review) => {
    const matchesSearch = 
      review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === "all" ? true : review.rating === parseInt(filterRating);
    
    return matchesSearch && matchesRating;
  });

  const stats = {
    total: reviews?.length || 0,
    avgRating: reviews?.length ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1) : "0.0",
    recentCount: reviews?.filter(r => {
      const reviewDate = new Date(r.createdAt || Date.now());
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return reviewDate >= weekAgo;
    }).length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}></div>
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 shadow-2xl" style={{ borderColor: `${BRAND_COLOR}40` }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Title Section */}
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl" 
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                      <Quote className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Customer Reviews
                      </h1>
                      <p className="text-gray-600 mt-1 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        Testimonials and feedback management
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 text-center"
                  >
                    <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total</div>
                    <div className="text-3xl font-black text-gray-900">{stats.total}</div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-2xl p-4 shadow-lg border-2 text-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}10)`,
                      borderColor: `${BRAND_COLOR}60`
                    }}
                  >
                    <Star className="w-6 h-6 mx-auto mb-2 fill-yellow-400 text-yellow-400" />
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: BRAND_COLOR }}>Avg Rating</div>
                    <div className="text-3xl font-black" style={{ color: BRAND_COLOR }}>{stats.avgRating}</div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-lg border-2 border-green-200 text-center"
                  >
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">This Week</div>
                    <div className="text-3xl font-black text-green-700">{stats.recentCount}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search, Filter, and View Mode Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                  style={{ color: searchTerm ? BRAND_COLOR : '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search by name, company, or review content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
                  style={{
                    borderColor: searchTerm ? BRAND_COLOR : undefined,
                    boxShadow: searchTerm ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
                  viewMode === "grid" ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{ background: viewMode === "grid" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined }}
              >
                <Grid3x3 className="w-5 h-5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
                  viewMode === "list" ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{ background: viewMode === "list" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined }}
              >
                <List className="w-5 h-5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reviews Display */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!reviews || reviews.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-16 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}10)` }}>
                  <Quote className="w-12 h-12" style={{ color: BRAND_COLOR }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Reviews Yet</h3>
                <p className="text-gray-500 text-lg">Customer reviews will appear here when submitted</p>
              </motion.div>
            ) : filteredReviews && filteredReviews.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-16 text-center"
              >
                <Search className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Reviews Found</h3>
                <p className="text-gray-500 text-lg mb-6">Try adjusting your search criteria</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                >
                  Clear Search
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100"
                  >
                    {/* Card Header */}
                    <div className="p-6 border-b-2 border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          {getImageSrc(review) ? (
                            <img
                              src={getImageSrc(review)}
                              alt={review.name}
                              onError={() => handleImageError(review.id)}
                              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                          ) : (
                            <div 
                              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg"
                              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                            >
                              {review.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                            <Award className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {review.companyName}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < (review.rating || 5)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Quote className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: BRAND_COLOR }} />
                        <p className="text-gray-700 leading-relaxed line-clamp-4">
                          {review.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Review #{index + 1}
                      </span>
                      <DeleteReviewButton
                        imgUrl={review.photoUrl}
                        reviewId={review.id}
                        iconClass="text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Profile Image */}
                        <div className="relative flex-shrink-0">
                          {getImageSrc(review) ? (
                            <img
                              src={getImageSrc(review)}
                              alt={review.name}
                              onError={() => handleImageError(review.id)}
                              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                            />
                          ) : (
                            <div 
                              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-lg"
                              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                            >
                              {review.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                            <Award className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <Building2 className="w-4 h-4" />
                                {review.companyName}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < (review.rating || 5)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <DeleteReviewButton
                                imgUrl={review.photoUrl}
                                reviewId={review.id}
                                iconClass="text-red-500 hover:text-red-700 cursor-pointer"
                              />
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Quote className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: BRAND_COLOR }} />
                            <p className="text-gray-700 leading-relaxed">
                              {review.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-4 border-t-2 border-gray-100">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Review #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerReviews;
