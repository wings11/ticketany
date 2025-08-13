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
    console.log('Google OAuth callback received for user:', req.user?.email);
    // Successful authentication, redirect to a success page that will handle the frontend redirect
    const successUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ticketanywhere2025-hujude7wn-wings11s-projects.vercel.app/auth/success'
      : 'http://localhost:3000/auth/success';
    console.log('Redirecting to:', successUrl);
    res.redirect(successUrl);
  }
);

// Auth success endpoint for frontend to check auth status after OAuth
router.get('/success', (req, res) => {
  if (req.user) {
    res.json({ 
      success: true, 
      user: req.user,
      message: 'Authentication successful' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Authentication failed' 
    });
  }
});

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
