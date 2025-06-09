const express = require('express');
const path = require('path'); // ✅ Add this line
const cors = require('cors');

const app = express();

const galleryRoutes = require('./routes/galleryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/locations', galleryRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
