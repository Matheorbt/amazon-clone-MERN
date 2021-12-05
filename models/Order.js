const mongoose = require("mongoose");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
  Item: {
    type: Array,
    required: [true, "Please provide at least one item"],
  },
  User: {
    type: String,
    required: [true, "Please provide at least one user"],
  },
  Date: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
