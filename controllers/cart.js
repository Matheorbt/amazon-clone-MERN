const Item = require("../models/Item");
const User = require("../models/User");
const Order = require("../models/Order");
const ErrorResponse = require("../utils/errorResponse");

exports.list = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(201).json({
      success: true,
      message: "Success cart item list",
      itemsList: items,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.checkout = async (req, res, next) => {
  const { idsList } = req.body;
  const userID = req.user._id.toString();

  try {
    const user = await User.findById(userID);
    const order = await Order.create({
      Item: idsList,
      User: userID,
    });

    user.previousOrder.push(order);
    user.shoppingBag = new Array();

    await user.save();

    res.status(201).json({
      success: true,
      message: "Order creation successful",
      order: order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.additembyid = async (req, res, next) => {
  const itemID = req.params.itemID;
  const userID = req.user._id.toString();
  let dupe = 0;

  try {
    const item = await Item.findOne({ _id: itemID });
    const user = await User.findOne({ _id: userID });

    user.shoppingBag.map((cartItem, index) =>
      cartItem.item.toString() === itemID
        ? ((user.shoppingBag[index].quantity += 1), (dupe = 1))
        : null
    );
    dupe === 0
      ? user.shoppingBag.push({
          quantity: 1,
          item: item,
        })
      : null;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Item added successfuly",
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
