const express = require('express');
const router = express.Router();
const businessInfo = require('../businessInfo.json');
const { getAllUsers, addUser, getPermissions } = require('../lib/database/dbEngine/userDbEngine');
const routerName = 'user';
const addUserRouter = 'user_add';

router.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.render(routerName, {
    title: businessInfo.businessName,
    style: routerName,
    navLinks: businessInfo.navLinks,
    users
  });
});

router.get(`/${addUserRouter}`, async (req, res, next) => {
  res.render(addUserRouter, {
    title: businessInfo.businessName,
    style: addUserRouter,
    navLinks: businessInfo.navLinks,
    permissions: await getPermissions(),
  });
});

router.post('/add', async (req, res, next) => {
  const newUser = req.body;
  await addUser(newUser);
  res.json({ status: 'success' });
});

module.exports = router;