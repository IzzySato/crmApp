import {
  fetchJSON,
  editFetch,
  editField,
} from './fetch.js';

const router = 'company';

const getCompanies = async () => {
  const { data } = await fetchJSON(`/${router}/getAllcompanies`);
  return data;
};

const addEditCompany = async (newCompany) => {
  const formData = new FormData();
  Object.entries(newCompany).forEach(([key, value]) => formData.append(key, value));
  const options = {
    method: 'POST',
    body: formData,
  };
  await fetch(`/${router}/${(newCompany._id) ? 'edit' : 'add'}`, options);
}
  
const getCompanyById = async (companyId) => 
  await fetchJSON(`/${router}/getCompanyById?companyId=${companyId}`);

const addAvaiableTag = async ({companyId, newTag}) =>
  await editField(`/${router}/tag-add?companyId=${companyId}&tag=${newTag}`);

const addPermission = async ({companyId, permission}) =>
  await editField(`/${router}/permission-add?companyId=${companyId}&permission=${permission}`);

const removePermission = async ({companyId, permission}) =>
  await editField(`/${router}/permission-add?companyId=${companyId}&permission=${permission}`);

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
  addEditCompany,
  getCompanyById,
  addAvaiableTag,
  removeAvaiableTag,
  updateAvaiableTag,
  addPermission,
  removePermission
}