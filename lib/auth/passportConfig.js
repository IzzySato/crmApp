const LocalStrategy = require('passport-local').Strategy;
const { getUserByEmailPw } = require('../database/dbEngine/userDbEngine');
const User = require('../database/models/User');

const init = (passport) => {
  
  //passport.use(User.createStrategy());
  //passport.use(new LocalStrategy(User.authenticate()));
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
      const user = await getUserByEmailPw(email, password);
      if(user.status === 'error') {
        return done(null, false, { message: 'incorrect password' });
      } else {
        return done(null, user.user);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = {
  init
}
