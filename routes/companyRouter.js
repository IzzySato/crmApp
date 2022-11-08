const express = require('express');
const { 
  getCompanyById,
  getCompanies,
  addCompany,
  editCompany,
  addTag,
  removeTag,
  editTag,
 } = require('../lib/database/dbEngine/companyDbEngine');

const router = express.Router();

router.get('/getAllcompanies', async (req, res, next) => {
  const data = await getCompanies();
  res.json({ data });
});

router.get('/getCompanyById', async (req, res, next) => {
  const { companyId } = req.query;
  const data = await getCompanyById(companyId);
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

router.patch(`/tag-add`, async (req, res, next) => {
  const { companyId, tag} = req.query;
  await addTag(companyId, tag);
  res.json({ success: true });
});

router.patch(`/tag-edit`, async (req, res, next) => {
  const { companyId, tags} = req.body;
  await editTag(companyId, tags);
  res.json({ success: true });
});

router.patch(`/tag-remove`, async (req, res, next) => {
  const { companyId, tag} = req.query;
  await removeTag(companyId, tag);
  res.json({ success: true });
});

module.exports = router;