const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.info = async (req, res, next) => {
  const id = req.user._id.toString();
  const array = ["test", "test1"];

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
    return next(new ErrorResponse("Error while trying to retrieve user", 500));
  }
};

exports.update = async (req, res, next) => {
  const id = req.user._id.toString();
  const array = ["test", "test1"];

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
    return next(new ErrorResponse("Error while trying to retrieve user", 500));
  }
};
