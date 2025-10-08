"use client"

import { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "tailwindcss/tailwind.css"
import { Modal, Button, Form, Input, Upload, message } from "antd"
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "../Atoms/userAtom"
import { storeReview, getAllReviews } from "../backend/manageRewiew"
import { allReviewsAtom } from "../Atoms/allReviewsAtom"
import Loading from "./Loading"
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  UploadIcon, 
  ImageIcon,
  MessageSquare,
  User,
  Building2
} from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useRecoilState(allReviewsAtom)
  const user = useRecoilValue(userAtom)
  const [modalVisible, setModalVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [currentRating, setCurrentRating] = useState(5)
  const [previewImage, setPreviewImage] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [form] = Form.useForm()
  const [hoveringStars, setHoveringStars] = useState(0)
  const [currentFormPage, setCurrentFormPage] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true)
      try {
        const reviews = await getAllReviews()
        setTestimonials(reviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        message.error("Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [setTestimonials])

  const handleModalOpen = () => {
    setModalVisible(true)
    setCurrentRating(5)
    setFile(null)
    setPreviewImage(null)
    form.resetFields()
  }

  const handleModalClose = () => {
    setModalVisible(false)
    form.resetFields()
    setFile(null)
    setPreviewImage(null)
    setCurrentRating(5)
    setCurrentFormPage(0)
  }

  const handleUpload = ({ file }) => {
    setFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
        setPreviewImage(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      await storeReview({ ...values, rating: currentRating }, file)
      const updatedReviews = await getAllReviews()
      setTestimonials(updatedReviews)
      message.success("Thank you for your review!")
      handleModalClose()
    } catch (error) {
      console.error("Error submitting review:", error)
      message.error("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const CustomArrow = ({ onClick, direction }) => (
    <motion.button
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${
        direction === "prev" ? "left-2 md:left-4" : "right-2 md:right-4"
      } bg-white w-12 h-12 rounded-full shadow-md hover:shadow-lg border border-gray-100 
      transition-all duration-200 flex items-center justify-center group`}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
      ) : (
        <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
      )}
    </motion.button>
  )

  const RatingSelector = () => (
    <div className="flex flex-col items-center gap-3 py-4">
      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Your Rating</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
            type="button"
            onClick={() => setCurrentRating(rating)}
            onMouseEnter={() => setHoveringStars(rating)}
            onMouseLeave={() => setHoveringStars(0)}
            className="p-1 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
          >
            <Star 
              className={`w-8 h-8 ${
                rating <= (hoveringStars || currentRating) 
                  ? "text-amber-500 fill-amber-500" 
                  : "text-gray-300"
              } transition-colors duration-150`} 
            />
          </motion.button>
        ))}
      </div>
      <span className="text-sm font-medium" style={{ color: '#c5b173' }}>
        {hoveringStars > 0 ? getRatingLabel(hoveringStars) : getRatingLabel(currentRating)}
      </span>
    </div>
  )

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Great",
      5: "Excellent"
    }
    return labels[rating] || ""
  }

  const getQuoteForRating = (rating) => {
    const quotes = {
      1: "Could be better",
      2: "Satisfactory experience",
      3: "Good service overall",
      4: "Really enjoyed working with them",
      5: "Outstanding experience!"
    }
    return quotes[rating] || quotes[5]
  }

  const handleNextPage = async () => {
    if (currentFormPage === 0) {
      try {
        await form.validateFields(['name', 'companyName'])
        setCurrentFormPage(1)
      } catch (error) {
        // Validation failed, stay on current page
        message.error("Please fill in all required fields")
      }
    }
  }

  const handlePrevPage = () => {
    if (currentFormPage === 1) {
      setCurrentFormPage(0)
    }
  }

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              What Our <span style={{ color: '#c5b173' }}>Clients</span> Say
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Real stories from businesses that have partnered with us
            </p>
          </div>

          {/* Carousel */}
          <div className="max-w-5xl mx-auto mb-8">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={6000}
              transitionTime={500}
              renderArrowPrev={(clickHandler) => <CustomArrow onClick={clickHandler} direction="prev" />}
              renderArrowNext={(clickHandler) => <CustomArrow onClick={clickHandler} direction="next" />}
              onChange={setCurrentSlide}
              className="testimonial-carousel"
              swipeable={true}
              emulateTouch={true}
              selectedItem={currentSlide}
            >
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <div key={index} className="px-4 py-6 md:py-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 lg:p-12 transition-all duration-200 hover:shadow-xl hover:border-amber-200 mx-auto max-w-4xl">
                      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
                        {/* Client Info */}
                        <div className="flex flex-col items-center md:w-1/3 shrink-0">
                          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gray-50 shadow-md mb-4">
                            <img
                              src={testimonial.img || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 text-sm md:text-base font-medium mb-3 flex items-center gap-1">
                            <Building2 size={16} style={{ color: '#c5b173' }} />
                            {testimonial.companyName}
                          </p>
                          
                          {/* Rating Stars */}
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={`${
                                  i < (testimonial.rating || 5) ? "fill-amber-500 text-amber-500" : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Testimonial Text */}
                        <div className="md:w-2/3 flex flex-col justify-center">
                          <Quote className="h-8 w-8 mb-4" style={{ color: '#c5b173', opacity: 0.3 }} strokeWidth={1.5} />
                          <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                            {testimonial.description}
                          </blockquote>
                          <Quote className="h-8 w-8 mt-4 ml-auto rotate-180" style={{ color: '#c5b173', opacity: 0.3 }} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              onClick={handleModalOpen}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-amber-500 text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
              aria-label="Share your testimonial"
            >
              <MessageSquare size={20} style={{ color: '#c5b173' }} />
              Share Your Experience
            </motion.button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      <Modal
        title={null}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        centered
        className="testimonial-modal"
        closable={true}
        maskClosable={false}
        closeIcon={
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 hover:border-amber-400 transition-all duration-200">
            <span className="text-gray-600 hover:text-gray-900 text-2xl font-normal leading-none">×</span>
          </div>
        }
      >
        <div className="pt-4 pb-4 px-2 sm:px-4">
          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-amber-50 rounded-full">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#c5b173' }} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
              Share Your Experience
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">Help others by sharing your feedback</p>
            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              <div className={`h-1.5 w-12 sm:w-16 rounded-full transition-all duration-300 ${
                currentFormPage === 0 ? 'bg-amber-500' : 'bg-gray-200'
              }`} />
              <div className={`h-1.5 w-12 sm:w-16 rounded-full transition-all duration-300 ${
                currentFormPage === 1 ? 'bg-amber-500' : 'bg-gray-200'
              }`} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Step {currentFormPage + 1} of 2</p>
          </div>

          {/* Form */}
          <Form 
            form={form} 
            name="review-form" 
            onFinish={handleSubmit} 
            layout="vertical" 
            className="mt-4"
            autoComplete="off"
            requiredMark={false}
          >
            {/* Page 1 - Basic Info */}
            <div
              className={`space-y-4 sm:space-y-5 transition-all duration-300 ${
                currentFormPage === 0 ? 'block' : 'hidden'
              }`}
            >
                  {/* Name Field */}
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Your Name</span>}
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input
                      className="rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 border-gray-200 hover:border-amber-400 focus:border-amber-500 text-sm sm:text-base"
                      placeholder="Enter your full name"
                      prefix={<User size={16} className="text-gray-400 mr-1 sm:mr-2" />}
                    />
                  </Form.Item>

                  {/* Company Field */}
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Company</span>}
                    name="companyName"
                    rules={[{ required: true, message: "Please enter your company name" }]}
                  >
                    <Input
                      className="rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 border-gray-200 hover:border-amber-400 focus:border-amber-500 text-sm sm:text-base"
                      placeholder="Enter your company name"
                      prefix={<Building2 size={16} className="text-gray-400 mr-1 sm:mr-2" />}
                    />
                  </Form.Item>

                  {/* Rating Selector */}
                  <div className="py-2 sm:py-3">
                    <RatingSelector />
                  </div>
                </div>

                {/* Page 2 - Review & Photo */}
                <div
                  className={`space-y-4 sm:space-y-5 transition-all duration-300 ${
                    currentFormPage === 1 ? 'block' : 'hidden'
                  }`}
                >
                  {/* Experience Field */}
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Your Experience</span>}
                    name="description"
                    rules={[
                      { required: true, message: "Please share your experience" },
                      { min: 10, message: "Please write at least 10 characters" }
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      className="rounded-lg border-gray-200 hover:border-amber-400 focus:border-amber-500 text-sm sm:text-base"
                      placeholder={getQuoteForRating(currentRating)}
                      style={{ resize: 'none' }}
                      onPressEnter={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    />
                  </Form.Item>

                  {/* Photo Upload */}
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Your Photo</span>}
                    name="photo"
                    rules={[{ required: false }]}
                  >
                    <div className="space-y-3">
                      {previewImage ? (
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <Upload 
                            beforeUpload={() => false} 
                            onChange={handleUpload} 
                            showUploadList={false}
                          >
                            <Button 
                              type="default"
                              className="flex items-center gap-1 sm:gap-2 border-gray-200 hover:border-amber-400 text-xs sm:text-sm px-3 sm:px-4"
                            >
                              <ImageIcon size={14} className="sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Change Photo</span>
                              <span className="sm:hidden">Change</span>
                            </Button>
                          </Upload>
                        </div>
                      ) : (
                        <Upload
                          beforeUpload={() => false}
                          onChange={handleUpload}
                          showUploadList={false}
                          className="w-full"
                        >
                          <div className="p-4 sm:p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center gap-2 cursor-pointer hover:border-amber-400 transition-colors">
                            <div className="p-2 sm:p-3 bg-amber-50 rounded-full">
                              <UploadIcon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#c5b173' }} />
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-gray-700">Upload your photo</div>
                            <div className="text-xs text-gray-500">(Optional)</div>
                          </div>
                        </Upload>
                      )}
                    </div>
                  </Form.Item>
                </div>

            {/* Form Actions */}
            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
              {currentFormPage === 0 ? (
                <>
                  <Button
                    onClick={handleModalClose}
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    Cancel
                  </Button>
                  <Button
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
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handlePrevPage}
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2"
                    disabled={submitting}
                  >
                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base"
                    style={{ 
                      backgroundColor: '#c5b173', 
                      borderColor: '#c5b173',
                      fontFamily: "'Inter', 'Roboto', sans-serif"
                    }}
                    loading={submitting}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </Modal>

      {/* Custom Styles */}
      <style>{`
        .testimonial-carousel .carousel.carousel-slider {
          overflow: visible;
        }
        .testimonial-carousel .carousel .control-dots {
          bottom: -40px;
        }
        .testimonial-carousel .carousel .control-dots .dot {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          box-shadow: none;
          opacity: 1;
          transition: all 0.2s ease;
        }
        .testimonial-carousel .carousel .control-dots .dot.selected {
          background: #c5b173;
          transform: scale(1.3);
        }
        
        /* Modal Styles */
        .testimonial-modal .ant-modal-content {
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          overflow: visible !important;
        }
        .testimonial-modal .ant-modal-close {
          top: -12px;
          right: -12px;
          z-index: 1000;
          background: transparent;
        }
        .testimonial-modal .ant-modal-close:hover {
          background: transparent;
        }
        .testimonial-modal .ant-modal-close-x {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .testimonial-modal .ant-modal {
            max-width: calc(100vw - 32px);
            margin: 16px;
          }
          .testimonial-modal .ant-modal-body {
            padding: 16px;
          }
          .testimonial-modal .ant-modal-close {
            top: -8px;
            right: -8px;
          }
        }
        .testimonial-modal .ant-form-item-label > label {
          font-weight: 600;
        }
        .testimonial-modal .ant-form-item-explain-error {
          font-size: 0.75rem;
          margin-top: 0.25rem;
          color: #ef4444;
        }
        .testimonial-modal .ant-input:hover, 
        .testimonial-modal .ant-input:focus,
        .testimonial-modal .ant-input-affix-wrapper:hover,
        .testimonial-modal .ant-input-affix-wrapper:focus,
        .testimonial-modal .ant-input-affix-wrapper-focused {
          border-color: #c5b173;
        }
        .testimonial-modal .ant-input-affix-wrapper:focus,
        .testimonial-modal .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 2px rgba(197, 177, 115, 0.2);
        }
        .testimonial-modal .ant-btn-primary:hover {
          background: #b5a163 !important;
          border-color: #b5a163 !important;
        }
      `}</style>
    </section>
  )
}

export default TestimonialCarousel