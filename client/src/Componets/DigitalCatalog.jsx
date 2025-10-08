import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  BookOpen, Download, ChevronLeft, ChevronRight, 
  X, Maximize2, Minimize2, ZoomIn, ZoomOut,
  FileText, Loader
} from 'lucide-react';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const BRAND_COLOR = '#c5b173';
const PDF_URL = '/downloads/dnt.pdf';

const DigitalCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);
  const catalogRef = useRef(null);

  // Debug on mount
  useEffect(() => {
    console.log('📚 DigitalCatalog mounted');
    console.log('PDF URL:', PDF_URL);
    console.log('Worker URL:', pdfjs.GlobalWorkerOptions.workerSrc);
  }, []);

  const totalPages = numPages || 0;

  const nextPage = () => {
    if (currentPage < totalPages - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const handleZoomIn = () => zoom < 2 && setZoom(zoom + 0.25);
  const handleZoomOut = () => zoom > 0.5 && setZoom(zoom - 0.25);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = 'Shashvat-Catalog-2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('✅ PDF loaded successfully! Pages:', numPages);
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('❌ PDF loading error:', error);
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      url: PDF_URL,
      worker: pdfjs.GlobalWorkerOptions.workerSrc
    });
    setPdfError('Unable to load catalog. Please try downloading instead.');
    setPdfLoading(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowRight':
          nextPage();
          break;
        case 'ArrowLeft':
          prevPage();
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentPage, totalPages]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span 
            className="inline-block px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border-2 bg-white mb-4"
            style={{ color: BRAND_COLOR, borderColor: BRAND_COLOR }}
          >
            Digital Catalog
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Browse Our Product Catalog
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our comprehensive collection of premium brass products
          </p>
        </motion.div>

        {/* Catalog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Cover */}
            <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, ${BRAND_COLOR} 0px, ${BRAND_COLOR} 1px, transparent 1px, transparent 20px)`
                }}
              />

              <div className="relative z-10 text-center p-8">
                <div 
                  className="w-24 h-24 mx-auto mb-6 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                >
                  <BookOpen className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-4xl font-bold text-white mb-3">
                  Product Catalog 2025
                </h3>

                <p className="text-gray-300 text-lg mb-6">
                  Premium Brass Fittings & Accessories
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 rounded-lg font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    Open Catalog
                  </button>

                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>

                {pdfLoading && (
                  <p className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Loading catalog...
                  </p>
                )}
                {pdfError && (
                  <p className="mt-4 text-sm text-red-400">{pdfError}</p>
                )}
                {!pdfLoading && !pdfError && (
                  <p className="mt-4 text-sm text-gray-400">
                    {totalPages} Pages • Ready to View
                  </p>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${BRAND_COLOR}20` }}
                >
                  <FileText className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">500+ Products</h4>
                  <p className="text-sm text-gray-600">Comprehensive range</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${BRAND_COLOR}20` }}
                >
                  <BookOpen className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Interactive View</h4>
                  <p className="text-sm text-gray-600">Flip-book experience</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flipbook Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-white">
                  <h3 className="font-bold">Product Catalog 2025</h3>
                  <p className="text-sm text-gray-400">
                    Page {currentPage + 1}-{Math.min(currentPage + 2, totalPages)} of {totalPages}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 flex items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden md:inline">Download</span>
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-red-500/80 text-white transition-all"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pages Container */}
            <div 
              ref={catalogRef}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            >
              {/* Hidden Document for page counting */}
              <div className="hidden">
                <Document
                  file={PDF_URL}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                >
                  <Page pageNumber={1} width={1} />
                </Document>
              </div>

              {pdfLoading ? (
                <div className="text-white text-center">
                  <Loader className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: BRAND_COLOR }} />
                  <p className="text-lg">Loading catalog...</p>
                </div>
              ) : pdfError ? (
                <div className="text-white text-center">
                  <p className="text-lg mb-4">{pdfError}</p>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 rounded-lg font-semibold transition-all"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                  >
                    Download PDF Instead
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center justify-center gap-4">
                  {/* Left Page */}
                  {currentPage < totalPages && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`left-${currentPage}`}
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="relative w-[45%] md:w-[400px] lg:w-[500px] h-[60vh] md:h-[70vh] bg-white rounded-lg shadow-2xl overflow-hidden"
                      >
                        <Document file={PDF_URL}>
                          <Page
                            pageNumber={currentPage + 1}
                            width={500}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            loading={
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <Loader className="w-6 h-6 animate-spin" style={{ color: BRAND_COLOR }} />
                              </div>
                            }
                          />
                        </Document>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Right Page */}
                  {currentPage + 1 < totalPages && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`right-${currentPage + 1}`}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="relative w-[45%] md:w-[400px] lg:w-[500px] h-[60vh] md:h-[70vh] bg-white rounded-lg shadow-2xl overflow-hidden"
                      >
                        <Document file={PDF_URL}>
                          <Page
                            pageNumber={currentPage + 2}
                            width={500}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            loading={
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <Loader className="w-6 h-6 animate-spin" style={{ color: BRAND_COLOR }} />
                              </div>
                            }
                          />
                        </Document>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {!pdfLoading && !pdfError && (
                <>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-xl z-20"
                    style={{ color: BRAND_COLOR }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>

                  <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages - 2}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-xl z-20"
                    style={{ color: BRAND_COLOR }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Progress */}
            {!pdfLoading && !pdfError && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
                <div className="max-w-7xl mx-auto">
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${BRAND_COLOR}, #d4a574)`,
                        width: `${((currentPage + 2) / totalPages) * 100}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentPage + 2) / totalPages) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="text-center text-gray-400 text-sm hidden md:block">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg mr-3">
                      <kbd className="text-white">←</kbd> Previous
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg mr-3">
                      <kbd className="text-white">→</kbd> Next
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg mr-3">
                      <kbd className="text-white">ESC</kbd> Close
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                      <kbd className="text-white">F</kbd> Fullscreen
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DigitalCatalog;
