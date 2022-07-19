const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');

const routerName = 'index';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: businessInfo.navLinks
  });
});

module.exports = router;
