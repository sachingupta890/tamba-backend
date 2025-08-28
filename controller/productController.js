import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getPublicProductsService,
  updateProduct,
} from "../services/productService.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      customizable,
      isFeatured,
    } = req.body;

    const images = req.files.map((file) => file.path);

    if (!name || !price || !category || images.length === 0) {
      return res.status(400).json({
        message: "Name, price, category, and at least one image are required",
      });
    }

    const newProduct = await createProduct({
      name,
      description,
      price,
      category,
      stock,
      customizable,
      isFeatured,
      images,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Product not found", error: error.message });
  }
};

// --- CONTROLLER FIX IS HERE ---
export const updateProductDetails = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      customizable,
      isFeatured,
    } = req.body;

    // When using upload.fields, req.files is an object.
    // Access the files array from the correct key, e.g., req.files.newImages
    const newImages =
      req.files && req.files.newImages
        ? req.files.newImages.map((file) => file.path)
        : [];

    let existingImages = [];
    if (req.body.images) {
      existingImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    const updatedProductData = {
      name,
      description,
      price,
      category,
      stock,
      customizable,
      isFeatured,
      images: [...existingImages, ...newImages],
    };

    const updatedProduct = await updateProduct(
      req.params.id,
      updatedProductData
    );
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProductDetails = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPublicProducts = async (req, res) => {
  try {
    const products = await getPublicProductsService(req.query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
