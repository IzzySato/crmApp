const express = require('express');
const router = express.Router();

const routerName = 'logout';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    style: routerName,
  });
});

router.delete('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;