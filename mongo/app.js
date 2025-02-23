const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const imageRoutes = require("./routes/imageRoutes");

const sequelize = require('./config/db');

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Use image routes
app.use("/api/images", imageRoutes); // Prefix your routes

// Server listening
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
