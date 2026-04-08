require("dotenv").config();
const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB URI is - ${process.env.MONGODB_URI}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = DbConnect;
