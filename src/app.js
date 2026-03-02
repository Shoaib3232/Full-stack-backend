const express = require("express");
const userRoutes = require("./routes/user.routes");
const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json()); // parse JSON body
app.use(logger);         // log all requests
app.use("/api/users", userRoutes);

// 404 for unmatched routes
app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

// Global error handler
app.use(errorHandler);

module.exports = app;