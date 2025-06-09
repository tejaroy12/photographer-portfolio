const express = require('express');
const { upload } = require('../cloudinaryy');  // import upload from your cloudinaryy.js
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// Upload new location with images
router.post('/upload-location', upload.array('images', 10), galleryController.createLocation);

// Get all locations
router.get('/', galleryController.getLocations);

// Update location (text fields only)
router.put('/:id', galleryController.updateLocation);

// Delete location and images
router.delete('/:id', galleryController.deleteLocation);

module.exports = router;
