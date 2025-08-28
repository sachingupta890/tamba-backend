import User from "../models/user.js";

// /**
//  * Adds or removes a product from a user's wishlist.
//  * @param {string} userId - The ID of the user.
//  * @param {string} productId - The ID of the product.
//  * @returns {Promise<object>} A promise that resolves to the updated user object.
//  */
export const toggleWishlistItem = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    // Check if the product is already in the wishlist
    const productIndex = user.wishlist.indexOf(productId);

    if (productIndex > -1) {
      // If it exists, remove it
      user.wishlist.splice(productIndex, 1);
    } else {
      // If it doesn't exist, add it
      user.wishlist.push(productId);
    }

    await user.save();
    return user;
  } catch (error) {
    console.error("Error in toggleWishlistItem service:", error);
    throw new Error("Error updating wishlist.");
  }
};

export const getWishlist = async (userId) => {
  try {
    const user = await User.findById(userId).populate("wishlist"); // Populate with full product details
    if (!user) {
      throw new Error("User not found.");
    }
    return user.wishlist;
  } catch (error) {
    console.error("Error in getWishlist service:", error);
    throw new Error("Error fetching wishlist.");
  }
};
