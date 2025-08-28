import { getDashboardStats } from "../services/dashboardService.js";

export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching stats",
        error: error.message,
      });
  }
};
