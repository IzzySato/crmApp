const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');

const routerName = 'logout';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: []
  });
});

router.delete('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;