const passport = require('passport');
const User = require('../database/models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const init = () => {
  console.log('google init');
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/home',
    passReqToCallback: true
  },
  (accessToken, refreshToken, profile, done) => {
    // TODO this is not get called
      console.log('User.findOeCreate');
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, user);
      });
    }
  ));
};

module.exports = {
  init
}