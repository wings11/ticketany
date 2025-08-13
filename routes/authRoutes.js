const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google', (req, res, next) => {
  console.log('Starting Google OAuth flow...');
  console.log('Callback URL will be:', process.env.NODE_ENV === 'production' 
    ? "https://ticketany.onrender.com/auth/google/callback"
    : "http://localhost:5001/auth/google/callback");
  
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// Test route to check callback URL
router.get('/test-callback', (req, res) => {
  const callbackURL = process.env.NODE_ENV === 'production' 
    ? "https://ticketany.onrender.com/auth/google/callback"
    : "http://localhost:5001/auth/google/callback";
  res.json({ 
    callbackURL,
    environment: process.env.NODE_ENV || 'development',
    currentURL: req.protocol + '://' + req.get('host') + req.originalUrl
  });
});

// Clear session route for testing
router.get('/clear-session', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not clear session' });
    }
    res.json({ message: 'Session cleared' });
  });
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ticketanywhere2025.vercel.app/dashboard'
      : 'http://localhost:3000/dashboard';
    res.redirect(frontendUrl);
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/current_user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
