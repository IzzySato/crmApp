const express = require('express');
const router = express.Router();

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const folderName = 'config';
const styles = [
  `${folderName}/configMain`
];
const scripts = [
  `${folderName}/configMain`
];

const mainRouter = 'config';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    styles,
    scripts,
    companyId: testCompanyId
  });
});

module.exports = router;