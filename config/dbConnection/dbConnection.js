require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;

const dbConnection = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.log("❌ Failed to Connect DB: " + error.message);
  }
};

module.exports = { dbConnection };
