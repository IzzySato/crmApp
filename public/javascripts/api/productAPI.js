import { addFetch, editFetch, fetchJSON, deleteFetch } from './fetch.js';

const router = '/product';

const getAllProducts = async (companyId) =>
  await fetchJSON(`${router}/getAllProducts?companyId=${companyId}`);

const getProductByProductId = async (productId) =>
  await fetchJSON(`${router}/getProduct?productId=${productId}`);

const addProduct = async (product) => {
  console.log(product);
  await addFetch(product, `${router}/add`);
}

const editProduct = async (product) =>
  await editFetch(product, `${router}/edit`);

const deleteProduct = async ({id}) =>
  await deleteFetch(`${router}/delete?productId=${id}`);

export {
  getAllProducts,
  getProductByProductId,
  addProduct,
  editProduct,
  deleteProduct
}