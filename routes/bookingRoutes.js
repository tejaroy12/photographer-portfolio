// backend/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book-now', bookingController.bookNow);
router.get('/', bookingController.getBookings);  // <-- New GET route to fetch bookings

module.exports = router;
