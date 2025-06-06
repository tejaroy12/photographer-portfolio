const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

router.post('/upload-location', galleryController.createLocation);
router.get('/', galleryController.getLocations);

module.exports = router;
