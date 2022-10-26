import { addFetch, deleteFetch } from '../api/fetch.js';
import sampleData from './sampleData.json' assert {type: "json"};
const router = 'customer';

const sampleDataInit = () => {
  console.log(sampleData);
  Promise.all(sampleData.map(async (customer) => await addFetch(customer, `${router}/add`)));
};

const deleteCustomers = async () => {
  await deleteFetch(`${router}/delete`);
};

export {
  sampleDataInit,
  deleteCustomers
}