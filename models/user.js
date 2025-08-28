
import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  label: String, // "Home", "Office"
  street: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    phone: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
