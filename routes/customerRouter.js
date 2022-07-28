const express = require('express');
const router = express.Router();

const routerName = 'customer';

router.get('/', (req, res, next) => {
  res.render(routerName, {
    style: routerName,
  });
});

module.exports = router;