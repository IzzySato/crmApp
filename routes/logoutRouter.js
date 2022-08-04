const express = require('express');
const router = express.Router();

const mainRouter = 'logout';

router.get('/', (req, res, next) => {
  res.render(mainRouter, {
    style: mainRouter,
    script: mainRouter,
  });
});

router.delete('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;