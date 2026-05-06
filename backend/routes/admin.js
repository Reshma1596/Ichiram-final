var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.json({
    message: "Admin route working",
  });
});

router.post("/login", function (req, res) {
  try {
    const { username, password } = req.body;

    const adminUsername = "admin";
    const adminPassword = "12345";

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    return res.status(200).json({
      message: "Admin login successful",
      admin: {
        username: adminUsername,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      message: "Server error during admin login",
    });
  }
});

module.exports = router;