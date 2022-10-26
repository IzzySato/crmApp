import { formatCompanyData } from '../../../util/format-data.js';
import { insertHTMLIntoDiv } from '../../../util/page-func-util.js';
import { addCompany } from '../../api/companyAPI.js';
import { getCompanies } from './devMain.js';

const data = {};

const optionHTML = ({ businessName }) => `
<option value="${businessName}">${businessName}</option>
`;

const clickEvent = async (target) => {
  if(target.matches('#addCompanyBtn')) {
    const businessName = document.querySelector('#businessName');
    const address = document.querySelector('#address');
    const phone = document.querySelector('#phone');
    const tags = document.querySelector('#tags');
    const tagsArray = tags.value.split(',');

    const newCompany = {
      businessName: businessName.value,
      avaiableTags: tagsArray,
      address: address.value,
      phone: phone.value
    };
    
    await addCompany(newCompany);
    businessName.value = '';
    address.value = '';
    phone.value = '';
    tags.value = '';
  }
  if(target.matches('#companySelect')){
    insertHTMLIntoDiv(companySelect, data.companies, optionHTML, formatCompanyData);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  data.companies = await getCompanies();

  document.addEventListener('click', ({target}) => {
    clickEvent(target);
  });
});