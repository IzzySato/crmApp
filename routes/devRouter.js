const express = require('express');
const { getCompanies } = require('../lib/database/dbEngine/companyDbEngine');
const router = express.Router();

const folderName = 'dev';
const styles = [
  `${folderName}/companyMain`
];

const scripts = [
  `${folderName}/devMain`,
];

const mainRouter = 'dev';

router.get('/', async (req, res, next) => {
  res.render(mainRouter, {
    styles,
    scripts,
    companies: await getCompanies(),
  });
});


module.exports = router;