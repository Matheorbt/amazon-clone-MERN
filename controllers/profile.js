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
  const {
    email,
    lastName,
    firstName,
    zipCode,
    streetIndex,
    streetName,
    city,
    country,
    userID,
  } = req.body;
  console.log(req.body);
  if (!email || !lastName || !firstName) {
    return next(
      new ErrorResponse(
        "Please provide at least an email, a last name and a first name",
        400
      )
    );
  }

  try {
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return next(new ErrorResponse("Invalid user ID", 400));
    }

    user.email = email;
    user.lastName = lastName;
    user.firstName = firstName;
    user.zipCode = zipCode;
    user.streetIndex = streetIndex;
    user.streetName = streetName;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(201).json({
      success: true,
      data: "User personnal informations modification success",
    });
  } catch (error) {
    next(error);
  }
};
