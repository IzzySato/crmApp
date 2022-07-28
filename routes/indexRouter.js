const express = require('express');
const router = express.Router();

const routerName = 'index';

router.get('/', (req, res, next) => {
  console.log('isAuthenticated: ' + req.isAuthenticated());
  console.log(req.user);
  res.render(routerName, {
    style: routerName
  });
});

module.exports = router;
