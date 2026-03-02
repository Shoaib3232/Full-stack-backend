const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('Using URI:', config.MONGO_URI);
    
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4
    });
    
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = connectDB;