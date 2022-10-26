import {
  fetchJSON,
  addFetch,
} from './fetch.js';

const router = 'company';

const getCompanies = async () => {
  const { data } = await fetchJSON(`/${router}/getAllcompanies`);
  return data;
};

const addCompany = async (newCompany) =>
  await addFetch(newCompany, `/${router}/add`);
  

const getCompanyById = async (companyId) => 
  await fetchJSON(`/${router}/getCompanyById?companyId=${companyId}`);

export {
  getCompanies,
  getCompanyById,
  addCompany,
}