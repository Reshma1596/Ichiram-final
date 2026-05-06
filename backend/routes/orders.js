const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// POST create order
router.post("/", async (req, res) => {
  try {
    const { items, totalItems, paymentMethod, paymentStatus, status } = req.body;

    const newOrder = new Order({
      items,
      totalItems,
      paymentMethod: paymentMethod || "cash",
      paymentStatus: paymentStatus || "pending",
      status: status || "confirmed",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// PUT update order status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

module.exports = router;