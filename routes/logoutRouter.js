const express = require('express');
const router = express.Router();

const mainRouter = 'logout';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    companyId: '62e97c9162e8674da768aa84'
  });
});

router.delete('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;