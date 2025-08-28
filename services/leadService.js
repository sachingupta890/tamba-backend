import Lead from "../models/lead.js";

export const getRecentLeads = async () => {
  try {
    const recentLeads = await Lead.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5) // Get only the top 5
      .populate("productId", "name"); // Fetch the name from the referenced Product model

    return recentLeads;
  } catch (error) {
    console.error("Error in getRecentLeads service:", error);
    throw new Error("Error fetching recent leads from the database.");
  }
};

export const createLead = async (leadData) => {
  try {
    const newLead = new Lead(leadData);
    await newLead.save();
    return newLead;
  } catch (error) {
    console.error("Error in createLead service:", error);
    throw new Error("Error creating lead in the database.");
  }
};

export const getAllLeads = async () => {
  try {
    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .populate("productId", "name")
      .populate("userId", "name email"); // Also get user details
    return leads;
  } catch (error) {
    throw new Error("Error fetching all leads.");
  }
};

/**
 * Updates the status of a specific lead.
 */
export const updateLeadStatus = async (leadId, status) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true }
    );
    if (!lead) {
      throw new Error("Lead not found.");
    }
    return lead;
  } catch (error) {
    throw new Error("Error updating lead status.");
  }
};


export const getLeadsByUser = async (userId) => {
  try {
    const leads = await Lead.find({ userId })
      .sort({ createdAt: -1 })
      .populate("productId", "name images"); // Get product name and images
    return leads;
  } catch (error) {
    console.error("Error in getLeadsByUser service:", error);
    throw new Error("Error fetching user's leads.");
  }
};
