import { 
  insertHTMLIntoDiv,
  search,
  lowerCaseData,
  confirmOpen,
 } from '../../util/page-func-util.js';
import {
  incrementDecrementPage,
  displaySelectedItem,
  getPageDots
} from '../../util/pagination.js';
import { 
  getCustomerById,
  getCustomers } from '../api/customerAPI.js';
import CustomerForm from '../CustomerForm.js';
import { 
  lockCustomer,
  sampleDataInit,
  deleteCustomers } from './customer-func.js';

const numOfItemPerPage = 10;
let currentPage = 1;

const customerHTML = ({ 
  _id,
  firstName,
  lastName,
  email,
  phone,
  street1,
  city1,
  province1
}) => `
<li class="customerLi">
  <span class="name">
    ${ firstName } ${ lastName }
  </span>
  <span class="email">
    ${ email }
  </span>
  <span class="phone">
    ${ phone }
  </span>
  <span class="address1">
    ${ street1 } ${ city1 } ${ province1 }
  </span>
  <span class="btns">
    <button data-id="${_id}" class="detail btn cusBtn">Detail</button>
    <button data-id="${_id}" class="edit btn cusBtn">Edit</button>
    <button data-id="${_id}" class="lock btn openConfirmBtns cusBtn">Lock</button>
  </span>
</li>`;

const insertTotalCustomers = (
  data,
  unLockedCustomers,
  lockedCustomers
  ) => {
  const customerTotal = document.querySelector('.customerTotal');
  const lockedTotalSpan = document.querySelector('.lockedTotalSpan');
  const unlockedTotalSpan = document.querySelector('.unlockedTotalSpan');
  customerTotal.innerHTML = data.length;
  lockedTotalSpan.innerHTML = lockedCustomers.length;
  unlockedTotalSpan.innerHTML = unLockedCustomers.length;
};

const clickEvent = async (
    target,
    unLockedCustomers,
    lockedCustomers,
    customerUl,
    incrementBtns,
    decrementBtns,
    customerPageDotsDiv,
    addEditFormDiv
  ) => {

    if(target.matches('.incrementBtns')) {
      currentPage++;
      incrementDecrementPage(
        'increment',
        incrementBtns,
        decrementBtns,
        currentPage,
        unLockedCustomers,
        numOfItemPerPage,
        customerPageDotsDiv,
        customerUl,
        customerHTML
      );
    }

    if(target.matches('.decrementBtns')) {
      currentPage--;
      incrementDecrementPage(
        'decrement',
        incrementBtns,
        decrementBtns,
        currentPage,
        unLockedCustomers,
        numOfItemPerPage,
        customerPageDotsDiv,
        customerUl,
        customerHTML
      );
    }

    if(target.matches('#moveToAddCustomerPage')) {
      const customerForm = new CustomerForm(addEditFormDiv, 'add', {});
      customerForm.show();
    }

    if(target.matches('.lockedFilterBtn')) {
      insertHTMLIntoDiv(customerUl, lockedCustomers, customerHTML);
      editLockBtnFunc(addEditFormDiv);
    }

    if(target.matches('.unLockedFilterBtn')) {
      insertHTMLIntoDiv(customerUl, unLockedCustomers, customerHTML);
      editLockBtnFunc(addEditFormDiv);
    }

    if(target.matches('.searchBtn')) {
      const searchInput = document.querySelector('#searchInput').value.toLowerCase();
      const filteredData = search(lowerCaseData(data), searchInput);
      insertHTMLIntoDiv(customerUl, filteredData, customerHTML);
      insertTotalCustomers(filteredData);
      editLockBtnFunc(addEditFormDiv);
    }

    if(target.matches('.edit')) {
      const { data } = await getCustomerById(target.dataset.id);
      const customerForm = new CustomerForm(addEditFormDiv, 'edit', data);
      customerForm.show();
    }

    if(target.matches('.lock')) {
      await lockCustomer(target.dataset.id);
    }
};

const customerPageInit = (
  data,
  unLockedCustomers,
  lockedCustomers,
  customerUl,
  customerPageDotsDiv
  ) => {

  insertTotalCustomers(data, unLockedCustomers, lockedCustomers);

  displaySelectedItem(
    unLockedCustomers,
    numOfItemPerPage,
    customerUl,
    customerHTML,
    currentPage);

  getPageDots(
    customerPageDotsDiv,
    unLockedCustomers,
    numOfItemPerPage,
    currentPage);
};


document.addEventListener('DOMContentLoaded', async () => {
  const customerUl = document.querySelector('#customerUl');
  const companyId = document.querySelector('#container').dataset.id;
  const { data } = await getCustomers(companyId);
  const unLockedCustomers = data.filter(customer => !customer.isLocked);
  const lockedCustomers = data.filter(customer => customer.isLocked);
  const incrementBtns = document.querySelector('.incrementBtns');
  const decrementBtns = document.querySelector('.decrementBtns');
  const addEditFormDiv = document.querySelector('#addEditForm');

  customerPageInit(
    data,
    unLockedCustomers,
    lockedCustomers,
    customerUl,
    customerPageDotsDiv
  );

  document.addEventListener('click', ({target}) => {
    clickEvent(
      target,
      unLockedCustomers,
      lockedCustomers,
      customerUl,
      incrementBtns,
      decrementBtns,
      customerPageDotsDiv,
      addEditFormDiv
    );
  });

  // for test only | delete all customers and insert sample customers
  const deleteBtn = document.querySelector('#deleteCustomers');
  const addSampleBtn = document.querySelector('#addSampleData');
  deleteBtn.addEventListener('click', async () => {
    await deleteCustomers();
  });
  addSampleBtn.addEventListener('click', async () => {
    await sampleDataInit();
  });
});