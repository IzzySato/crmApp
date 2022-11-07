const express = require('express');
const router = express.Router();

const testCompanyId = '63584c7bfbfbb7079e0a68dd';

const { 
  getCustomersByCompany,
  addCustomer,
  getCustomersById,
  editCustomer,
  lockCustomer,
  deleteAllCustomers,
} = require('../lib/database/dbEngine/customerDbEngine');

const folderName = 'customer';
const styles = [
  `${folderName}/customerMain`,
  `${folderName}/customerAddEdit`,
  `${folderName}/customerDetail`,
];

const scripts = [
  `${folderName}/customerMain`
];

const mainRouter = 'customer';

router.get('/', (req, res, next) => {
  // TODO change to req.user later
  // const { companyId } = req?.user;
  res.render(mainRouter, {
    styles,
    scripts,
    companyId: testCompanyId
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
  const newCustomer = req.body;
  newCustomer.companyId = testCompanyId;
  await addCustomer(newCustomer);
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

router.delete('/delete', async (req, res, next) => {
  await deleteAllCustomers();
});

module.exports = router;