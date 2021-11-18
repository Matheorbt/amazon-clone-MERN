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
    emailModification,
    lastNameModification,
    firstNameModification,
    zipCodeModification,
    streetIndexModification,
    streetNameModification,
    cityModification,
    countryModification,
    userID,
  } = req.body;

  if (!emailModification || !lastNameModification || !firstNameModification) {
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

    user.email = emailModification;
    user.lastName = lastNameModification;
    user.firstName = firstNameModification;
    user.zipCode = zipCodeModification;
    user.streetIndex = streetIndexModification;
    user.streetName = streetNameModification;
    user.city = cityModification;
    user.country = countryModification;

    await user.save();

    res.status(201).json({
      success: true,
      data: "User personnal informations modification success",
    });
  } catch (error) {
    next(error);
  }
};
