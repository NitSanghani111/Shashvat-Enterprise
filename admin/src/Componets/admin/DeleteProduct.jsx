import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { allProduct, deleteProduct } from "../../backend/manageProduct";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";
import { Trash2, AlertTriangle, X, Package, Search } from "lucide-react";

const DeleteProduct = () => {
  const BRAND_COLOR = '#c5b173';
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [Products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const dialogRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      return;
    }
    dialogRef.current.showModal();
  };

  const setAllProduct = async () => {
    setProducts(await allProduct());
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    
    const selectedProduct = Products.find((product) => product.id === selectedProductId)
    const selectedProductImg = selectedProduct.img;
    await deleteProduct(selectedProductId, selectedProductImg)
    await setAllProduct()
    setSelectedProductId(null);
    setSearchTerm("");
    setIsLoading(false)
    dialogRef.current.close();
  };

  const cancelDelete = () => {
    dialogRef.current.close();
  };

  const selectedProduct = Products?.find((product) => product.id === selectedProductId);
  
  const filteredProducts = Products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      {isLoading && <Loading />}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="relative inline-block w-full">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, #d4a574)` }}></div>
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 shadow-lg" style={{ borderColor: `${BRAND_COLOR}60` }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-red-100 shadow-lg">
                  <Trash2 className="w-7 h-7 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Delete Product</h2>
                  <p className="text-gray-600 mt-1.5 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Permanently remove a product from your catalog
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-100 space-y-6">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Search Product</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium"
                onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Search by product name..."
              />
            </div>
          </div>

          {/* Product Selector */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: BRAND_COLOR }} />
              Select Product to Delete
            </label>
            <select
              name="category" 
              value={selectedProductId || ""}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
              }}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 font-medium bg-white"
              onFocus={(e) => e.target.style.borderColor = BRAND_COLOR}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            >
              <option value="">-- Select a product to delete --</option>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.category}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {searchTerm ? "No products match your search" : "No products available"}
                </option>
              )}
            </select>
            {filteredProducts.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">{filteredProducts.length} product(s) available</p>
            )}
          </div>

          {/* Selected Product Preview */}
          {selectedProduct && (
            <div className="bg-white rounded-xl p-5 border-2 border-red-200 animate-slideDown">
              <div className="flex items-center gap-4">
                {selectedProduct.img && (
                  <img 
                    src={selectedProduct.img} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-contain rounded-lg border-2 border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600">Category: {selectedProduct.category}</p>
                  {selectedProduct.moq && <p className="text-sm text-gray-600">MOQ: {selectedProduct.moq}</p>}
                </div>
                <div className="text-red-600">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
            </div>
          )}

          {/* Warning Message */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900 mb-1">Warning: This action cannot be undone!</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• The product will be permanently removed from your catalog</li>
                  <li>• All product data including images will be deleted</li>
                  <li>• This product will no longer appear on your website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedProductId}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-500 text-white rounded-xl font-bold transition-all duration-300 hover:bg-red-600 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Trash2 className="w-5 h-5" />
            Delete Selected Product
          </button>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <dialog ref={dialogRef} className="rounded-2xl p-0 shadow-2xl backdrop:bg-black backdrop:bg-opacity-50 border-0 max-w-md w-full">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Dialog Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Confirm Deletion</h3>
              </div>
            </div>
          </div>

          {/* Dialog Content */}
          <div className="p-6">
            {selectedProduct && (
              <div className="mb-6 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-2">You are about to delete:</p>
                <div className="flex items-center gap-3">
                  {selectedProduct.img && (
                    <img 
                      src={selectedProduct.img} 
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-contain rounded-lg border-2 border-gray-300"
                    />
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{selectedProduct.name}</p>
                    <p className="text-sm text-gray-600">{selectedProduct.category}</p>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-700 mb-4">Are you absolutely sure you want to delete this product? This action <strong>cannot be undone</strong>.</p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-700 font-semibold">⚠️ All product data will be permanently removed from your database.</p>
            </div>
          </div>

          {/* Dialog Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t-2 border-gray-100">
            <button
              onClick={cancelDelete}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete Product
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteProduct;
