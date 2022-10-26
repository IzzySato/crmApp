const express = require('express');
const router = express.Router();
const { getAllUsers, addUser } = require('../lib/database/dbEngine/userDbEngine');

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const mainRouter = 'user';
const addUserRouter = 'user-add';

const folderName = 'user';

const styles = [
  `${folderName}/userMain`,
  `${folderName}/userAddEdit`,
];
const scripts = [
  `${folderName}/userMain`,
  `${folderName}/userAddEdit`,
];

router.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.render(mainRouter, {
    styles,
    scripts,
    users
  });
});

router.get(`/${addUserRouter}`, async (req, res, next) => {
  // TODO change to req.user later
  // const { permissions, companyId } = req.user;
  res.render(addUserRouter, {
    styles,
    scripts,
    permissions: ['owner', 'editor'],
    companyId: testCompanyId
  });
});

router.post('/add', async (req, res, next) => {
  await addUser(req.body);
  res.json({ status: 'success' });
});

module.exports = router;