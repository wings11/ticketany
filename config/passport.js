require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://ticketany.onrender.com/auth/google/callback"
    : "http://localhost:5001/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  console.log('Google OAuth callback received for user:', profile.emails[0].value);
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email: profile.emails[0].value });
    
    if (existingUser) {
      return done(null, existingUser);
    }
    
    // Create new user
    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: 'oauth_user', // OAuth users don't have passwords
      role: 'customer'
    });
    
    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
