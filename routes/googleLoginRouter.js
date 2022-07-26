const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', (req, res, next) => {
  console.log('google login');
  passport.authenticate('google', { scope: ['profile', 'email'] });
});

router.get('/google/home', (req, res, next) => {
  console.log('call back');
  passport.authenticate('google', { failureRedirect: '/login' }),
  res.redirect('/');
});

module.exports = router;
