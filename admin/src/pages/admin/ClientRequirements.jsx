import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  allRequirementRequest,
  deleteRequirementRequest,
  markAsReadAllRequest,
  sendReplayToRequest,
} from "../../backend/manageRequrimentOfUser";
import { Link } from "react-router-dom";
import { RiWhatsappLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isNewRequrimentRequestAtom } from "../../Atoms/isNewRequrimentRequestAtom";
import { clientRequirmentsAtom } from "../../Atoms/clientRequirmentsAtom";
import Loading from "../../Componets/Loading";
import { loadingAtom } from "../../Atoms/loadingAtom";
import { 
  User, Mail, Phone, MessageSquare, Package, ExternalLink, 
  Trash2, X, CheckCircle, Clock, Filter, Search, 
  FileText, AlertCircle, ChevronDown, ChevronUp, Eye,
  Inbox, TrendingUp, Activity, Sparkles, AlertTriangle
} from "lucide-react";

const BRAND_COLOR = '#c5b173';

const ClientRequirements = () => {
  const [loding, setLoding] = useRecoilState(loadingAtom);
  const [requirements, setRequirements] = useRecoilState(clientRequirmentsAtom);
  const [requestId, setRequestId] = useState(null);
  const [isNewRequrimentRequest, setIsNewRequrimentRequest] = useRecoilState(
    isNewRequrimentRequestAtom
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, viewed, unviewed

  const dialogRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setUp = async () => {
    if (requirements === null) {
      setRequirements(await allRequirementRequest());
    }
  };

  async function markread() {
    await markAsReadAllRequest();
  }

  useEffect(() => {
    setUp();
    scrollToTop();
    if (isNewRequrimentRequest === true) {
      markread();
    }
    setIsNewRequrimentRequest(false);
  }, []);

  const handleDeleteRequest = (e, id) => {
    e.preventDefault();
    setRequestId(id);
    dialogRef.current.showModal(); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    setLoding(true);
    await deleteRequirementRequest(requestId);
    setRequirements(await allRequirementRequest());
    dialogRef.current.close();
    setLoding(false);

    // Close the dialog after confirming
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };

  const sendWhatsAppMessage = (number, message) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Filter and search logic
  const filteredRequirements = requirements?.filter((req) => {
    const matchesSearch = 
      req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" ? true :
      filterStatus === "viewed" ? req.isViewd === true :
      filterStatus === "unviewed" ? req.isViewd === false : true;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: requirements?.length || 0,
    viewed: requirements?.filter(r => r.isViewd === true).length || 0,
    unviewed: requirements?.filter(r => r.isViewd === false).length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {loding && <Loading />}

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
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl relative overflow-hidden" 
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                      <FileText className="w-8 h-8 relative z-10" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Client Requirements
                      </h1>
                      <p className="text-gray-600 mt-1 flex items-center gap-2">
                        <Activity className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                        Manage and respond to customer product inquiries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 text-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <Inbox className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total</div>
                      <div className="text-3xl font-black text-gray-900">{stats.total}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-lg border-2 border-green-200 text-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Viewed</div>
                      <div className="text-3xl font-black text-green-700">{stats.viewed}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-2xl p-4 shadow-lg border-2 text-center relative overflow-hidden group"
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}10)`,
                      borderColor: `${BRAND_COLOR}60`
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}30, ${BRAND_COLOR}20)` }}></div>
                    <div className="relative z-10">
                      <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: BRAND_COLOR }} />
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: BRAND_COLOR }}>New</div>
                      <div className="text-3xl font-black" style={{ color: BRAND_COLOR }}>{stats.unviewed}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300" 
                  style={{ color: searchTerm ? BRAND_COLOR : '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search by name, email, product, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium text-gray-900 placeholder-gray-400"
                  style={{
                    borderColor: searchTerm ? BRAND_COLOR : undefined,
                    boxShadow: searchTerm ? `0 0 0 3px ${BRAND_COLOR}20` : undefined
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all duration-300"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
                  filterStatus === "all"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  background: filterStatus === "all" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined
                }}
              >
                <Inbox className="w-4 h-4" />
                All
                <span className="px-2 py-0.5 rounded-lg text-xs font-black" 
                  style={{
                    backgroundColor: filterStatus === "all" ? 'rgba(255,255,255,0.3)' : `${BRAND_COLOR}20`,
                    color: filterStatus === "all" ? 'white' : BRAND_COLOR
                  }}>
                  {stats.total}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("unviewed")}
                className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
                  filterStatus === "unviewed"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  background: filterStatus === "unviewed" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined
                }}
              >
                <Sparkles className="w-4 h-4" />
                New
                <span className="px-2 py-0.5 rounded-lg text-xs font-black"
                  style={{
                    backgroundColor: filterStatus === "unviewed" ? 'rgba(255,255,255,0.3)' : `${BRAND_COLOR}20`,
                    color: filterStatus === "unviewed" ? 'white' : BRAND_COLOR
                  }}>
                  {stats.unviewed}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("viewed")}
                className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
                  filterStatus === "viewed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Viewed
                <span className="px-2 py-0.5 rounded-lg text-xs font-black" 
                  style={{
                    backgroundColor: filterStatus === "viewed" ? 'rgba(255,255,255,0.3)' : '#22c55e20',
                    color: filterStatus === "viewed" ? 'white' : '#22c55e'
                  }}>
                  {stats.viewed}
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || filterStatus !== "all") && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center gap-2 flex-wrap"
            >
              <span className="text-sm font-semibold text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== "all" && (
                <span className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                  style={{ 
                    backgroundColor: filterStatus === "viewed" ? '#22c55e20' : `${BRAND_COLOR}20`,
                    color: filterStatus === "viewed" ? '#22c55e' : BRAND_COLOR
                  }}>
                  Status: {filterStatus === "viewed" ? "Viewed" : "New"}
                  <button onClick={() => setFilterStatus("all")} className="hover:opacity-70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="ml-auto text-sm font-semibold text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Requirements Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {!requirements || requirements.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-16 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}10)` }}>
                  <Inbox className="w-12 h-12" style={{ color: BRAND_COLOR }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Requirements Yet</h3>
                <p className="text-gray-500 text-lg">Client requirements will appear here when submitted</p>
              </motion.div>
            ) : filteredRequirements && filteredRequirements.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-16 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Results Found</h3>
                <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              filteredRequirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100`}
                  whileHover={{ y: -4 }}
                  style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              {/* Card Header with Status Indicator */}
              <div className={`px-6 py-4 border-b-2 ${!requirement.isViewd ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : 'bg-gradient-to-r from-green-50 to-emerald-50'}`}
                style={{
                  borderBottomColor: !requirement.isViewd ? BRAND_COLOR : '#4ade80'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg" 
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{requirement.name}</h3>
                        {!requirement.isViewd && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white animate-pulse shadow-md" 
                            style={{ backgroundColor: BRAND_COLOR }}>
                            NEW REQUEST
                          </span>
                        )}
                        {requirement.isViewd && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500 text-white shadow-md flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            VIEWED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {new Date(requirement.createdAt || Date.now()).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        sendWhatsAppMessage(
                          requirement.whatsAppNo,
                          `Hello ${requirement.name}, regarding your product requirement: ${
                            requirement.productName || ""
                          }`
                        )
                      }
                      className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <RiWhatsappLine size={20} />
                      <span className="hidden sm:inline">Reply on WhatsApp</span>
                      <span className="sm:hidden">Reply</span>
                    </button>
                    <button
                      onClick={(e) => handleDeleteRequest(e, requirement.id)}
                      className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105 border-2 border-red-200"
                    >
                      <Trash2 size={18} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Product Information */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-gray-200 h-full">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                      <Package className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                      <h4 className="font-bold text-gray-900 text-lg">Product Inquiry</h4>
                    </div>
                    
                    {requirement.productName ? (
                      <div className="space-y-4">
                        {/* Product Image */}
                        {requirement.productImage && (
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                            </div>
                            <img
                              src={requirement.productImage}
                              alt={requirement.productName}
                              className="w-full h-48 object-contain bg-white border-4 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                              style={{ borderColor: BRAND_COLOR }}
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                              <Eye className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                            </div>
                          </div>
                        )}
                        
                        {/* Product Name */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2" style={{ borderColor: `${BRAND_COLOR}40` }}>
                          <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Product Name</div>
                          <div className="font-bold text-gray-900 text-lg leading-tight">{requirement.productName}</div>
                        </div>

                        {/* Product Link */}
                        <a
                          href={`https://shashvatenterprise.com/productdetail/${requirement.productId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          View Full Product Details
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Package className="w-16 h-16 text-gray-300 mb-3" />
                        <p className="text-gray-500 text-sm">No specific product selected</p>
                        <p className="text-gray-400 text-xs mt-1">General inquiry</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Panel - Contact & Message */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact Information Panel */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-300">
                      <User className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-gray-900 text-lg">Contact Information</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500 font-semibold mb-1 uppercase">Email Address</div>
                            <div className="text-sm font-bold text-gray-900 truncate" title={requirement.email}>
                              {requirement.email}
                            </div>
                            <a 
                              href={`mailto:${requirement.email}`}
                              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                            >
                              Send Email →
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 font-semibold mb-1 uppercase">Phone Number</div>
                            <div className="text-sm font-bold text-gray-900">
                              {requirement.contactNo || requirement.whatsAppNo}
                            </div>
                            <a 
                              href={`tel:${requirement.contactNo || requirement.whatsAppNo}`}
                              className="text-xs text-green-600 hover:underline mt-1 inline-block"
                            >
                              Call Now →
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Card */}
                      {requirement.whatsAppNo && requirement.whatsAppNo !== requirement.contactNo && (
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100 hover:shadow-md transition-shadow duration-200 sm:col-span-2">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                              <RiWhatsappLine className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 font-semibold mb-1 uppercase">WhatsApp Number</div>
                              <div className="text-sm font-bold text-gray-900">
                                {requirement.whatsAppNo}
                              </div>
                              <button
                                onClick={() =>
                                  sendWhatsAppMessage(
                                    requirement.whatsAppNo,
                                    `Hello ${requirement.name}, regarding your inquiry...`
                                  )
                                }
                                className="text-xs text-green-600 hover:underline mt-1 inline-block"
                              >
                                Open WhatsApp →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Message Panel */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 overflow-hidden">
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 hover:bg-white/50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900 text-lg">Client Message</h4>
                          <p className="text-xs text-gray-500">Click to {expandedCard === index ? 'hide' : 'view'} full message</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                          {expandedCard === index ? 'Collapse' : 'Expand'}
                        </span>
                        {expandedCard === index ? (
                          <ChevronUp className="w-6 h-6 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                    </button>
                    
                    {expandedCard === index && (
                      <div className="px-5 pb-5 animate-slideDown">
                        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-purple-100">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md" 
                              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                              {requirement.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 font-semibold mb-2 uppercase">Requirement Details</div>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {requirement.description || "No additional message provided by the client."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
          </motion.div>
        </AnimatePresence>

        {/* Delete Confirmation Dialog */}
        <dialog ref={dialogRef} className="rounded-3xl p-0 shadow-2xl backdrop:bg-black/60 max-w-lg w-full border-0">
          <div className="bg-white rounded-3xl overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Confirm Deletion</h3>
                    <p className="text-red-100 text-sm mt-1">This action cannot be undone</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dialog Content */}
            <div className="p-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg mb-6">
                <p className="text-red-900 font-semibold flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                  <span>Are you sure you want to delete this requirement request? All associated data will be <strong>permanently removed</strong> from the database.</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-gray-200 hover:scale-105"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </dialog>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
      </div>
    </div>
  );
};

export default ClientRequirements;
