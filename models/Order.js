const mongoose = require("mongoose");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
  User: {
    type: String,
    required: [true, "Please provide at least one user"],
  },
  Date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  Item: [
    {
      quantity: Number,
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
