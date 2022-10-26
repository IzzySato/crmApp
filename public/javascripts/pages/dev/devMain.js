import { insertHTMLIntoDiv } from '../../../util/page-func-util.js';
import { getCompanies } from '../../api/companyAPI.js';

const data = {};

const companyHTML = ({businessName}) => `
<li class="companyGrid">
  <div class="companyInfo">
    <div class="name">
      ${businessName}
    </div>
  </div>
  <div>
    <button class="edit btn">Edit</button>
    <button class="lock btn">Lock</button>
  </div>
</li>
`;

document.addEventListener('DOMContentLoaded', async () => {
  const companies = await getCompanies();
  data.companies = companies;
  const companyUl = document.querySelector('#companyUl');
  const totalCompanyNum = document.querySelector('#totalCompanyNum');

  if(companyUl) {
    insertHTMLIntoDiv(companyUl, data.companies, companyHTML);
  }
  if(totalCompanyNum) {
    totalCompanyNum.innerHTML = `Total: ${data.companies.length}`;
  }
});

export {
  getCompanies,
}