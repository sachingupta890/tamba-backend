import Product from "../models/product.js";
import User from "../models/user.js";
import Lead from "../models/lead.js"

/**
 * Fetches aggregated statistics for the admin dashboard.
 */
export const getDashboardStats = async () => {
  try {
    // Total counts ko ek saath fetch karein
    const [totalProducts, totalUsers, totalLeads] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Lead.countDocuments({ status: "New" }), // Sirf "New" status waali leads count karein
    ]);

    // Category ke hisaab se products count karein
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
    ]);

    return {
      totalProducts,
      totalUsers,
      totalLeads, // Naya count return karein
      productsByCategory,
    };
  } catch (error) {
    console.error("Error in getDashboardStats service:", error);
    throw new Error("Error fetching dashboard statistics.");
  }
};

