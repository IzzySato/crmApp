const express = require('express');
const passport = require('passport');
const router = express.Router();
const businessInfo = require('../businessInfo.json');
const routerName = 'login';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: []
  });
});

// router.post('/', (req, res) => {
//   passport.authenticate('local', function (err, user, info) {
//     console.log('login');
//     console.log(user);
//     if (user) {
//       return res.json({ status: 'success' });
//     } else {
//       return res.json({ status: 'error', message: 'email or password is not correct'})
//     }
//   })(req, res);
// });

router.post('/',
  passport.authenticate('local', { failureMessage: true }),
  function(req, res) {
    return res.json({ status: 'success' });
});

module.exports = router;