import { clickFunc,
  insertHTMLIntoDiv,
  search,
  formatSearchData } from '../../util/page-func-util.js';
import { getCustomerById, getCustomers } from '../api/customerAPI.js';
import CustomerForm from '../CustomerForm.js';
import { lockCustomer } from './customer-func.js';

const customerHTML = ({ 
  _id,
  firstName,
  lastName,
  email,
  phone,
  address
}) => `
<li class="customerLi">
  <span class="name">
    ${firstName} ${lastName}
  </span>
  <span class="email">
    ${email}
  </span>
  <span class="phone">
    ${phone}
  </span>
  <span class="address">
    ${address}
  </span>
  <span class="btns">
    <button data-id="${_id}" class="edit btn">Edit</button>
    <button data-id="${_id}" class="lock btn openConfirmBtns">Lock</button>
  </span>
</li>`;

const insertTotalCustomers = (data) => {
  const unLockedCustomers = data.filter(customer => !customer.isLocked);
  const lockedCustomers = data.filter(customer => customer.isLocked);
  const customerTotal = document.querySelector('.customerTotal');
  const lockedTotalSpan = document.querySelector('.lockedTotalSpan');
  const unlockedTotalSpan = document.querySelector('.unlockedTotalSpan');
  customerTotal.innerHTML = data.length;
  lockedTotalSpan.innerHTML = lockedCustomers.length;
  unlockedTotalSpan.innerHTML = unLockedCustomers.length;
};

const openAddForm = (addEditFormDiv) => {
  const moveToAddCustomerPage = document.querySelector('#moveToAddCustomerPage');
  moveToAddCustomerPage.addEventListener('click', () => {
    const customerForm = new CustomerForm(addEditFormDiv, 'add', {});
    customerForm.show();
  });
};

const editLockBtnFunc = (div) => {
  const editBtns = document.querySelectorAll('.edit');
  const lockBtns = document.querySelectorAll('.lock');
  editBtns.forEach(btn => btn.addEventListener('click', async () => {
    const { data } = await getCustomerById(btn.dataset.id);
    const customerForm = new CustomerForm(div, 'edit', data);
    customerForm.show();
  }));
  lockBtns.forEach(btn => btn.addEventListener('click', () => {
    clickFunc(btn, async () => await lockCustomer(btn.dataset.id));
  }));
};

const quickLockedFilter = (customerUl, data, addEditFormDiv) => {
  const lockedFilterBtn = document.querySelector('.lockedFilterBtn');
  clickFunc(lockedFilterBtn, () => {
    insertHTMLIntoDiv(customerUl, data, customerHTML);
    editLockBtnFunc(addEditFormDiv);
  });
};

const quickUnLockedFilter = (customerUl, data, addEditFormDiv) => {
  const unlockedFilterBtn = document.querySelector('.unlockedFilterBtn');
  clickFunc(unlockedFilterBtn, () => {
    insertHTMLIntoDiv(customerUl, data, customerHTML);
    editLockBtnFunc(addEditFormDiv);
  });
};

const filterFunc = (data, customerUl, addEditFormDiv) => {
  const searchBtn = document.querySelector('.searchBtn');
  clickFunc(searchBtn, () => {
    const searchInput = document.querySelector('#searchInput').value;
    const searchData = formatSearchData(
      data,
      (string) => string.toLowerCase().split(' '),
      (string) => string.toLowerCase());
    const filter = search(searchData, searchInput.toLowerCase());
    const formData = formatSearchData(
      filter,
      (array) => array.join(' '),
      (string) => string.charAt(0).toUpperCase() + string.slice(1));
    insertHTMLIntoDiv(customerUl, formData, customerHTML);
    insertTotalCustomers(filter);
    editLockBtnFunc(addEditFormDiv);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const customerUl = document.querySelector('#customerUl');
  const addEditFormDiv = document.querySelector('#addEditForm');
  const companyId = document.querySelector('#container').dataset.id;
  const { data } = await getCustomers(companyId);
  const unLockedCustomers = data.filter(customer => !customer.isLocked);

  insertTotalCustomers(data);
  openAddForm(addEditFormDiv);
  insertHTMLIntoDiv(customerUl, unLockedCustomers, customerHTML);
  editLockBtnFunc(addEditFormDiv);
  quickLockedFilter(customerUl, data, addEditFormDiv);
  quickUnLockedFilter(customerUl, data, addEditFormDiv);
  filterFunc(data, customerUl, addEditFormDiv);
});