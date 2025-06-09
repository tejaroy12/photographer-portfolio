const express = require('express');
const multer = require('multer');
const path = require('path');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post('/upload-location', upload.array('images', 10), galleryController.createLocation);
router.get('/', galleryController.getLocations);

module.exports = router;
