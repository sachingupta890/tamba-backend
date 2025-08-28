import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["copper", "steel", "plastic", "customized"],
      required: true,
    },
    images: [String], // image URLs or file paths
    stock: { type: Number, default: 0 },
    customizable: { type: Boolean, default: false },
    customFields: {
      engraving: { type: Boolean, default: false },
      colorOptions: [String],
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
