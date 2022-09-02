const express = require('express');
const router = express.Router();
const mainRouter = 'schedule';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    companyId: '62e97c9162e8674da768aa84'
  });
});

module.exports = router;