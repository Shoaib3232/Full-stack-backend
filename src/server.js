const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

// Start server FIRST
const server = app.listen(config.PORT, () => {
  console.log(`✅ Server running on port ${config.PORT}`);
  console.log(`📡 Attempting to connect to MongoDB...`);
   // TODO: Make DNS configurable via environment variables
// Currently hardcoded to Google DNS (8.8.8.8, 8.8.4.4) 
// because local DNS was failing. Fix system DNS or move to .env later.
const dns = require('dns'); 
dns.setServers(['8.8.8.8', '8.8.4.4']);
 // Then connect to database AFTER server is running
  connectDB().catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚠️  Server is still running, but database features won't work!");
  });
});
  
  
   