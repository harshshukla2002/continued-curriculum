const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.MongoUrl);
};

module.exports = { connectDB };
