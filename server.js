// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS configuration for credentials
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://ticketanywhere2025.vercel.app' 
    : 'http://localhost:3000', // Your frontend URL
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection (Atlas or local from .env)
mongoose.connect(process.env.MONGO_URI, {
  ssl: true,
  tls: true,
  tlsInsecure: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});


// Routes
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
	res.send('Event Ticketing API is running');
});

const PORT = process.env.PORT || 5001;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express app for Vercel
module.exports = app;
