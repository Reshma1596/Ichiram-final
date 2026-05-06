var mongoose = require("mongoose");

var menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
      trim: true,
    },
    foodType: {
      type: String,
      default: "",
      trim: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

menuSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Menu", menuSchema);