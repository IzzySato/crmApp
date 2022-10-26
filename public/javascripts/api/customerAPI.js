import { fetchJSON } from "./fetch.js";

const router = '/customer';

const getCustomers = async (companyId) =>
  await fetchJSON(`${router}/getAllCustomers?companyId=${companyId}`);

const getCustomersLength = async (companyId) => {
  const { data } = await getCustomers(companyId);
  return data.length;
};

const getCustomerById = async (customerId) =>
  await fetchJSON(`${router}/getCustomer?id=${customerId}`);

export {
  getCustomers,
  getCustomersLength,
  getCustomerById,
}