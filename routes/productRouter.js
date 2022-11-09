const express = require('express');
const {
  getProductsByCompany,
  getProductByProductId,
  addProduct,
  editProduct,
  deleteProduct
 } = require('../lib/database/dbEngine/productDbEngine');
const router = express.Router();


router.get('/getAllProducts', async (req, res, next) => {
  const { companyId } = req.query;
  const data = await getProductsByCompany(companyId);
  res.json({ data });
});

router.get('/getProduct', async (req, res, next) => {
  const { productId } = req.query;
  const data = await getProductByProductId(productId);
  res.json({ data });
});

router.post('/add', async (req, res, next) => {
  const { success } = await addProduct(req.body);
  res.json({ success });
});

router.patch('/edit', async (req, res, next) => {
  const { success } = await editProduct(req.body);
  res.json({ success });
});

router.delete('/delete', async (req, res, next) => {
  const { productId } = req.query;
  const { success } = await deleteProduct(productId);
  res.json({ success });
});

module.exports = router;