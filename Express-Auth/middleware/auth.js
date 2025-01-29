const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) return res.status(403).json({ message: "Token revoked" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
