const express = require('express');
const router = express.Router();
const { getAllUsers, addUser } = require('../lib/database/dbEngine/userDbEngine');

const mainRouter = 'user';
const addUserRouter = 'user-add';

router.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    users
  });
});

router.get(`/${addUserRouter}`, async (req, res, next) => {
  // TODO change to req.user later
  // const { permissions, companyId } = req.user;
  res.render(addUserRouter, {
    style: addUserRouter,
    scripts: [mainRouter, addUserRouter],
    permissions: ['owner', 'editor'],
    companyId: '62e97c9162e8674da768aa84'
  });
});

router.post('/add', async (req, res, next) => {
  await addUser(req.body);
  res.json({ status: 'success' });
});

module.exports = router;