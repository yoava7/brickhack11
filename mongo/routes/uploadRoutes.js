const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploadController"); // Ensure this matches the correct path

router.post("/", uploadImage);

module.exports = router;
