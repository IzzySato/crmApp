const LocalStrategy = require('passport-local').Strategy;
const { getUserByEmailPw } = require('../database/dbEngine/userDbEngine');
const User = require('../database/models/User');

const init = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, cb) => {
    try {
      const { status, user } = await getUserByEmailPw(email, password);
      if(status === 'error') {
        return cb(null, false, { message: 'incorrect password' });
      }
      return cb(null, user);
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    console.log(user);
    return done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = {
  init
}
