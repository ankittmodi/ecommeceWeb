import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },

  products: [
    {
      productId: { type: String },
      productTitle: { type: String },
      quantity: { type: Number },
      price: { type: Number },
      image: { type: String },
      subTotal: { type: Number }
    }
  ],

  orderId: {
    type: String,
    required: [true, "Provide orderId"],
    unique: true
  },

  paymentId: {
    type: String,
    default: ""
  },

  payment_status: {
    type: String,
    default: "Pending"
  },

  order_status: {
    type: String,
    default: "Pending"
  },

  delivery_address: {
    type: mongoose.Schema.ObjectId,
    ref: 'address'
  },

  totalAmt: {
    type: Number,
    default: 0
  },

}, { timestamps: true });

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
