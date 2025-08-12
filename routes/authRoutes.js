const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

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
  res.json(req.user);
});

module.exports = router;
