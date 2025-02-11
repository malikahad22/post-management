const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {});
      console.log("Database Connected...");
   } catch (error) {
      console.error("Database Connection Failed:", error);
      process.exit(1); // Exit process on failure
   }
};

module.exports = connectDB;
