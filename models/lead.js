import mongoose from "mongoose";

// We need a separate counter model to generate auto-incrementing lead IDs
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 }, // Start counting from 1000
});
const Counter = mongoose.model("Counter", counterSchema);

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // Not required because a non-logged-in user can also submit a request
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    // This will store all customization details
    customization: {
      color: {
        type: String,
      },
      engravingText: {
        type: String,
      },
      uploadedImageUrl: {
        type: String, // URL from Cloudinary
      },
    },
    // To track the lead's journey
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Pre-save hook to generate the unique, user-friendly leadId
leadSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Find the counter document and increment it
      const counter = await Counter.findByIdAndUpdate(
        { _id: "leadId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Create if it doesn't exist
      );
      // Set the leadId before saving
      this.leadId = `TAMBA-${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model("Lead", leadSchema);
