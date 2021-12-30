const mongoose = require("mongoose");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please provide at least one user"],
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  item: [
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
