import {
  addFetch,
  editFetch,
  fetchJSON } from './fetch.js';

const router = '/customer';

const getCustomers = async (companyId) =>
  await fetchJSON(`${router}/getAllCustomers?companyId=${companyId}`);

const getCustomersLength = async (companyId) => {
  const { data } = await getCustomers(companyId);
  return data.length;
};

const getCustomerById = async (customerId) =>
  await fetchJSON(`${router}/getCustomer?id=${customerId}`);


const addCustomer = async (customer) => 
 await addFetch(customer, `${router}/add`);

const editCustomer = async (customer) =>
  await editFetch(customer, `${router}/edit`);

const deleteCustomer = async (customerId) => {
  //edit the customer lock to true
}

export {
  getCustomers,
  getCustomersLength,
  getCustomerById,
  addCustomer,
  editCustomer,
  deleteCustomer
}