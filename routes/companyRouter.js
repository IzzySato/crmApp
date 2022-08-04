const express = require('express');
const { getCompanies, addCompany } = require('../lib/database/dbEngine/companyDbEngine');
const router = express.Router();

const mainRouter = 'company';
const addRouter = 'company-add';
const tagRouter = 'tag-management';

router.get('/', async (req, res, next) => {
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    companies: await getCompanies(),
  });
});

router.get(`/${addRouter}`, async (req, res, next) => {
  res.render(addRouter, {
    style: addRouter,
    scripts: [mainRouter, addRouter],
    companies: await getCompanies(),
  });
});

router.get(`/${tagRouter}`, async (req, res, next) => {
  res.render(tagRouter, {
    style: tagRouter,
    scripts: [mainRouter, tagRouter],
    companies: await getCompanies(),
  });
});

router.get('/data', async (req, res, next) => {
  const data = await getCompanies();
  res.json({ data });
});

router.post(`/add`, async (req, res, next) => {
  const newCompany = req.body;
  await addCompany(newCompany);
  res.json({ success: true });
});

module.exports = router;