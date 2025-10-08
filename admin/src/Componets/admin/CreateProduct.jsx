"use client"

import { useState, useEffect } from "react"
import { addProduct, allProduct } from "../../backend/manageProduct"
import { useRecoilState, useRecoilValue } from "recoil"
import { productAtom } from "../../Atoms/productsAtom"
import { loadingAtom } from "../../Atoms/loadingAtom"
import { allCategoriesAtom } from "../../Atoms/categories" // Import the categories atom
import Loading from "../Loading"
import { Package, Upload, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "react-toastify"

const CreateProduct = () => {
  const BRAND_COLOR = '#c5b173'
  
  const [product, setProduct] = useState({
    img: null, // file object
    name: "",
    moq: "",
    category: "",
    subCategory: "", // Added sub-category field
    size: "",
    material: "",
    shape: "",
    color: "",
    pattern: "",
    finish: "",
    weight: "",
    isPopular: false,
    latest: false,
  })

  const [previewUrl, setPreviewUrl] = useState("")
  const [Products, setProducts] = useRecoilState(productAtom)
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)
  const categories = useRecoilValue(allCategoriesAtom) // Get categories from atom
  const [dragActive, setDragActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [availableSubCategories, setAvailableSubCategories] = useState([])

  const steps = [
    { title: "Image Upload", component: ImageUploadStep },
    { title: "Basic Information", component: BasicInfoStep },
    { title: "Product Details", component: ProductDetailsStep },
    { title: "Product Status", component: ProductStatusStep },
  ]

  // Update sub-categories when category changes
  useEffect(() => {
    if (product.category && categories.length > 0) {
      const selectedCategory = categories.find(cat => 
        cat.name === product.category || 
        cat._id === product.category ||
        cat.id === product.category
      )
      
      if (selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0) {

        
        setAvailableSubCategories(selectedCategory.subcategories)
      } else {
        setAvailableSubCategories([])
      }
      
      // Reset sub-category when category changes
      setProduct(prev => ({ ...prev, subCategory: "" }))
    } else {
      setAvailableSubCategories([])
      setProduct(prev => ({ ...prev, subCategory: "" }))
    }
  }, [product.category, categories])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const setAllProduct = async () => {
    setProducts(await allProduct())
  }

  const resetForm = () => {
    setProduct({
      img: null,
      name: "",
      moq: "",
      category: "",
      subCategory: "",
      size: "",
      material: "",
      shape: "",
      color: "",
      pattern: "",
      finish: "",
      weight: "",
      isPopular: false,
      latest: false,
    })
    setPreviewUrl("")
    setCurrentStep(0)
    setAvailableSubCategories([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const requiredFields = ["img", "name", "moq", "category", "size"]
    for (const field of requiredFields) {
      if (!product[field]) {
        toast.error(`Please fill all required fields (${field})`)
        setIsLoading(false)
        return
      }
    }

    try {
      const formData = new FormData()
      formData.append("image", product.img)
      formData.append("name", product.name)
      formData.append("category", product.category)
      
      // Only append subcategory if it exists and has a value
      if (product.subCategory && product.subCategory.trim() !== "") {
        formData.append("subCategory", product.subCategory)
        console.log("Subcategory added:", product.subCategory);
        
      }
      
      formData.append("isPopular", product.isPopular)
      formData.append("latest", product.latest)
      formData.append("material", product.material)
      formData.append("moq", product.moq)
      formData.append("size", product.size)
      formData.append("shape", product.shape)
      formData.append("color", product.color)
      formData.append("pattern", product.pattern)
      formData.append("finish", product.finish)
      formData.append("weight", product.weight)

      await addProduct(formData)
      await setAllProduct()
      resetForm()
      toast.success("Product added successfully!")
    } catch (error) {
      toast.error("Failed to add product. Please try again.")
    }

    setIsLoading(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="relative inline-block w-full">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}></div>
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 shadow-lg" style={{ borderColor: `${BRAND_COLOR}60` }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                <Package className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Create New Product</h1>
                <p className="text-gray-600 mt-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}></span>
                  Add detailed specifications to your product catalog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}

      {/* Progress Stepper */}
      <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                        index <= currentStep ? "text-white scale-110" : "text-gray-500 bg-gray-200 scale-100"
                      }`}
                      style={index <= currentStep ? { background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` } : {}}
                    >
                      {index < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`mt-3 text-xs font-semibold text-center max-w-[120px] ${
                      index <= currentStep ? "" : "text-gray-500"
                    }`} style={index <= currentStep ? { color: BRAND_COLOR } : {}}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: index < currentStep ? "100%" : "0%",
                          background: `linear-gradient(90deg, ${BRAND_COLOR}, #d4a574)`
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {steps[currentStep].component({
          product,
          handleChange,
          handleImageChange,
          handleDrag,
          handleDrop,
          previewUrl,
          setPreviewUrl,
          setProduct,
          dragActive,
          categories, // Pass categories to components
          availableSubCategories, // Pass available sub-categories
        })}

        <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-100">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Step
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ml-auto"
              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
            >
              Continue to Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ml-auto"
              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
            >
              <Check className="w-5 h-5" />
              Create Product
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const ImageUploadStep = ({ product, handleDrag, handleDrop, previewUrl, setPreviewUrl, setProduct, dragActive }) => {
  const BRAND_COLOR = '#c5b173'
  
  return (
    <div className="relative">
      <div
        className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? "border-opacity-100 scale-105 shadow-2xl" 
            : "border-gray-300 hover:border-opacity-60"
        }`}
        style={dragActive ? { borderColor: BRAND_COLOR, backgroundColor: `${BRAND_COLOR}10` } : {}}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}></div>
            <img 
              src={previewUrl || "/placeholder.svg"} 
              alt="Preview" 
              className="max-h-80 mx-auto rounded-2xl shadow-2xl border-4 border-white ring-2 relative z-10 transition-transform duration-300 group-hover:scale-105" 
              style={{ ringColor: BRAND_COLOR }}
            />
            <button
              type="button"
              onClick={() => {
                setPreviewUrl("")
                setProduct((prev) => ({ ...prev, img: null }))
              }}
              className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-lg z-20 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-6 text-center">
              <p className="text-sm font-semibold" style={{ color: BRAND_COLOR }}>✓ Image uploaded successfully!</p>
              <p className="text-xs text-gray-500 mt-1">Click the X button to change image</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}10)` }}>
              <Upload className="w-12 h-12" style={{ color: BRAND_COLOR }} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Upload Product Image</h3>
            <p className="text-gray-600 mb-2">Drag and drop your product image here</p>
            <p className="text-sm text-gray-500 mb-6">or click the button below to browse</p>
            <label className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
              <Upload className="w-5 h-5" />
              Browse Files
              <input
                type="file"
                name="img"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      img: file,
                    }))
                    setPreviewUrl(URL.createObjectURL(file))
                  }
                }}
                className="hidden"
                accept="image/*"
              />
            </label>
            <p className="text-xs text-gray-400 mt-4">Supported formats: JPG, PNG, WebP (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  )
}

const BasicInfoStep = ({ product, handleChange, categories, availableSubCategories }) => {
  const BRAND_COLOR = '#c5b173'
  const shouldShowSubCategory = product.category && availableSubCategories && availableSubCategories.length > 0;
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: `${BRAND_COLOR}40` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-opacity-100 focus:outline-none transition-all duration-300 font-medium"
            style={{ focusBorderColor: BRAND_COLOR }}
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="Enter descriptive product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            MOQ (Minimum Order Quantity) *
          </label>
          <input
            type="text"
            name="moq"
            value={product.moq}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., 100 pieces"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium bg-white"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          >
            <option value="">-- Select Category --</option>
            {
              categories.map((category) => (
                <option key={category._id || category.id} value={category._id || category.name}>
                  {category.name}
                </option>
              ))
           }
          </select>
        </div>

        {shouldShowSubCategory && (
          <div className="transition-all duration-300 ease-in-out md:col-span-2 animate-slideDown">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Sub Category
              <span className="text-xs font-semibold ml-2 px-2 py-1 rounded-lg" style={{ backgroundColor: `${BRAND_COLOR}20`, color: BRAND_COLOR }}>
                {availableSubCategories.length} available
              </span>
            </label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium bg-white"
              onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="">-- Select Sub Category --</option>
              {availableSubCategories.map((subCategory, index) => (
                <option 
                  key={index} 
                  value={subCategory.name || subCategory._id || subCategory}
                >
                  {subCategory.name || subCategory}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={shouldShowSubCategory ? "" : "md:col-span-2"}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Size / Dimensions *
          </label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., 10 x 5 x 2 cm"
            required
          />
        </div>
      </div>

      {product.category && (!availableSubCategories || availableSubCategories.length === 0) && (
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700 font-medium">
            No subcategories available for the selected category. The product will be created without a subcategory.
          </p>
        </div>
      )}
    </div>
  )
}

const ProductDetailsStep = ({ product, handleChange }) => {
  const BRAND_COLOR = '#c5b173'
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: `${BRAND_COLOR}40` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Specifications</h2>
          <p className="text-sm text-gray-500 mt-0.5">Optional details for better product description</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Material
          </label>
          <input
            type="text"
            name="material"
            value={product.material}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., Stainless Steel, Brass"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Shape
          </label>
          <input
            type="text"
            name="shape"
            value={product.shape}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., Round, Square, Rectangular"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343" />
            </svg>
            Color
          </label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., Golden, Silver, Custom"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Pattern
          </label>
          <input
            type="text"
            name="pattern"
            value={product.pattern}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., Plain, Embossed, Textured"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Finish
          </label>
          <input
            type="text"
            name="finish"
            value={product.finish}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., Polished, Matte, Satin"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Weight
          </label>
          <input
            type="text"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
            onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            placeholder="e.g., 250 grams, 1 kg"
          />
        </div>
      </div>
    </div>
  )
}

const ProductStatusStep = ({ product, handleChange }) => {
  const BRAND_COLOR = '#c5b173'
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: `${BRAND_COLOR}40` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Visibility</h2>
          <p className="text-sm text-gray-500 mt-0.5">Control where this product appears on your website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Product Toggle */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg" 
          style={{ borderColor: product.isPopular ? BRAND_COLOR : '#e5e7eb' }}
        >
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                name="isPopular"
                checked={product.isPopular}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-14 h-8 rounded-full transition-all duration-300 ${
                product.isPopular ? "" : "bg-gray-300"
              }`}
                style={product.isPopular ? { background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` } : {}}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  product.isPopular ? "transform translate-x-6" : ""
                }`}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5" style={{ color: product.isPopular ? BRAND_COLOR : '#9ca3af' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-bold text-gray-900">Popular Product</span>
              </div>
              <p className="text-sm text-gray-600">Display in the popular products carousel on homepage</p>
              {product.isPopular && (
                <div className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1" style={{ backgroundColor: `${BRAND_COLOR}20`, color: BRAND_COLOR }}>
                  <Check className="w-3 h-3" />
                  Active
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Latest Product Toggle */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg"
          style={{ borderColor: product.latest ? BRAND_COLOR : '#e5e7eb' }}
        >
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                name="latest"
                checked={product.latest}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-14 h-8 rounded-full transition-all duration-300 ${
                product.latest ? "" : "bg-gray-300"
              }`}
                style={product.latest ? { background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` } : {}}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  product.latest ? "transform translate-x-6" : ""
                }`}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5" style={{ color: product.latest ? BRAND_COLOR : '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-gray-900">Latest Product</span>
              </div>
              <p className="text-sm text-gray-600">Show in the latest products section on homepage</p>
              {product.latest && (
                <div className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1" style={{ backgroundColor: `${BRAND_COLOR}20`, color: BRAND_COLOR }}>
                  <Check className="w-3 h-3" />
                  Active
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Summary Info */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-1">Product Visibility Summary:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {product.isPopular ? "Will appear" : "Will not appear"} in Popular Products section</li>
              <li>• {product.latest ? "Will appear" : "Will not appear"} in Latest Products section</li>
              <li>• Product will always appear in its category page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct