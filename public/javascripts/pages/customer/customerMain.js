import { exportPDF } from '../../../util/export-pdf.js';
import { lowerCaseCustomerData } from '../../../util/format-data.js';
import {
  search, sort,
} from '../../../util/page-func-util.js';
import {
  displayPagination
} from '../../../util/pagination.js';
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
  getCustomerById,
  getCustomers,
} from '../../api/customerAPI.js';
import {
  getCompanyById
} from '../../api/companyAPI.js';
import {
  deleteCustomers,
  sampleDataInit
} from '../../developmentOnly/customerDevelopment.js';
import CustomerForm from '../../forms/childForms/CustomerForm.js';

const pageName = 'customer';
let currentPage = 1;
let selectedCustomers = [];
let allCustomers = [];

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

const searchFunc = (unLockedCustomers) => {
  const searchInput = document.querySelector('#searchInput').value.toLowerCase();
  if(searchInput === '') {
    selectedCustomers = unLockedCustomers;
  } else {
    selectedCustomers = search(lowerCaseCustomerData(selectedCustomers), searchInput);
  }

  displayPagination(
    currentPage,
    selectedCustomers,
    pageName);

  insertTotalCustomers(selectedCustomers);
};

const clickEvent = async (
  target,
  avaiableTags
) => {

  if (target.matches('.nextDiv, .fa-chevron-right, .nextP')) {
    currentPage++;
    displayPagination(
      currentPage,
      selectedCustomers,
      pageName
    );
  }

  if (target.matches('.prevDiv, .fa-chevron-left, .prevP')) {
    currentPage--;
    displayPagination(
      currentPage,
      selectedCustomers,
      pageName
    );
  }

  if(target.matches('.pageNum')) {
    const skipTo = target.dataset.page;
    currentPage = Number(skipTo);
    displayPagination(
      currentPage,
      selectedCustomers,
      pageName);
  }

  const sortUl = document.querySelector('.sortByUl');

  if (target.matches('.sortDiv, .sortP, .sortDownIcon, .fa-arrow-down-a-z, .sortText')) {
    console.log('sort');
    sortUl.classList.toggle('openSortByUl');
  }

  if (target.matches('.sortLi')) {
    const sortBy = target.dataset.name;
    sort(selectedCustomers, sortBy);
    displayPagination(
      currentPage,
      selectedCustomers,
      pageName);
    sortUl.classList.remove('openSortByUl');
  }

  const filterUlDiv = document.querySelector('.filterUlDiv');

  if (target.matches('.filterDiv, .filterUlDiv, .filterP, .fa-filter, .filterDownIcon, .filterText')) {
    filterUlDiv.classList.toggle('openFilterUl');
  }

  if (target.matches('.filterLi')) {
    const filterBy = target.dataset.name;
    const field = target.dataset.field;
    selectedCustomers = allCustomers.filter((customer) => (field === 'tags') ?
      customer[field].includes(filterBy) : customer[field].toLowerCase() === filterBy);
      displayPagination(
        currentPage,
        selectedCustomers,
        pageName);

    insertTotalCustomers(selectedCustomers);
    filterUlDiv.classList.remove('openFilterUl');
  }

  if(target.matches('.placeHolders, .serachIcon')) {
    searchFunc();
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

  if (target.matches('.addCustomerBtn, .addIcon')) {
    const customerInfo = {
      crud: 'add',
      data: {
        avaiableTags,
      },
      submitFunc: addCustomer,
      successMsg: (newCustomer) => `added a new customer ${newCustomer.firstName} ${newCustomer.lastName}`,
      onBeforeSubmitFunc: (newCustomer) => {
        newCustomer.isLocked = false;
        if (!newCustomer.province1) {
          newCustomer.province1 = 'BC';
        }
      },
    };
    const CustomerAddForm = new CustomerForm(customerInfo);
    CustomerAddForm.showForm();
  }

  if (target.matches('.edit, .editIcon')) {
    const customerId = target.dataset.id;
    const { data } = await getCustomerById(customerId);
    const customerInfo = {
      crud: 'edit',
      data: {
        current: data,
        avaiableTags,
      },
      submitFunc: editCustomer,
      onBeforeSubmitFunc: (newData) => {
        newData.id = target.dataset.id;
      },
      successMsg: (customer) => `update the customer ${customer.firstName} ${customer.lastName}`,
    };
    const CustomerEditForm = new CustomerForm(customerInfo);
    CustomerEditForm.showForm();
  }

  if (target.matches('.detail, .detailIcon')) {
    const { data } = await getCustomerById(target.dataset.id);
    const customerInfo = {
      crud: 'detail',
      data: {
        current: data,
        avaiableTags,
      },
    };
    const customerDetail = new CustomerForm(customerInfo);
    customerDetail.showDetail();
  }

  if (target.matches('.delete, .deleteIcon')) {
    const customerInfo = {
      crud: 'delete',
      data: {
        _id: target.dataset.id,
        name: target.dataset.name
      },
      onBeforeSubmitFunc: (newData) => {
        newData._id = target.dataset.id;
      },
      submitFunc: deleteCustomer,
      successMsg: () => `deleted the customer ${target.dataset.name}`,
    };
    const CustomerDeleteForm = new CustomerForm(customerInfo);
    CustomerDeleteForm.delete();
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
  displayPagination(
    currentPage,
    selectedCustomers,
    pageName);
};

document.addEventListener('DOMContentLoaded', async () => {
  const companyId = document.querySelector('#container').dataset.id;
  const { avaiableTags } = await getCompanyById(companyId);
  const customers = await getCustomers(companyId);
  const unLockedCustomers = customers.data.filter(customer => !customer.isLocked);
  selectedCustomers = unLockedCustomers;
  allCustomers = unLockedCustomers;

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

  document.addEventListener('keypress', (e) => {
    if (e.target.matches('#searchInput') && e.key === 'Enter') {
      searchFunc(unLockedCustomers);
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