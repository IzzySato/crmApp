const express = require('express');
const passport = require('passport');
const router = express.Router();

const mainRouter = 'login';

router.get('/', (req, res, next) => {
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
  });
});

router.post('/',
  passport.authenticate('local', { failureMessage: true }),
  function(req, res) {
    return res.json({ status: 'success' });
});

module.exports = router;