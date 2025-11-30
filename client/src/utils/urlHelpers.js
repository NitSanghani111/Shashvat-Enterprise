/**
 * Convert a string to URL-friendly slug format
 * Example: "Basin Taps" -> "basin-taps"
 */
export const createSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

/**
 * Generate SEO-friendly product URL
 * @param {Object} product - Product object with category, subCategory, and name
 * @returns {string} - SEO-friendly URL path
 */
export const generateProductUrl = (product) => {
  if (!product) return '/products';
  
  const category = createSlug(product.category);
  const subcategory = product.subCategory ? createSlug(product.subCategory) : null;
  const productName = createSlug(product.name);
  
  if (subcategory) {
    return `/product/${category}/${subcategory}/${productName}`;
  }
  return `/product/${category}/${productName}`;
};

/**
 * Generate old-style product URL (for backward compatibility)
 * @param {string} productId - Product ID
 * @returns {string} - Old-style URL path
 */
export const generateProductUrlById = (productId) => {
  return `/productdetail/${productId}`;
};

/**
 * Extract product info from URL params
 * @param {Object} params - URL parameters
 * @returns {Object} - Extracted product info
 */
export const extractProductInfoFromUrl = (params) => {
  // Check if it's the old URL pattern (has 'id' param)
  if (params.id) {
    return {
      type: 'id',
      id: params.id
    };
  }
  
  // New URL pattern (has category and productName)
  if (params.category && params.productName) {
    return {
      type: 'slug',
      category: params.category,
      subcategory: params.subcategory || null,
      productName: params.productName
    };
  }
  
  return null;
};
