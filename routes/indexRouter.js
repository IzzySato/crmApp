const express = require('express');
const router = express.Router();

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const mainRouter = 'index';
const folderName = 'dashboard';
const styles = [
  `${folderName}/index`,
];
const scripts = [
  `${folderName}/index`,
];

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  //const { firstName, email, permission, companyId } = req.user;
  res.render(mainRouter, {
    styles,
    scripts,
    user: {
      firstName: 'izzy',
      permission: ['owner', 'editor'],
      companyId: testCompanyId
    }
    // user: { firstName, email, permission, companyId }
  });
});


module.exports = router;
