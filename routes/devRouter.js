const express = require('express');
const { getCompanies, addCompany } = require('../lib/database/dbEngine/companyDbEngine');
const router = express.Router();

const folderName = 'dev';
const styles = [
  `${folderName}/companyMain`,
  `${folderName}/companyAddEdit`,
  `${folderName}/tagManagement`,
];

const scripts = [
  `${folderName}/devMain`,
  `${folderName}/companyAddEdit`,
];

const mainRouter = 'dev';
const addRouter = 'company-add';
const tagRouter = 'tag-management';

router.get('/', async (req, res, next) => {
  res.render(mainRouter, {
    styles,
    scripts,
    companies: await getCompanies(),
  });
});

router.get(`/${addRouter}`, async (req, res, next) => {
  res.render(addRouter, {
    styles,
    scripts,
    companies: await getCompanies(),
  });
});

router.get(`/${tagRouter}`, async (req, res, next) => {
  res.render(tagRouter, {
    styles,
    scripts,
    companies: await getCompanies(),
  });
});


module.exports = router;