import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number },
  avatar: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  last_login_date: { type: Date, default: null },
  status: { type: String, enum: ["Active","Inactive","Suspended"], default: "Active" },
  access_token: { type: String },
  refresh_token: { type: String },
  address_details: [{ type: mongoose.Schema.ObjectId, ref: "address" }],
  shopping_cart: [{ type: mongoose.Schema.ObjectId, ref: "cartProduct" }],
  orderHistory: [{ type: mongoose.Schema.ObjectId, ref: "order" }],
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  role: { type: String, enum: ["ADMIN","USER"], default: "USER" },
}, { timestamps: true });

const userModel=mongoose.model("user",userSchema);
export default userModel;
