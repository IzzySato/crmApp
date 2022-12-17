import { addAvaiableTag, addEditCompany, getCompanyById, removeAvaiableTag, updateAvaiableTag } from '../../api/companyAPI.js';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductByProductId } from '../../api/productAPI.js';
import { addService, deleteService, editService, getServicesByCompanyId } from '../../api/serviceAPI.js';
import CompanyForm from '../../forms/childForms/CompanyForm.js';
import ProductForm from '../../forms/childForms/ProductForm.js';
import Form from '../../forms/Form.js';
import { businessInfo, productList, serviceList, tagList } from '../../htmlTemplate/configHtml.js';

const serviceUl = document.querySelector('.serviceUl');
const tagUl = document.querySelector('.tagUl');
const businessInfoDiv = document.querySelector('.businessInfoDiv');
const companyId = document.querySelector('#container').dataset.id;
let company = {};

const configInit = async (companyId) => {
  const productUl = document.querySelector('.productUl');
  const { data } = await getServicesByCompanyId(companyId);
  const products = await getAllProducts(companyId);
  company = await getCompanyById(companyId);
  serviceUl.innerHTML = data.map((service) => serviceList(service)).join('');
  tagUl.innerHTML = company.avaiableTags.map((tag) => tagList(tag)).join('');
  businessInfoDiv.innerHTML = businessInfo(company);
  productUl.innerHTML = (products.data.length > 0) ? products.data.map((product) => productList(product)).join('') : '';
};

const clickEvent = async (
  target
) => {
  if(target.matches('.companyEdit, .companyEditIcon')) {
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
        newData.permissions = company.permissions;
        newData.date = company.date;
      },
      successMsg: () => `updated your business info`
    };
    const Company = new CompanyForm(companyInfo);
    Company.showForm();
  }

  if(target.matches('.companyDetail, .companyDetailIcon')) {
    const Company = new CompanyForm({
      crud: 'detail',
      data: {
        current: company
      }
    });
    Company.showDetail();
  }

  if(target.matches('#addServiceBtn, #addServiceBtnIcon')) {
    const service = {
      router: 'config',
      crud: 'add',
      data: {
        placeholder: 'Renovation',
        validator: (val) => val.length > 0,
      },
      itemName: 'service',
      submitFunc: addService,
      onBeforeSubmitFunc: (newData) => newData.companyId = companyId,
      successMsg: ({name}) => `added service ${name}`
    };
    const ServiceForm = new Form(service);
    ServiceForm.showForm();
  }

  if(target.matches('.serviceEdit, .serviceEditIcon')) {
    const service = {
      data: {
        _id: target.dataset.id,
        name: target.dataset.name,
        validator: (val) => val.length > 0,
      },
      router: 'config',
      crud: 'edit',
      itemName: 'service',
      submitFunc: editService,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId,
        newData.id = target.dataset.id
      },
      successMsg: ({name}) => `eddited service ${name}`
    };
    const ServiceForm = new Form(service);
    ServiceForm.showForm();
  }

  if(target.matches('.serviceDelete, .serviceDeleteIcon')) {
    const service = { 
      data: {
        _id: target.dataset.id,
      },
      itemName: 'service',
      router: 'config',
      crud: 'delete',
      submitFunc: deleteService,
      onBeforeSubmitFunc: (newData) => {
        newData.id = target.dataset.id
      },
      successMsg: () => `deleted service ${target.dataset.name}`
    };
    const ServiceForm = new Form(service);
    ServiceForm.delete();
  }

  if(target.matches('#addTagBtn, #addTagBtnIcon')) {
    const tagInfo = {
      router: 'config',
      crud: 'add',
      itemName: 'tag',
      data: {
        placeholder: 'local',
        validator: (val) => val.length > 0,
      },
      submitFunc: addAvaiableTag,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId,
        newData.newTag = newData.name
      },
      successMsg: ({name}) => `added tag ${name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.showForm();
  }

  if(target.matches('.tagEdit, .tagEditIcon')) {
    const tagInfo = {
      router: 'config',
      crud: 'edit',
      data: {
        _id: target.dataset.id,
        name: target.dataset.name,
        validator: (val) => val.length > 0,
      },
      itemName: 'tag',
      submitFunc: updateAvaiableTag,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId;
        newData.avaiableTags = company.avaiableTags;
        newData.newTag = newData.name;
        newData.oldTag = target.dataset.name;
      },
      successMsg: ({name}) => `updated tag ${name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.showForm();
  }

  if(target.matches('.tagDelete, .tagDeleteIcon')) {
    const tagInfo = { 
      itemName: 'tag',
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
      },
      router: 'config',
      crud: 'delete',
      submitFunc: removeAvaiableTag,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId;
        newData.removeTag = target.dataset.name;
      },
      successMsg: () => `deleted tag ${target.dataset.name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.delete();
  }

  if(target.matches('#addProductBtnIcon, #addProductBtn')) {
    const Product = new ProductForm({
      crud: 'add',
      submitFunc: addProduct,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId;
      },
      successMsg: () => `added product ${target.dataset.name}`
    });
    Product.showForm();
  }

  if(target.matches('.productDetail, .productDetailIcon')) {
    const { data } = await getProductByProductId(target.dataset.id);
    const Product = new ProductForm({
      crud: 'detail',
      data: {
        current: data
      }
    });
    Product.showDetail();
  }

  if(target.matches('.productEdit, .productEditIcon')) {
    const { data } = await getProductByProductId(target.dataset.id);
    const Product = new ProductForm({
      crud: 'edit',
      submitFunc: editProduct,
      data: {
        current: data
      },
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId;
        newData.id = target.dataset.id;
      },
      successMsg: () => `updated product ${target.dataset.name}`
    });
    Product.showForm();
  }

  if(target.matches('.productDelete, .productDeleteIcon')) {
    const Product = new ProductForm({
      crud: 'delete',
      submitFunc: deleteProduct,
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
      },
      onBeforeSubmitFunc: (newData) => {
        newData.id = target.dataset.id;
      },
      successMsg: () => `deleted product ${target.dataset.name}`
    });
    Product.delete();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  configInit(companyId);
  document.addEventListener('click', ({ target }) => {
    clickEvent(
      target
    );
  });
});