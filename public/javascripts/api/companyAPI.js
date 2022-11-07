import {
  fetchJSON,
  addFetch,
  editFetch,
} from './fetch.js';

const router = 'company';

const getCompanies = async () => {
  const { data } = await fetchJSON(`/${router}/getAllcompanies`);
  return data;
};

const addCompany = async (newCompany) =>
  await addFetch(newCompany, `/${router}/add`);

const editCompany = async (newCompany) =>
  await editFetch(newCompany, `/${router}/edit`);
  
const getCompanyById = async (companyId) => 
  await fetchJSON(`/${router}/getCompanyById?companyId=${companyId}`);

const addAvaiableTag = async ({company, newTag}) => {
  company.avaiableTags = [...company.avaiableTags, newTag];
  await editCompany(company);
};

const updateAvaiableTag = async ({company, oldTag, newTag}) => {
  company.avaiableTags = company.avaiableTags.filter((tag) => tag !== oldTag);
  company.avaiableTags = [...company.avaiableTags, newTag];
  await editCompany(company);
};

const removeAvaiableTag = async ({company, removeTag}) => {
  company.avaiableTags = company.avaiableTags.filter((tag) => tag !== removeTag);
  await editCompany(company);
};

export {
  getCompanies,
  editCompany,
  getCompanyById,
  addCompany,
  addAvaiableTag,
  removeAvaiableTag,
  updateAvaiableTag
}