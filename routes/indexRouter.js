const express = require('express');
const router = express.Router();

const mainRouter = 'index';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  //const { firstName, email, permission, companyId } = req.user;
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    user: {
      firstName: 'izzy',
      permission: ['owner', 'editor'],
      companyId: '62e97c9162e8674da768aa84'
    }
    // user: { firstName, email, permission, companyId }
  });
});


module.exports = router;
