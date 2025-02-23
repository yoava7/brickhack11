// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const uploadRoutes = require("./routes/uploadRoutes"); // ✅ Ensure correct path

// const app = express();

// // Middleware
// app.use(express.json()); // ✅ Parses JSON requests
// app.use(cors()); // ✅ Prevents CORS issues

// // Routes
// app.use("/api/upload", uploadRoutes); // ✅ `/api/upload` should be mapped correctly

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("MongoDB connection error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
