const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, getPermissions } = require('../lib/database/dbEngine/userDbEngine');
const routerName = 'user';
const addUserRouter = 'user_add';

router.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.render(routerName, {
    style: routerName,
    users
  });
});

router.get(`/${addUserRouter}`, async (req, res, next) => {
  res.render(addUserRouter, {
    style: addUserRouter,
    permissions: await getPermissions(),
  });
});

router.post('/add', async (req, res, next) => {
  const newUser = req.body;
  await addUser(newUser);
  res.json({ status: 'success' });
});

module.exports = router;