const Item = require("../models/Item");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.list = async (req, res, next) => {
  try {
    const items = await User.find();
    res.status(201).json({
      success: true,
      message: "Error while retrieving cart item list",
      itemsList: items,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.additembyid = async (req, res, next) => {
  const itemID = req.params.itemID;
  const userID = req.user._id.toString();

  try {
    const item = await Item.findOne({ _id: itemID });
    const user = await User.findOne({ _id: userID });

    //Push the "item" element to the "shoppingBag" array of "user"
    user.shoppingBag.push(item);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Item fetched successfuly",
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.removeitembyid = async (req, res, next) => {
  const itemID = req.params.itemID;
  const userID = req.user._id.toString();

  try {
    const item = await Item.findOne({ _id: itemID });
    const user = await User.findOne({ _id: userID });

    //Pull the "item" element to the "shoppingBag" array of "user"
    user.shoppingBag.pull(item);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Item fetched successfuly",
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.clear = async (req, res, next) => {
  const userID = req.user._id.toString();
  try {
    const user = await User.findOne({ _id: userID });

    //Remove all the element from the array
    user.shoppingBag = new Array();

    await user.save();

    res.status(201).json({
      success: true,
      message: "Cart clearded successfuly",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
