const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { blacklistModel } = require("../models/blacklist.model");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "wrong password" });
    }

    const refreshToken = generateRefreshToken({ email });
    const token = createToken({ email });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res
      .status(200)
      .json({ success: true, message: "login successfull", token });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "error occured in user login",
      success: false,
      error: error,
    });
  }
};

const createToken = (id) => {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking is user already exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "this email already registered" });
    }

    // validating email format and string password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a strong password" });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "error on registering user" });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = generateRefreshToken({ email: user.email });
      res.status(200).json({
        success: true,
        refreshToken: accessToken,
      });
    }
  );
};

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await new blacklistModel({ token: refreshToken }).save();
  }
  res.clearCookie("refreshToken");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

module.exports = { loginUser, registerUser, refreshToken, logoutUser };
