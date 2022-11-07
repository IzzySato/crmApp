const express = require('express');
const router = express.Router();

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const folderName = 'work';
const styles = [
  `${folderName}/workMain`,
];

const scripts = [
  `${folderName}/workMain`
];

const mainRouter = 'work';

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