const express = require('express');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: './public/images/', storage });
const fs = require('fs');

const { 
  getCompanyById,
  getCompanies,
  addCompany,
  editCompany,
  addTag,
  removeTag,
  editTag,
  addPermission,
  editPermission,
  removePermission,
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

router.post(`/add`, upload.single('logoImg'), async (req, res, next) => {
  const newCompany = req.body;
  newCompany.logoImg = req.file?.buffer;
  newCompany.avaiableTags = [];
  newCompany.permissions = [];
  await addCompany(newCompany);
  res.json({ success: true });
});

router.post(`/edit`, upload.single('logoImg'), async (req, res, next) => {
  const company = req.body;
  company.logoImg = req.file?.buffer;
  company.avaiableTags = company.avaiableTags.split(',');
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

router.patch(`/permission-add`, async (req, res, next) => {
  const { companyId, permission} = req.query;
  await addPermission(companyId, permission);
  res.json({ success: true });
});

router.patch(`/permission-remove`, async (req, res, next) => {
  const { companyId, permission} = req.query;
  await removePermission(companyId, permission);
  res.json({ success: true });
});

module.exports = router;