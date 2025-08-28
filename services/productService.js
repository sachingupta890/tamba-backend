import Product from "../models/product.js";

export const createProduct = async (productData) => {
  try {
    // Create a new product instance based on the provided data
    const product = new Product(productData);

    // Save the new product to the database
    await product.save();

    // Return the saved product
    return product;
  } catch (error) {
    // If an error occurs during the database operation, log it for debugging
    console.error("Error in createProduct service:", error);

    // Re-throw the error so it can be caught by the controller's error handler
    // This ensures the client receives a proper error response.
    throw new Error("Error creating product in the database.");
  }
};


export const getAllProducts = async () => {
  try {
    // Find all products and sort them by the newest first
    const products = await Product.find({}).sort({ createdAt: -1 });
    return products;
  } catch (error) {
    console.error("Error in getAllProducts service:", error);
    throw new Error("Error fetching products from the database.");
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  } catch (error) {
    console.error("Error in getProductById service:", error);
    throw new Error("Error fetching product from the database.");
  }
};

// --- NEW FUNCTION to update a product ---
export const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );
    if (!updatedProduct) {
      throw new Error("Product not found.");
    }
    return updatedProduct;
  } catch (error) {
    console.error("Error in updateProduct service:", error);
    throw new Error("Error updating product in the database.");
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error("Product not found.");
    }
    return deletedProduct; // Return the deleted document
  } catch (error) {
    console.error("Error in deleteProduct service:", error);
    throw new Error("Error deleting product in the database.");
  }
};

export const getPublicProductsService = async (filters = {}) => {
  try {
    let query = {};

    // Category filter
    if (filters.category && filters.category !== "all") {
      query.category = filters.category;
    }

    // Stock filter
    if (filters.inStock === "true") {
      query.stock = { $gt: 0 }; // Only products with stock greater than 0
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return products;
  } catch (error) {
    console.error("Error in getPublicProducts service:", error);
    throw new Error("Error fetching public products from the database.");
  }
};