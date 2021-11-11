const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.fetchUserData = async (req, res, next) => {
  console.log("test 1");
  try {
    const user = await User.find({ username: "Test User" });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
