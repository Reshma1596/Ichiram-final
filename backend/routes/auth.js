var express = require("express");
var router = express.Router();
var Guest = require("../models/Guest");

router.get("/", function (req, res) {
  res.json({
    message: "Auth route working",
  });
});

router.post("/guest-login", async function (req, res) {
  try {
    const { name, phone, email, diningType, partySize, language } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and phone are required",
      });
    }
const nameRegex = /^[A-Za-z. ]{1,250}$/;
const phoneRegex = /^\d{10}$/;

if (!nameRegex.test(name.trim())) {
  return res.status(400).json({
    message: "Invalid name format",
  });
}

if (!phoneRegex.test(phone.trim())) {
  return res.status(400).json({
    message: "Invalid phone format",
  });
}

    const guest = new Guest({
      name,
      phone,
      email: email || "",
      diningType: diningType || "",
      partySize: partySize || "",
      language: language || "",
    });

    const savedGuest = await guest.save();

    res.status(201).json({
      message: "Guest saved successfully",
      guest: savedGuest,
    });
  } catch (error) {
    console.error("Guest save error:", error);
    res.status(500).json({
      message: "Server error while saving guest",
    });
  }
});

router.get("/guests", async function (req, res) {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json(guests);
  } catch (error) {
    console.error("Fetch guests error:", error);
    res.status(500).json({
      message: "Server error while fetching guests",
    });
  }
});

module.exports = router;