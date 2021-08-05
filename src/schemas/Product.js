const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
  },
  balance : {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Product", productSchema);