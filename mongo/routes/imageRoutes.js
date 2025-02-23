const express = require("express");
const router = express.Router();
const { uploadImage, getImages } = require("../controllers/uploadController");

router.post("/", uploadImage); // Upload image
router.get("/", getImages); // Fetch all images

module.exports = router;
