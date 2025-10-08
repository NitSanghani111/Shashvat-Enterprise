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
  Inbox, TrendingUp, Activity, Sparkles, AlertTriangle,
  Calendar, MapPin, Building2, Send, Archive, Star
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
    <div className="min-h-screen bg-gray-50">
      {loding && <Loading />}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Modern Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Title Section */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md transition-transform hover:scale-105" 
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Client Requirements
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                      <Activity className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                      Manage customer product inquiries
                    </p>
                  </div>
                </div>

                {/* Stats Cards - Clean & Minimal */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200"
                  >
                    <Inbox className="w-5 h-5 mx-auto mb-1.5 text-blue-600" />
                    <div className="text-xs font-medium text-blue-600 mb-0.5">Total</div>
                    <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200"
                  >
                    <CheckCircle className="w-5 h-5 mx-auto mb-1.5 text-green-600" />
                    <div className="text-xs font-medium text-green-600 mb-0.5">Viewed</div>
                    <div className="text-2xl font-bold text-green-900">{stats.viewed}</div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="rounded-xl p-4 text-center border"
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND_COLOR}15, ${BRAND_COLOR}25)`,
                      borderColor: `${BRAND_COLOR}60`
                    }}
                  >
                    <Sparkles className="w-5 h-5 mx-auto mb-1.5" style={{ color: BRAND_COLOR }} />
                    <div className="text-xs font-medium mb-0.5" style={{ color: BRAND_COLOR }}>New</div>
                    <div className="text-2xl font-bold" style={{ color: BRAND_COLOR }}>{stats.unviewed}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clean Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm font-medium text-gray-900 placeholder-gray-400 transition-all"
                  style={{
                    focusRingColor: searchTerm ? `${BRAND_COLOR}40` : undefined
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons - Clean Design */}
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  filterStatus === "all"
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  background: filterStatus === "all" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined
                }}
              >
                <Inbox className="w-4 h-4" />
                All
                <span className="px-1.5 py-0.5 rounded text-xs font-bold" 
                  style={{
                    backgroundColor: filterStatus === "all" ? 'rgba(255,255,255,0.25)' : `${BRAND_COLOR}20`,
                    color: filterStatus === "all" ? 'white' : BRAND_COLOR
                  }}>
                  {stats.total}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterStatus("unviewed")}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  filterStatus === "unviewed"
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  background: filterStatus === "unviewed" ? `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` : undefined
                }}
              >
                <Sparkles className="w-4 h-4" />
                New
                <span className="px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{
                    backgroundColor: filterStatus === "unviewed" ? 'rgba(255,255,255,0.25)' : `${BRAND_COLOR}20`,
                    color: filterStatus === "unviewed" ? 'white' : BRAND_COLOR
                  }}>
                  {stats.unviewed}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterStatus("viewed")}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  filterStatus === "viewed"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Viewed
                <span className="px-1.5 py-0.5 rounded text-xs font-bold" 
                  style={{
                    backgroundColor: filterStatus === "viewed" ? 'rgba(255,255,255,0.25)' : '#22c55e20',
                    color: filterStatus === "viewed" ? 'white' : '#22c55e'
                  }}>
                  {stats.viewed}
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Active Filters Display - Cleaner */}
          {(searchTerm || filterStatus !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 uppercase">Filters:</span>
              {searchTerm && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-2">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== "all" && (
                <span className="px-3 py-1.5 rounded-md text-sm flex items-center gap-2"
                  style={{ 
                    backgroundColor: filterStatus === "viewed" ? '#22c55e15' : `${BRAND_COLOR}15`,
                    color: filterStatus === "viewed" ? '#22c55e' : BRAND_COLOR
                  }}>
                  {filterStatus === "viewed" ? "Viewed" : "New"}
                  <button onClick={() => setFilterStatus("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="ml-auto text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Requirements Cards List - Professional Clean Design */}
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {!requirements || requirements.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Inbox className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Requirements Yet</h3>
                <p className="text-gray-500">Client requirements will appear here when submitted</p>
              </div>
            ) : filteredRequirements && filteredRequirements.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="px-5 py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredRequirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border"
                  style={{
                    borderColor: !requirement.isViewd ? BRAND_COLOR : '#e5e7eb'
                  }}
                  whileHover={{ y: -2 }}
                >
                  {/* Card Header - Compact & Clean */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Request Number Badge */}
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0" 
                          style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                          {index + 1}
                        </div>
                        
                        {/* Client Name & Status */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-gray-900 truncate">{requirement.name}</h3>
                            {!requirement.isViewd ? (
                              <span className="px-2.5 py-1 text-xs font-bold rounded-md text-white flex items-center gap-1" 
                                style={{ backgroundColor: BRAND_COLOR }}>
                                <Sparkles className="w-3 h-3" />
                                NEW
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-green-100 text-green-700 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                VIEWED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(requirement.createdAt || Date.now()).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons - Simplified */}
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
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-sm hover:shadow-md"
                        >
                          <RiWhatsappLine size={18} />
                          <span className="hidden sm:inline">Reply</span>
                        </button>
                        <button
                          onClick={(e) => handleDeleteRequest(e, requirement.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center gap-1.5 font-semibold text-sm transition-all border border-red-200"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Clean Grid Layout */}
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Product Section - Compact */}
                    <div className="lg:col-span-4">
                      <div className="bg-gray-50 rounded-lg p-4 h-full border border-gray-200">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300">
                          <Package className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                          <h4 className="font-bold text-gray-900 text-sm">Product Inquiry</h4>
                        </div>
                        
                        {requirement.productName ? (
                          <div className="space-y-3">
                            {requirement.productImage && (
                              <div className="relative group">
                                <img
                                  src={requirement.productImage}
                                  alt={requirement.productName}
                                  className="w-full h-36 object-contain bg-white border-2 rounded-lg transition-transform"
                                  style={{ borderColor: `${BRAND_COLOR}60` }}
                                />
                              </div>
                            )}
                            
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-500 font-medium mb-1">Product Name</div>
                              <div className="font-bold text-gray-900 text-sm">{requirement.productName}</div>
                            </div>

                            <a
                              href={`https://shashvatenterprise.com/productdetail/${requirement.productId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-white text-sm shadow-sm hover:shadow-md transition-all"
                              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Product
                            </a>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <Package className="w-12 h-12 text-gray-300 mb-2" />
                            <p className="text-gray-500 text-xs">No specific product</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact & Message Section */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Contact Information - Grid */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-200">
                          <User className="w-4 h-4 text-blue-600" />
                          <h4 className="font-bold text-gray-900 text-sm">Contact Information</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Email */}
                          <div className="bg-white rounded-lg p-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="w-4 h-4 text-blue-600" />
                              <div className="text-xs text-gray-500 font-medium">Email</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-900 truncate" title={requirement.email}>
                              {requirement.email}
                            </div>
                            <a 
                              href={`mailto:${requirement.email}`}
                              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                            >
                              Send Email →
                            </a>
                          </div>

                          {/* Phone */}
                          <div className="bg-white rounded-lg p-3 border border-green-100">
                            <div className="flex items-center gap-2 mb-1">
                              <Phone className="w-4 h-4 text-green-600" />
                              <div className="text-xs text-gray-500 font-medium">Phone</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
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

                      {/* Client Message - Expandable */}
                      <div className="bg-purple-50 rounded-lg border border-purple-100 overflow-hidden">
                        <button
                          onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                          className="w-full flex items-center justify-between p-4 hover:bg-purple-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-purple-600" />
                            <h4 className="font-bold text-gray-900 text-sm">Client Message</h4>
                          </div>
                          {expandedCard === index ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {expandedCard === index && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-4 pb-4"
                            >
                              <div className="bg-white rounded-lg p-4 border border-purple-100">
                                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                                  {requirement.description || "No additional message provided."}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Delete Confirmation Dialog - Clean Modern Style */}
        <dialog ref={dialogRef} className="rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 max-w-md w-full border-0">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Confirm Deletion</h3>
                  <p className="text-red-100 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            
            {/* Dialog Content */}
            <div className="p-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-5">
                <p className="text-red-900 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
                  <span>Are you sure you want to delete this requirement? This will <strong>permanently remove</strong> all associated data.</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </dialog>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
      `}</style>
      </div>
    </div>
  );
};

export default ClientRequirements;
