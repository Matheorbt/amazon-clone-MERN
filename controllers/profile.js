const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.info = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorResponse("No user found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
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
  } = req.body;

  const userID = req.user._id;

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
    user.deliveryInformation.zipCode = zipCode;
    user.deliveryInformation.streetIndex = streetIndex;
    user.deliveryInformation.streetName = streetName;
    user.deliveryInformation.city = city;
    user.deliveryInformation.country = country;

    await user.save();

    res.status(201).json({
      success: true,
      data: "User personnal informations modification success",
    });
  } catch (error) {
    next(error);
  }
};
