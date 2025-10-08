import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { addProductRequirementRequest } from "../backend/manageRequrimentOfUser";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Package,
  X
} from "lucide-react";

const SendRequirementButton = ({ product }) => {
  const [specificDetail, setSpecificDetail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsAppNo, setWhatsAppNo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!contactNo.trim()) {
      errors.contactNo = "Contact No. is required";
    } else if (!/^[0-9]{10}$/.test(contactNo)) {
      errors.contactNo = "Contact No. is invalid";
    }

    if (!whatsAppNo.trim()) {
      errors.whatsAppNo = "WhatsApp No. is required";
    } else if (!/^[0-9]{10}$/.test(whatsAppNo)) {
      errors.whatsAppNo = "WhatsApp No. is invalid";
    }

    if (!specificDetail.trim()) {
      errors.specificDetail = "Specific detail is required";
    }

    return errors;
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
    setCurrentPage(0);
    setName("");
    setEmail("");
    setContactNo("");
    setWhatsAppNo("");
    setSpecificDetail("");
  };

  const openModal = () => {
    setIsOpen(true);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    const errors = {};

    if (currentPage === 0) {
      if (!name.trim()) errors.name = "Name is required";
      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      setErrors({});
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      setCurrentPage(0);
    }
  };

  const handleSend = async () => {
    const errors = {};

    if (!contactNo.trim()) {
      errors.contactNo = "Contact No. is required";
    } else if (!/^[0-9]{10}$/.test(contactNo)) {
      errors.contactNo = "Contact No. must be 10 digits";
    }

    if (!whatsAppNo.trim()) {
      errors.whatsAppNo = "WhatsApp No. is required";
    } else if (!/^[0-9]{10}$/.test(whatsAppNo)) {
      errors.whatsAppNo = "WhatsApp No. must be 10 digits";
    }

    if (!specificDetail.trim()) {
      errors.specificDetail = "Description is required";
    } else if (specificDetail.trim().length < 10) {
      errors.specificDetail = "Please write at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addProductRequirementRequest(
        { name, email, contactNo, whatsAppNo },
        product,
        specificDetail
      );
      closeModal();
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setErrors({ submit: "Failed to send inquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-amber-500 text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
        onClick={openModal}
      >
        <MessageSquare size={20} style={{ color: '#c5b173' }} />
        Send Inquiry
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex justify-center items-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all relative">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 hover:border-amber-400 transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                </button>

                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-amber-50 rounded-full">
                        <Package className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#c5b173' }} />
                      </div>
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
                    >
                      Send Product Inquiry
                    </Dialog.Title>
                    <p className="text-gray-600 text-xs sm:text-sm">Fill in your details to get a quote</p>
                    
                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                      <div className={`h-1.5 w-12 sm:w-16 rounded-full transition-all duration-300 ${
                        currentPage === 0 ? 'bg-amber-500' : 'bg-gray-200'
                      }`} />
                      <div className={`h-1.5 w-12 sm:w-16 rounded-full transition-all duration-300 ${
                        currentPage === 1 ? 'bg-amber-500' : 'bg-gray-200'
                      }`} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Step {currentPage + 1} of 2</p>
                  </div>

                  {/* Product Info */}
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                      <Package size={18} style={{ color: '#c5b173' }} />
                      <span className="font-semibold text-gray-700">Product:</span>
                      <span className="text-gray-900 font-medium">{product.name}</span>
                    </div>
                  </div>

                  {/* Form Pages */}
                  <div className="space-y-5">
                    {/* Page 1 - Name & Email */}
                    <div className={`space-y-4 sm:space-y-5 ${currentPage === 0 ? 'block' : 'hidden'}`}>
                      {/* Name Field */}
                      <div>
                        <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                              errors.name 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                            }`}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                              errors.email 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                            }`}
                            placeholder="example@gmail.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Page 2 - Contact Details & Description */}
                    <div className={`space-y-4 sm:space-y-5 ${currentPage === 1 ? 'block' : 'hidden'}`}>
                      {/* Contact Number */}
                      <div>
                        <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                              errors.contactNo 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                            }`}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                          />
                        </div>
                        {errors.contactNo && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.contactNo}</p>
                        )}
                      </div>

                      {/* WhatsApp Number */}
                      <div>
                        <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={whatsAppNo}
                            onChange={(e) => setWhatsAppNo(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors ${
                              errors.whatsAppNo 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                            }`}
                            placeholder="10-digit WhatsApp number"
                            maxLength={10}
                          />
                        </div>
                        {errors.whatsAppNo && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.whatsAppNo}</p>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-2">
                          Requirements / Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={specificDetail}
                          onChange={(e) => setSpecificDetail(e.target.value)}
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm sm:text-base focus:outline-none transition-colors resize-none ${
                            errors.specificDetail 
                              ? "border-red-500 focus:border-red-500" 
                              : "border-gray-200 hover:border-amber-400 focus:border-amber-500"
                          }`}
                          placeholder="Describe your requirements in detail..."
                          rows={4}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.specificDetail && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.specificDetail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                    {currentPage === 0 ? (
                      <>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm sm:text-base"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleNextPage}
                          className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2"
                          style={{ 
                            backgroundColor: '#c5b173', 
                            borderColor: '#c5b173',
                            color: 'white',
                            fontFamily: "'Inter', 'Roboto', sans-serif"
                          }}
                        >
                          Next
                          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevPage}
                          className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2"
                          disabled={isSubmitting}
                        >
                          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleSend}
                          className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base"
                          style={{ 
                            backgroundColor: '#c5b173', 
                            borderColor: '#c5b173',
                            color: 'white',
                            fontFamily: "'Inter', 'Roboto', sans-serif"
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Inquiry"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SendRequirementButton;
