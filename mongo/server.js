const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const uploadRoutes = require("./routes/uploadRoutes"); // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json()); // ✅ Required for parsing JSON requests
app.use(cors()); // ✅ Enable CORS

// Routes
app.use("/api/upload", uploadRoutes); // ✅ Make sure uploadRoutes is a function

// Database connection
mongoose.connect(process.env.MONGODB_URI)//, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
//})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
