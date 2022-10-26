const express = require('express');
const router = express.Router();
const { addUser } = require('../lib/database/dbEngine/userDbEngine');

const routerName = 'register';
const folderName = 'register';
const styles = [
  `${folderName}/register`
];
const scripts = [
  `${folderName}/register`
];

router.get('/', (req, res, next) => {
  res.render(routerName, {
    styles,
    scripts
  });
});

router.post('/addUser', async (req, res, next) => {
  const user = req.body;
  console.log(user);
  await addUser(user);
  res.json({ success: true });
});

module.exports = router;