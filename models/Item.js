const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  images: {
    type: Array,
    default: undefined,
  },
  tags: {
    type: Array,
    default: undefined,
  },
  sale: {
    type: Number,
    default: 0,
  },
  quantityLeft: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
    default: undefined,
    required: [true, "Please provide a thumbnail"],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: false,
  },
  comment: [
    {
      rating: Number,
      content: String,
      date: {
        type: Date,
        default: new Date(),
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
