const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');
const { getAllUsers } = require('../lib/database/dbEngine/userDbEngine');

const routerName = 'user';

router.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: businessInfo.navLinks,
    users
  });
});

module.exports = router;