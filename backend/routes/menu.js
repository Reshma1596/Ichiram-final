var express = require("express");
var router = express.Router();
var Menu = require("../models/Menu");

router.get("/", async function (req, res) {
  try {
    var items = await Menu.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
});

router.post("/", async function (req, res) {
  try {
    var { name, description, price, image, category, foodType, isBestseller } =
      req.body;

    if (!name || price === undefined || price === null || price === "") {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    var newItem = new Menu({
      name: name.trim(),
      description: description?.trim() || "",
      price: Number(price),
      image: image?.trim() || "",
      category: category?.trim() || "Uncategorized",
      foodType: foodType?.trim() || "",
      isBestseller: Boolean(isBestseller),
    });

    var savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add menu item",
      error: error.message,
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    var { name, description, price, image, category, foodType, isBestseller } =
      req.body;

    if (!name || price === undefined || price === null || price === "") {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    var updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description?.trim() || "",
        price: Number(price),
        image: image?.trim() || "",
        category: category?.trim() || "Uncategorized",
        foodType: foodType?.trim() || "",
        isBestseller: Boolean(isBestseller),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update menu item",
      error: error.message,
    });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    var deletedItem = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.json({
      message: "Menu item deleted successfully",
      id: deletedItem.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
});

module.exports = router;