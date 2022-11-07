const express = require('express');
const {
  getServicesByCompany,
  getServicesByServiceId,
  addService,
  editService,
  deleteService
} = require('../lib/database/dbEngine/serviceDbEngine');
const router = express.Router();


router.get('/getAllServicesByCompanyId', async (req, res, next) => {
  const { companyId } = req.query;
  const data = await getServicesByCompany(companyId);
  res.json({ data });
});

router.get('/getAllServicesByServiceId', async (req, res, next) => {
  const { serviceId } = req.query;
  const data = await getServicesByServiceId(serviceId);
  res.json(data);
});

router.post('/add', async (req, res, next) => {
  const { success } = await addService(req.body);
  res.json({ success });
});

router.patch('/edit', async (req, res, next) => {
  const { success } = await editService(req.body);
  res.json({ success });
});

router.delete('/delete', async (req, res, next) => {
  const { serviceId } = req.query;
  const { success } = await deleteService(serviceId);
  res.json({success});
});

module.exports = router;