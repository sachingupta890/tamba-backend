import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalLeads: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  topProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      leadsCount: { type: Number, default: 0 },
    },
  ],
  contactBreakdown: {
    whatsapp: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    phone: { type: Number, default: 0 },
    form: { type: Number, default: 0 },
  },
});

export default mongoose.model("Analytics", analyticsSchema);
