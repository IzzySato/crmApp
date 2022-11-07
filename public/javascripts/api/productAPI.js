import { addFetch, editFetch, fetchJSON, deleteFetch } from './fetch.js';

const router = '/product';

const getAllProducts = async (companyId) =>
  await fetchJSON(`${router}/getAllProducts?companyId=${companyId}`);

const addProduct = async (companyId, product) =>
  await addFetch(product, `${router}/add?companyId=${companyId}`);

const editProduct = async (productId, product) =>
  await editFetch(product, `${router}/edit?productId=${productId}`);

const deleteProduct = async (productId) =>
  await deleteFetch(`${router}/delete?productId=${productId}`);

export {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct
}