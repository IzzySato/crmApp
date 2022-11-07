import { addAvaiableTag, getCompanyById, removeAvaiableTag, updateAvaiableTag } from '../../api/companyAPI.js';
import { getAllProducts } from '../../api/productAPI.js';
import { addService, deleteService, editService, getServicesByCompanyId } from '../../api/serviceAPI.js';
import Form from '../../Form.js';
import { businessInfo, productList, serviceList, tagList } from '../../htmlTemplate/configHtml.js';

const serviceUl = document.querySelector('.serviceUl');
const tagUl = document.querySelector('.tagUl');
const businessInfoDiv = document.querySelector('.businessInfoDiv');
const companyId = document.querySelector('#container').dataset.id;

const configInit = async (companyId) => {
  const productUl = document.querySelector('.productUl');
  const { data } = await getServicesByCompanyId(companyId);
  const products = await getAllProducts(companyId);
  const { 
    businessName,
    address,
    phone,
    avaiableTags } = await getCompanyById(companyId);
  serviceUl.innerHTML = data.map((service) => serviceList(service)).join('');
  tagUl.innerHTML = avaiableTags.map((tag) => tagList(tag)).join('');
  businessInfoDiv.innerHTML = businessInfo(
    businessName,
    address,
    phone);
  productUl.innerHTML = (products.length > 0) ? products.map((product) => productList(product)).join('') : '';
};

const clickEvent = async (
  target
) => {
  if(target.matches('#addServiceBtn, #addServiceBtnIcon')) {
    const service = {
      router: 'config',
      crud: 'add',
      itemName: 'service',
      placeholder: 'Renovation',
      submitFunc: addService,
      onBeforeSubmitFunc: (newData) => newData.companyId = companyId,
      validator: (val) => val.length > 0,
      successMsg: ({name}) => `added service ${name}`
    };
    const ServiceForm = new Form(service);
    ServiceForm.showForm();
  }

  if(target.matches('.serviceEdit, .serviceEditIcon')) {
    const service = {
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
      },
      router: 'config',
      crud: 'edit',
      itemName: 'service',
      submitFunc: editService,
      onBeforeSubmitFunc: (newData) => {
        newData.companyId = companyId,
        newData.id = target.dataset.id
      },
      validator: (val) => val.length > 0,
      successMsg: ({name}) => `eddited service ${name}`
    };
    const ServiceForm = new Form(service);
    ServiceForm.showForm();
  }

  if(target.matches('.serviceDelete, .serviceDeleteIcon')) {
    const service = { 
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
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
    const company = await getCompanyById(companyId);
    const tagInfo = {
      router: 'config',
      crud: 'add',
      itemName: 'tag',
      placeholder: 'local',
      submitFunc: addAvaiableTag,
      onBeforeSubmitFunc: (newData) => {
        newData.company = company,
        newData.newTag = newData.name
      },
      validator: (val) => val.length > 0,
      successMsg: ({name}) => `added tag ${name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.showForm();
  }

  if(target.matches('.tagEdit, .tagEditIcon')) {
    const company = await getCompanyById(companyId);
    const tagInfo = {
      router: 'config',
      crud: 'edit',
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
      },
      itemName: 'tag',
      submitFunc: updateAvaiableTag,
      onBeforeSubmitFunc: (newData) => {
        newData.company = company;
        newData.newTag = newData.name;
        newData.oldTag = target.dataset.name;
      },
      validator: (val) => val.length > 0,
      successMsg: ({name}) => `updated tag ${name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.showForm();
  }

  if(target.matches('.tagDelete, .tagDeleteIcon')) {
    const company = await getCompanyById(companyId);
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
        newData.company = company;
        newData.removeTag = target.dataset.name;
      },
      successMsg: () => `deleted tag ${target.dataset.name}`
    };
    const TagForm = new Form(tagInfo);
    TagForm.delete();
  }

  if(target.matches('#addProductBtn, #addProductBtnIcon')) {
    const productForm = new Form('product-add', {});
    productForm.show();
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