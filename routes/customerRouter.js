const express = require('express');
const { 
  getCustomersByCompany,
  addCustomer,
  getCustomersById,
  editCustomer,
  lockCustomer
} = require('../lib/database/dbEngine/customerDbEngine');
const router = express.Router();

const mainRouter = 'customer';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    style: mainRouter,
    scripts: [mainRouter],
    companyId: '62e97c9162e8674da768aa84'
  });
});

router.get('/getAllCustomers', async (req, res, next) => {
  const { companyId } = req.query;
  const data = await getCustomersByCompany(companyId);
  res.json({ data });
});

router.get('/getCustomer', async (req, res, next) => {
  const { id } = req.query;
  const data = await getCustomersById(id);
  res.json({ data });
});

router.post('/add', async (req, res, next) => {
  const {
    firstName,
    lastName,
    companyId,
    email,
    phone,
    address,
    isLocked
  } = req.body;
  await addCustomer({
    firstName,
    lastName,
    companyId,
    email,
    phone,
    address,
    isLocked
  });
  res.json({ success: true });
});

router.patch('/edit', async (req, res, next) => {
  await editCustomer(req.body);
  res.json({ success: true });
});

router.patch('/lock', async (req, res, next) => {
  const { _id } = req.body;
  await lockCustomer(_id);
  res.json({ success: true });
});

module.exports = router;