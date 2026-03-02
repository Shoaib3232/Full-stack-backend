// models/counter.model.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

// Check if model exists before creating
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

module.exports = Counter;