const mongoose = require("mongoose");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
  Item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
    required: [true, "Please provide at least one item"],
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide at least one user"],
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
