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
    ? 'https://ticketany.onrender.com'
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

// MongoDB connection for traditional server environment
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 60000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Retrying MongoDB connection in 5 seconds...');
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

// Connect to database with retry logic
connectDB();


const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  // Don't exit, just log the error
});
db.once('open', () => {
	console.log('Connected to MongoDB successfully');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
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

const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
