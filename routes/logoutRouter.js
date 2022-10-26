const express = require('express');
const router = express.Router();

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const mainRouter = 'logout';
const folderName = 'logout';
const styles = [
  `${folderName}/logout`
];
const scripts = [
  `${folderName}/logout`
];

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    styles,
    scripts,
    companyId: testCompanyId
  });
});

router.delete('/', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;