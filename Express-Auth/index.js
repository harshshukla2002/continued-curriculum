const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv/config");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");
const { userRouter } = require("./routes/user.route");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", success: true });
});

server.use("/api/user", userRouter);

server.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("Server started at http://localhost:4000/");
});
