const Image = require("../models/Image"); // Correct path to the Image model

// Upload Image Handler
const uploadImage = async (req, res) => {
    try {
        const { filename, url } = req.body; // Expecting JSON { filename, url }

        if (!filename || !url) {
            return res.status(400).json({ message: "Filename and URL are required." });
        }

        const newImage = new Image({ filename, url });
        await newImage.save(); // Save to MongoDB

        res.status(201).json({ message: "Image uploaded successfully!", image: newImage });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get All Images Handler
const getImages = async (req, res) => {
    try {
        const images = await Image.find(); // Fetch all images from MongoDB
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { uploadImage, getImages };
