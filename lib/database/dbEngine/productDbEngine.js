const Product = require('../models/Product');

const getProductsByCompany = async (companyId) => {
  try {
    return await Product.find({ companyId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addProduct = async (newProduct) => {
  try {
    const product = new Product(newProduct);
    product.save();
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editProduct = async(updatingProduct) => {
  try {
    await Product.updateOne({ _id: updatingProduct.id }, updatingProduct);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteProduct = async(productId) => {
  try {
    await Product.deleteOne({ _id: productId });
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getProductsByCompany,
  addProduct,
  editProduct,
  deleteProduct
}