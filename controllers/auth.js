const User = require("../models/User");

exports.register = async (req, res, next) => {
  res.send("Register Route");
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.Status(201).json({
      succes: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: erro.message,
    });
  }
};

exports.login = (req, res, next) => {
  res.send("Login Route");
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};
