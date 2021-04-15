const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(500),
      json({
        sucesss: false,
        error: error.message,
      });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please Provide Email and Password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password"); //find one user by email address, because its unique

    if (!user) {
      res.status(404).json({ success: false, error: "Invalid Credentials" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({ success: false, error: "Invalid Credentials" });
    }

    res.status(200).json({
      sucess: true,
      token: "ttdsgdg4443",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};
