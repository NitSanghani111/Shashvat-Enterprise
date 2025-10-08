import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.25_a9fdebb9.jpg?alt=media&token=3788136b-5328-41a1-bcf2-06db7f49d833',
    title: 'Precision-Engineered Components',
    description: 'High-quality brass parts for automotive, electronics, and industrial machinery.',
    category: 'Industrial Components',
    cta: { primary: 'Explore Products', secondary: 'Learn More' }
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.26_92957453.jpg?alt=media&token=fa0ee2f1-2e96-49c8-ad18-43c7cdf1ebfa',
    title: 'Premium Sanitary Solutions',
    description: 'Durable brass fittings designed for excellence in plumbing applications.',
    category: 'Plumbing Solutions',
    cta: { primary: 'View Collection', secondary: 'Contact Us' }
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp_Image_2024-06-22_at_00.04.04_365b4e8b-transformed.jpeg?alt=media&token=f0f4273c-4b1d-468f-a99f-0b36583007c0',
    title: 'Superior Hardware Parts',
    description: 'Engineered for strength and reliability in construction and industrial use.',
    category: 'Construction Hardware',
    cta: { primary: 'Get Started', secondary: 'Request Quote' }
  },
]

export default function EnhancedHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [imageLoaded, setImageLoaded] = useState({})
  const [autoplayProgress, setAutoplayProgress] = useState(0)
  const navigate = useNavigate()

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay(!isAutoplay)
    setAutoplayProgress(0)
  }, [isAutoplay])

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === activeIndex) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setAutoplayProgress(0)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [activeIndex, isTransitioning])

  // Enhanced touch handlers with drag support
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e) => {
    if (!touchStart) return
    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    const offset = currentTouch - touchStart
    setDragOffset(Math.max(-100, Math.min(100, offset / 3)))
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      setDragOffset(0)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 80
    const isRightSwipe = distance < -80

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
    
    setIsDragging(false)
    setDragOffset(0)
  }

  // Mouse drag support for desktop
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !touchStart) return
    const offset = e.clientX - touchStart 
    setDragOffset(Math.max(-100, Math.min(100, offset / 3)))
  }

  const handleMouseUp = (e) => {
    if (!isDragging || !touchStart) return
    const distance = touchStart - e.clientX
    const isLeftSwipe = distance > 80
    const isRightSwipe = distance < -80

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
  }

  // Image loading handler
  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  // Autoplay with progress
  useEffect(() => {
    if (!isAutoplay) return
    
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setAutoplayProgress(progress)
      
      if (progress >= 100) {
        handleNext()
        progress = 0
        setAutoplayProgress(0)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [handleNext, isAutoplay, activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') handlePrev()
      else if (event.key === 'ArrowRight') handleNext()
      else if (event.key === ' ') {
        event.preventDefault()
        toggleAutoplay()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, toggleAutoplay])

  // Mouse leave cleanup
  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false)
        setDragOffset(0)
        setTouchStart(null)
      }
    }
    
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, touchStart])

  return (
    <div className="relative w-full h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[85vh] min-h-[400px] max-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black select-none">
      {/* Slider Container */}
      <div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          const isPrev = index === (activeIndex - 1 + slides.length) % slides.length
          const isNext = index === (activeIndex + 1) % slides.length
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive 
                  ? 'opacity-100 scale-100 z-20' 
                  : isPrev || isNext
                    ? 'opacity-0 scale-95 z-10'
                    : 'opacity-0 scale-90 z-0'
              }`}
            >
              {/* Background Image */}
              <div className="w-full h-full relative overflow-hidden bg-gray-800">
                <div className={`w-full h-full transition-transform duration-[8s] ease-linear ${
                  isActive && !isDragging ? 'scale-110' : 'scale-100'
                }`}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(index)}
                  />
                  {!imageLoaded[index] && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-white px-4 sm:px-6 md:px-12">
                <div className={`text-center max-w-5xl transition-all duration-700 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
                  {/* Category Badge */}
                  <div className="inline-block bg-gradient-to-r from-[#c5b173] to-[#d4c490] text-black text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg">
                    {slide.category}
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
                      {slide.title}
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                    {slide.description}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <button 
                      onClick={() => navigate('/products')}
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-black bg-gradient-to-r from-[#c5b173] to-[#d4c490] rounded-full overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#c5b173]/50"
                    >
                      <span className="relative z-10">{slide.cta.primary}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d4c490] to-[#c5b173] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white border-2 border-white/30 backdrop-blur-sm rounded-full transform transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white focus:outline-none focus:ring-4 focus:ring-white/30"
                    >
                      <span>{slide.cta.secondary}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Navigation Arrows */}
      <div className="hidden lg:block">
        <button
          className="absolute left-6 xl:left-10 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 xl:p-5 transition-all duration-300 z-30 border border-white/20 group hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
          onClick={handlePrev}
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white h-6 w-6 xl:h-8 xl:w-8 group-hover:scale-110 transition-transform" />
        </button>
        <button
          className="absolute right-6 xl:right-10 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 xl:p-5 transition-all duration-300 z-30 border border-white/20 group hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
          onClick={handleNext}
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="text-white h-6 w-6 xl:h-8 xl:w-8 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Modern Bottom Controls */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        {/* Control Buttons - Mobile Only */}
        <div className="flex lg:hidden items-center gap-3 mb-6">
          <button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#c5b173]/50"
            onClick={handlePrev}
            disabled={isTransitioning}
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white h-5 w-5" />
          </button>
          
          <button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#c5b173]/50 relative overflow-hidden"
            onClick={toggleAutoplay}
            aria-label={isAutoplay ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoplay && (
              <div 
                className="absolute inset-0 bg-[#c5b173]/30 rounded-full transition-all duration-100"
                style={{ 
                  transform: `scale(${autoplayProgress / 100})`,
                  opacity: autoplayProgress / 100
                }}
              />
            )}
            {isAutoplay ? (
              <Pause className="text-white h-5 w-5 relative z-10" />
            ) : (
              <Play className="text-white h-5 w-5 relative z-10 ml-0.5" />
            )}
          </button>
          
          <button
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#c5b173]/50"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Next slide"
          >
            <ChevronRight className="text-white h-5 w-5" />
          </button>
        </div>

        {/* Modern Pagination Dots */}
        <div className="flex justify-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`relative transition-all duration-300 focus:outline-none group ${
                index === activeIndex 
                  ? 'w-10 sm:w-14 h-1.5' 
                  : 'w-1.5 h-1.5 hover:scale-150'
              }`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#c5b173]' 
                  : 'bg-white/40 group-hover:bg-white/70'
              }`} />
              {index === activeIndex && isAutoplay && (
                <div 
                  className="absolute inset-0 bg-[#d4c490] rounded-full transition-all duration-100 origin-left"
                  style={{ 
                    width: `${autoplayProgress}%`
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Slide counter */}
    

      {/* Keyboard shortcuts hint */}
    
    </div>
  )
}