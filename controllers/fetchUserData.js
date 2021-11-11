const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.fetchUserData = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.find({ username });

    if (!user) {
      return next(new ErrorResponse("No users match this username", 404));
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
