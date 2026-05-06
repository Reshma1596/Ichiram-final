const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { items, totalItems, subtotal } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const normalizedItems = items.map((item) => ({
      id: item.id,
      nameKey: item.nameKey,
      descriptionKey: item.descriptionKey || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image || "",
      foodType: item.foodType || "",
    }));

    const order = new Order({
      items: normalizedItems,
      totalItems: Number(totalItems) || normalizedItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: Number(subtotal) || normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

module.exports = router;