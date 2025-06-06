const supabase = require('../supabase');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.bookNow = async (req, res) => {
  try {
    const { name, phone, email, location } = req.body;

    if (!name || !phone || !email || !location) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Save booking to Supabase
    const { data, error } = await supabase.from('bookings').insert([{ name, phone, email, location }]).select();

    if (error) {
      console.error('Insert error:', error);
      return res.status(500).json({ message: 'Database insert error', error });
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation',
      text: `Hello ${name},\n\nYour booking for ${location} has been received.\nWe will contact you shortly.\n\nThank you!`,
    };

    // Promisify sendMail for async/await
    const util = require('util');
    const sendMail = util.promisify(transporter.sendMail).bind(transporter);

    try {
      await sendMail(mailOptions);
      return res.status(200).json({ message: 'Booking successful! Confirmation email sent.', data });
    } catch (mailErr) {
      console.error('Email send error:', mailErr);
      return res.status(500).json({ message: 'Booking saved, but failed to send confirmation email.', error: mailErr.toString() });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this new function for GET bookings
exports.getBookings = async (req, res) => {
  try {
    const { data, error } = await supabase.from('bookings').select('*');

    if (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ message: 'Failed to fetch bookings', error });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
