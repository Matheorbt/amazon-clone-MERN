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

exports.addItemByID = async (req, res, next) => {
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

exports.removeItemByID = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};
