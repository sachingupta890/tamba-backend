import { createLead, getAllLeads, getLeadsByUser, getRecentLeads, updateLeadStatus } from "../services/leadService.js";
import User from "../models/user.js"
import logger from "../config/logger.js";
import { createNotification } from "../services/notificationService.js";

/**
 * Controller to handle fetching recent leads.
 */
export const getRecent = async (req, res) => {
  try {
    const leads = await getRecentLeads();
    res.status(200).json(leads);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching recent leads",
        error: error.message,
      });
  }
};


export const createNewLead = async (req, res) => {
  try {
    const { productId, quantity, color, engravingText } = req.body;

    // Ab humein token manually check karne ki zaroorat nahi hai.
    // 'protect' middleware se humein req.user mil jayega.
    const userId = req.user._id;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required." });
    }

    const leadData = {
      productId,
      quantity,
      userId, // userId hamesha available hoga
      customization: {
        color,
        engravingText,
        uploadedImageUrl: req.file ? req.file.path : null,
      },
    };

    const newLead = await createLead(leadData);

    res.status(201).json({
      message: "Your request has been submitted successfully!",
      lead: newLead,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while creating lead",
        error: error.message,
      });
  }
};

export const getAllLeadsAdmin = async (req, res) => {
  try {
    const leads = await getAllLeads();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller for admin to update lead status.
 */
export const updateStatus = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status } = req.body;

    // ... (status check)

    const updatedLead = await updateLeadStatus(leadId, status);
    logger.info(`Successfully updated status for leadId: ${leadId}`);

    // --- NOTIFICATION LOGIC ---
    if (updatedLead.userId) {
      const message = `Your request #${updatedLead.leadId} has been updated to "${status}".`;

      // Step 1: Hamesha notification ko database mein save karein
      await createNotification(updatedLead.userId, message);

      // Step 2: Check karein ki user online hai ya nahi
      if (req.onlineUsers && req.onlineUsers[updatedLead.userId.toString()]) {
        const recipientSocketId =
          req.onlineUsers[updatedLead.userId.toString()];
        logger.info(
          `Emitting real-time notification to user: ${updatedLead.userId}`
        );
        req.io.to(recipientSocketId).emit("notification", { message });
      } else {
        logger.warn(
          `User ${updatedLead.userId} is offline. Notification saved to DB.`
        );
      }
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    // ... (error logging)
  }
};



export const getUserLeads = async (req, res) => {
  try {
    // req.user._id comes from the 'protect' middleware
    const leads = await getLeadsByUser(req.user._id);
    res.status(200).json(leads);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching user leads",
        error: error.message,
      });
  }
};
