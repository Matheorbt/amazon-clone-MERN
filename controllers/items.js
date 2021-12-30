const Item = require("../models/Item");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.list = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(201).json({
      success: true,
      message: "Item list fetch success",
      itemsList: items,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.fetchitembyid = async (req, res, next) => {
  const itemID = req.params.itemID;

  try {
    const item = await Item.findOne({ _id: itemID });
    if (!item) {
      res.status(500).json({
        succes: false,
        error: error.message,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Item fetched successfuly",
        item: item,
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

exports.remove = async (req, res, next) => {
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

exports.add = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CURRENT_URL}/passwordreset/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        sucjet: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ succes: true, data: "Email sent" });
    } catch (error) {
      user.getResetPasswordToken = undefined;
      user.getResetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be send", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      //gt => greater than
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};

exports.addcomment = async (req, res, next) => {
  const itemID = req.params.itemID;
  const rating = req.headers.commentrating;
  const content = req.headers.commentcontent;
  const userID = req.user._id.toString();

  try {
    const item = await Item.findOne({ _id: itemID });
    const user = await User.findOne({ _id: userID });

    item.comment.push({
      rating: rating,
      content: content,
      user: user,
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfuly",
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
