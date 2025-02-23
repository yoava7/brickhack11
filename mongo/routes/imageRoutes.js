const express = require('express');
const router = express.Router();
const { uploadImage, getImages } = require('../controllers/uploadController'); // Correctly import the controller functions

// POST route for uploading an image
router.post('/', uploadImage);  // Ensure the handler (uploadImage) is correctly passed

// GET route for fetching all images
router.get('/', getImages);    // Ensure the handler (getImages) is correctly passed

module.exports = router;
