import { exportPDF } from '../../../util/export-pdf.js';
import { lowerCaseCustomerData } from '../../../util/format-data.js';
import {
  search, sort,
} from '../../../util/page-func-util.js';

import {
  incrementDecrementPage,
  displaySelectedItem,
  getPageDots
} from '../../../util/pagination.js';

import {
  getCustomerById,
  getCustomers,
} from '../../api/customerAPI.js';

import {
  getCompanyById
} from '../../api/companyAPI.js';

import CustomerDelete from '../../CustomerDelete.js';
import CustomerDetail from '../../CustomerDetail.js';
import CustomerForm from '../../CustomerForm.js';

import {
  deleteCustomers,
  sampleDataInit
} from '../../developmentOnly/customerDevelopment.js';

const pageName = 'customer';
let currentPage = 1;
let selectedCustomers = [];

const insertTotalCustomers = (
  data
) => {
  const customerTotal = document.querySelector('.customerTotal');
  customerTotal.innerHTML = data.length;
};

const insertTagsToFilter = (avaiableTags) => {
  const tagUl = document.querySelector('.filterTagUl');
  tagUl.innerHTML = avaiableTags.map((tag) =>
    `<li data-field="tags" data-name="${tag}" class="filterLi">${tag}</li>`).join('');
};

const clickEvent = async (
  target,
  avaiableTags
) => {

  if (target.matches('.incrementBtns, .fa-forward')) {
    currentPage++;
    incrementDecrementPage(
      'increment',
      currentPage,
      selectedCustomers,
      pageName
    );
  }

  if (target.matches('.decrementBtns, .fa-backward')) {
    currentPage--;
    incrementDecrementPage(
      'decrement',
      currentPage,
      selectedCustomers,
      pageName
    );
  }

  const sortUl = document.querySelector('.sortByUl');

  if (target.matches('.sortDiv, .sortP, .sortDownIcon .fa-arrow-down-a-z')) {
    sortUl.classList.toggle('openSortByUl');
  }

  if (target.matches('.sortLi')) {
    const sortBy = target.dataset.name;
    sort(selectedCustomers, sortBy);
    console.log('after');
    displaySelectedItem(
      selectedCustomers,
      pageName,
      currentPage);
    sortUl.classList.remove('openSortByUl');
  }

  const filterUlDiv = document.querySelector('.filterUlDiv');

  if (target.matches('.filterDiv, .filterUlDiv, .filterP, .fa-filter, .filterDownIcon')) {
    filterUlDiv.classList.toggle('openFilterUl');
  }

  if (target.matches('.filterLi')) {
    const filterBy = target.dataset.name;
    const field = target.dataset.field;
    selectedCustomers = selectedCustomers.filter((customer) => (field === 'tags') ?
      customer[field].includes(filterBy) : customer[field].toLowerCase() === filterBy);
    displaySelectedItem(
      selectedCustomers,
      pageName,
      currentPage);

    getPageDots(
      selectedCustomers,
      pageName,
      currentPage);

    insertTotalCustomers(selectedCustomers);

    filterUlDiv.classList.remove('openFilterUl');
  }

  if (target.matches('#exportCustomerBtn')) {
    const formatter = ({
      firstName,
      lastName,
      email,
      phone,
      street1,
      city1
    }) => `${firstName} ${lastName} | ${email} | ${phone} | ${street1} ${city1}`;
    exportPDF(selectedCustomers, formatter, 'customers');
  }

  const addEditFormDiv = document.querySelector('#addEditForm');

  if (target.matches('#moveToAddCustomerPage')) {
    const customerForm = new CustomerForm(avaiableTags, addEditFormDiv, 'add', {}, 'Add the customer?');
    customerForm.show();
  }

  if (target.matches('.edit, .editIcon')) {
    const customerId = target.dataset.id;
    const { data } = await getCustomerById(customerId);
    const customerForm = new CustomerForm(avaiableTags, addEditFormDiv, 'edit', data, 'Edit the customer?');
    customerForm.show();
  }

  if (target.matches('.detail, .detailIcon')) {
    const detailDiv = document.querySelector('#detailDiv');
    const { data } = await getCustomerById(target.dataset.id);
    const customerDetail = new CustomerDetail(detailDiv, data);
    customerDetail.show();
  }

  if (target.matches('.delete, .deleteIcon')) {
    const customerDelete = new CustomerDelete('Delete the customer? <span class="deleteNotes">*The data will be still there but you cannot see on the table. To see deleted customer go to configuration/customers</span>');
    customerDelete.show();
  }

  if (target.matches('.moreDots, .moreDotsIcon')) {
    const customerId = target.dataset.id;
    const tagContainer = document.querySelector(`#tag${customerId}`);
    const moreIcon = document.querySelector(`#moreDots${customerId}`);
    tagContainer.classList.add('visibleTag');
    moreIcon.classList.add('hideMoreDots');
  }
};

const customerPageInit = (
  data,
  avaiableTags
) => {

  insertTotalCustomers(data);
  insertTagsToFilter(avaiableTags);
  displaySelectedItem(
    data,
    pageName,
    currentPage);

  getPageDots(
    data,
    pageName,
    currentPage);
};

document.addEventListener('DOMContentLoaded', async () => {
  const companyId = document.querySelector('#container').dataset.id;
  const { avaiableTags } = await getCompanyById(companyId);
  const customers = await getCustomers(companyId);
  selectedCustomers = customers.data.filter(customer => !customer.isLocked);

  customerPageInit(
    selectedCustomers,
    avaiableTags
  );

  document.addEventListener('click', ({ target }) => {
    clickEvent(
      target,
      avaiableTags,
    );
  });

  document.addEventListener('keypress', ({ target }) => {
    if (target.matches('#searchInput')) {
      const searchInput = document.querySelector('#searchInput').value.toLowerCase();
      selectedCustomers = search(lowerCaseCustomerData(selectedCustomers), searchInput);

      displaySelectedItem(
        selectedCustomers,
        pageName,
        currentPage);

      getPageDots(
        selectedCustomers,
        pageName,
        currentPage);

      insertTotalCustomers(selectedCustomers);
    }
  });

  // for test only | delete all customers and insert sample customers


  // const deleteBtn = document.querySelector('#deleteCustomers');
  // const addSampleBtn = document.querySelector('#addSampleData');
  // deleteBtn.addEventListener('click', async () => {
  //   await deleteCustomers();
  // });
  // addSampleBtn.addEventListener('click', () => {
  //   sampleDataInit();
  // });
});