import { clickFunc, insertHTMLIntoDiv } from '../../util/page-func-util.js';
import { addFetch } from '../api/fetch.js';
import { getCompanies } from './company.js';

const data = {};

const addCompany = async () => {
  const newCompany = {
    businessName: businessNameInput.value
  };
  const { success } = await addFetch(newCompany, `/company/add`);
  if(success) {
    businessNameInput.value = '';
  }
};

const optionHTML = ({ businessName }) => `
<option value="${businessName}">${businessName}</option>
`;

document.addEventListener('DOMContentLoaded', async () => {
  data.companies = await getCompanies();
  const addCompanyBtn = document.querySelector('#addCompanyBtn');
  const companySelect = document.querySelector('#companySelect');

  if(addCompanyBtn) {
    clickFunc(addCompanyBtn, addCompany);
  }
  if(companySelect) {
    insertHTMLIntoDiv(companySelect, data.companies, optionHTML);
  }
});