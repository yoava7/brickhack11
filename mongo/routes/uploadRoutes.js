const express = require("express");
const router = express.Router();
const { uploadImage, getImages } = require("../controllers/uploadController");

// Ensure the correct method is used
router.post("/upload", uploadImage); // This only allows POST requests
router.get("/images", getImages);    // This allows GET requests

module.exports = router;
