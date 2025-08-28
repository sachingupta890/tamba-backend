import { getWishlist, toggleWishlistItem } from "../services/wishlistService.js";

/**
 * Controller to handle toggling a product in the user's wishlist.
 */
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from the 'protect' middleware
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const updatedUser = await toggleWishlistItem(userId, productId);
    res.status(200).json({
      message: "Wishlist updated successfully!",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from the 'protect' middleware
    const wishlist = await getWishlist(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};