import {
  fetchJSON,
  addFetch,
  editFetch,
  editField,
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

const addAvaiableTag = async ({companyId, newTag}) =>
  await editField(`/${router}/tag-add?companyId=${companyId}&tag=${newTag}`);

const updateAvaiableTag = async ({companyId, avaiableTags, oldTag, newTag}) => {
  const data = {companyId};
  const tagArray = avaiableTags.filter((tag) => tag !== oldTag);
  data.tags = [...tagArray, newTag];
  await editFetch(data, `/${router}/tag-edit`);
};

const removeAvaiableTag = async ({companyId, removeTag}) =>
  await editField(`/${router}/tag-remove?companyId=${companyId}&tag=${removeTag}`);

export {
  getCompanies,
  editCompany,
  getCompanyById,
  addCompany,
  addAvaiableTag,
  removeAvaiableTag,
  updateAvaiableTag
}