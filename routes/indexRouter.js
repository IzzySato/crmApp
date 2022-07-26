const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');

const routerName = 'index';

router.get('/', (req, res, next) => {
  console.log('isAuthenticated: ' + req.isAuthenticated());
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: businessInfo.navLinks
  });
});

module.exports = router;
