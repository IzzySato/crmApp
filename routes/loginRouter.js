const express = require('express');
const passport = require('passport');
const router = express.Router();

const mainRouter = 'login';
const folderName = 'login';
const styles = [
  `${folderName}/login`,
];
const scripts = [
  `${folderName}/login`,
];

router.get('/', (req, res, next) => {
  res.render(mainRouter, {
    styles,
    scripts,
  });
});

router.post('/',
  passport.authenticate('local', { failureMessage: true }),
  function(req, res) {
    return res.json({ status: 'success' });
});

module.exports = router;