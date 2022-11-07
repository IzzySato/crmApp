const express = require('express');
const { 
  getCompanyById,
  getCompanies,
  addCompany,
  editCompany,
 } = require('../lib/database/dbEngine/companyDbEngine');

const router = express.Router();

router.get('/getAllcompanies', async (req, res, next) => {
  const data = await getCompanies();
  res.json({ data });
});

router.get('/getCompanyById', async (req, res, next) => {
  const { companyId } = req.query;
  const data = await getCompanyById(companyId);
  console.log(data);
  res.json(data);
});

router.post(`/add`, async (req, res, next) => {
  const newCompany = req.body;
  await addCompany(newCompany);
  res.json({ success: true });
});

router.patch(`/edit`, async (req, res, next) => {
  const company = req.body;
  await editCompany(company);
  res.json({ success: true });
});

module.exports = router;