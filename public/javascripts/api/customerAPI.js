import { fetchJSON } from "./fetch.js";

const customerRouter = '/customer';

const getCustomers = async (companyId) =>
  await fetchJSON(`${customerRouter}/getAllCustomers?companyId=${companyId}`);

const getCustomersLength = async (companyId) => {
  const { data } = await getCustomers(companyId);
  return data.length;
};

const getCustomerById = async (customerId) =>
  await fetchJSON(`${customerRouter}/getCustomer?id=${customerId}`);

export {
  getCustomers,
  getCustomersLength,
  getCustomerById
}