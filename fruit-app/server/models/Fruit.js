const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    unit: {
      type: Number,
      required: [true, "Unit is required"],
      min: [0, "Unit cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    total: {
      type: Number, // calculated automatically, never entered by the user
    },
  },
  { timestamps: true }
);

// Calculate total = unit * price before every save
fruitSchema.pre("save", function () {
  this.total = Number((this.unit * this.price).toFixed(2));
});

module.exports = mongoose.model("Fruit", fruitSchema);