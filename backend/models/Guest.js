var mongoose = require("mongoose");

var guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    diningType: {
      type: String,
      default: "",
      trim: true,
    },
    partySize: {
      type: String,
      default: "",
      trim: true,
    },
    language: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guest", guestSchema);