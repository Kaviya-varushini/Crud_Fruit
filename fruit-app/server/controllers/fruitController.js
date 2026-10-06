const mongoose = require("mongoose");
const Fruit = require("../models/Fruit")

// GET /api/fruits
const getFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find().sort({ createdAt: -1 });
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching fruits" });
  }
};

// POST /api/fruits
const addFruit = async (req, res) => {
  try {
    const { name, description, unit, price } = req.body;

    // Validation
    const errors = [];
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("Name is required");
    }
    if (unit === undefined || unit === null || unit === "" || isNaN(Number(unit))) {
      errors.push("Unit is required and must be a number");
    } else if (Number(unit) < 0) {
      errors.push("Unit cannot be negative");
    }
    if (price === undefined || price === null || price === "" || isNaN(Number(price))) {
      errors.push("Price is required and must be a number");
    } else if (Number(price) < 0) {
      errors.push("Price cannot be negative");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // total is calculated by the pre-save hook in the model
    const fruit = new Fruit({
      name,
      description,
      unit: Number(unit),
      price: Number(price),
    });
    const saved = await fruit.save();

    res.status(201).json(saved);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error while adding fruit" });
  }
};

// DELETE /api/fruits/:id
const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid fruit ID" });
    }

    const deleted = await Fruit.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Fruit not found" });
    }

    res.status(200).json({ message: "Fruit deleted", id });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting fruit" });
  }
};

module.exports = { getFruits, addFruit, deleteFruit };