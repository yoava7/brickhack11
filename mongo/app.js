const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Sequelize configuration
const imageRoutes = require('./routes/imageRoutes');
const Image = require('./models/Image'); // Import the Image model

const app = express();

// Sync the database
sequelize.sync({ force: false }) // Set force: true if you want to drop and recreate the tables (caution)
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Use image routes
app.use("/api/images", imageRoutes);

// Server listening
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
