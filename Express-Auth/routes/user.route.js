const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/refresh", refreshToken);

module.exports = { userRouter };
