import { insertHTMLIntoDiv } from '../../../util/page-func-util.js';
import { getCompanies, addEditCompany, addPermission } from '../../api/companyAPI.js';
import { companyList } from '../../htmlTemplate/dev.js';
import CompanyForm from '../../forms/childForms/CompanyForm.js';
import CompanyPermission from '../../forms/childForms/companyPermission.js';

const data = {};

const devPageInit = async () => {
  const companies = await getCompanies();
  data.companies = companies;
  const companyUl = document.querySelector('#companyUl');
  const totalCompanyNum = document.querySelector('#totalCompanyNum');
  insertHTMLIntoDiv(companyUl, data.companies, companyList);
  totalCompanyNum.innerHTML = `Total: ${data.companies.length}`;
}

const clickEvent = async (target) => {
  if(target.matches('#addCompany, #addCompanyIcon')) {
    const companyInfo = {
      crud: 'add',
      router: 'dev',
      data: {
      },
      submitFunc: addEditCompany,
      onBeforeSubmitFunc: (newData) => {
      },
      successMsg: ({businessName}) => `added a new company ${businessName}`
    };
    const Company = new CompanyForm(companyInfo);
    Company.showForm();
  }

  if(target.matches('.devDetail, .devDetailIcon')) {
    const id = target.dataset.id;
    const company = data.companies.filter((company) => company._id === id)[0];
    const companyInfo = {
      crud: 'detail',
      data: {
        current: company
      }
    };
    const CompanyDetail = new CompanyForm(companyInfo);
    CompanyDetail.showDetail();
  }

  if(target.matches('.devEdit, .devEditIcon')) {
    const id = target.dataset.id;
    const company = data.companies.filter((company) => company._id === id)[0];
    const companyInfo = {
      crud: 'edit',
      router: 'config',
      data: {
        current: company,
      },
      submitFunc: addEditCompany,
      onBeforeSubmitFunc: (newData) => {
        newData._id = target.dataset.id;
        newData.avaiableTags = company.avaiableTags;
        newData.date = company.date;
      },
      successMsg: () => `updated your business info`
    };
    const Company = new CompanyForm(companyInfo);
    Company.showForm();
  }

  if(target.matches('.devPermission, .devPermissionIcon')) {
    const id = target.dataset.id;
    const company = data.companies.filter((company) => company._id === id)[0];
    const companyInfo = {
      router: 'dev',
      data: {
        permissions: company.permissions,
        placeholder: 'owner',
        validator: (val) => val.length > 0,
      },
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = id,
        newData.name = newData.name
      },
    };
    const CompanyPermissionForm = new CompanyPermission(companyInfo);
    CompanyPermissionForm.displayPermissionForm();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await devPageInit();
  document.addEventListener('click', ({target}) => {
    clickEvent(target);
  });
});

export {
  getCompanies,
}