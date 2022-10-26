const express = require('express');
const router = express.Router();
const mainRouter = 'schedule';

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const folderName = 'schedule';
const styles = [
  `${folderName}/scheduleMain`
];
const scripts = [
  `${folderName}/scheduleMain`
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

module.exports = router;