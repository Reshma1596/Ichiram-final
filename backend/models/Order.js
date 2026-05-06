const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, default: "Guest", trim: true },
    phone: { type: String, default: "", trim: true },
    tableNumber: { type: String, default: "", trim: true },
    diningType: { type: String, default: "", trim: true },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Order must contain at least one item",
      },
    },

    totalItems: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, default: 0, min: 0 },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card"],
      default: "cash",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["confirmed", "Preparing", "Ready", "Served"],
      default: "confirmed",
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);