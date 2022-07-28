const express = require('express');
const router = express.Router();
const { addUser } = require('../lib/database/dbEngine/userDbEngine');

const routerName = 'register';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    style: routerName,
  });
});

router.post('/addUser', async (req, res, next) => {
  const user = req.body;
  console.log(user);
  await addUser(user);
  res.json({ success: true });
});

module.exports = router;