"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRecoilState } from "recoil"
import { productAtom } from "../../Atoms/productsAtom"
import { allCategoriesAtom } from "../../Atoms/categories"
import { allProduct } from "../../backend/manageProduct"
import { fetchCategories } from "../../backend/init"
import { backendUrl } from "../../globle"
import CreateProduct from "../../Componets/admin/CreateProduct"
import UpdateProduct from "../../Componets/admin/UpdateProduct"
import DeleteProduct from "../../Componets/admin/DeleteProduct"
import ManageCategories from "../../Componets/admin/ManageCategories"

const ManageProducts = () => {
  const [selectedTab, setSelectedTab] = useState("create")
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useRecoilState(productAtom)
  const [categories, setCategories] = useRecoilState(allCategoriesAtom)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    scrollToTop()
    
    // Load products and categories if not already loaded
    const initializeData = async () => {
      try {
        if (products === null) {
          const fetchedProducts = await allProduct()
          setProducts(fetchedProducts)
        }
        if (categories.length === 0) {
          await fetchCategories(setCategories, `${backendUrl}/categories/all`)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeData()
  }, [])

  const BRAND_COLOR = '#c5b173'

  const tabs = [
    {
      id: "create",
      label: "Create Product",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
    {
      id: "update",
      label: "Update Product",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
    {
      id: "delete",
      label: "Delete Product",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
    {
      id: "categories",
      label: "Manage Categories",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="relative inline-block w-full">
            <div className="absolute inset-0 rounded-xl md:rounded-2xl blur-2xl opacity-30" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}></div>
            <div className="relative bg-gradient-to-r from-white to-gray-50 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border-2 shadow-xl" style={{ borderColor: BRAND_COLOR }}>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}>
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight truncate">Product Management</h1>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 hidden sm:block">Create, update, and manage your product catalog</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border-2 border-gray-100 p-2 sm:p-3 mb-4 md:mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`
                  relative px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-3.5 rounded-lg md:rounded-xl font-semibold text-xs sm:text-sm
                  transition-all duration-300 ease-out
                  flex items-center gap-2 md:gap-3 shadow-md whitespace-nowrap
                  ${selectedTab === tab.id ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"}
                `}
                style={selectedTab === tab.id ? { background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` } : {}}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg md:rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div layout className="bg-white rounded-xl md:rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 sm:p-8 md:p-12 space-y-4 md:space-y-6"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl animate-pulse" style={{ backgroundColor: `${BRAND_COLOR}40` }}></div>
                  <div className="flex-1 space-y-2 md:space-y-3">
                    <div className="h-6 md:h-8 rounded-lg animate-pulse w-1/3 md:w-1/4" style={{ backgroundColor: `${BRAND_COLOR}40` }}></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded-lg animate-pulse w-1/2 md:w-1/3"></div>
                  </div>
                </div>
                <div className="h-24 md:h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="h-20 md:h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                  <div className="h-20 md:h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
                className="p-4 sm:p-6 md:p-8"
              >
                {selectedTab === "create" && <CreateProduct />}
                {selectedTab === "update" && <UpdateProduct />}
                {selectedTab === "delete" && <DeleteProduct />}
                {selectedTab === "categories" && <ManageCategories />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ManageProducts