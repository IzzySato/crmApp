const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');
const { addUser } = require('../lib/database/dbEngine/userDbEngine');

const routerName = 'register';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: []
  });
});

router.post('/addUser', async (req, res, next) => {
  const user = req.body;
  console.log(user);
  await addUser(user);
  res.json({ success: true });
});

module.exports = router;