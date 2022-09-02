import { addFetch, editFetch, deleteFetch } from '../api/fetch.js';
import Message from '../Message.js';
import {
  reguiredInputCheck,
  phoneInputCheck,
  emailInputCheck } from '../../util/input-check.js';

const router = '/customer';

const sampleDataInit = async () => {
  for(let i = 1; i <= 45; i++) {
    let customer = {
      firstName: i,
      lastName: i,
      companyId: "62e97c9162e8674da768aa84",
      email: "example@mail.com",
      phone: "000-000-0000",
      street1: "123 main",
      city1: "Vancouver",
      province1: "BC",
      street2: "",
      city2: "",
      province2: "",
      isLocked: false
    };
    await addFetch(customer, `${router}/add`);
  }
};

const deleteCustomers = async () => {
  await deleteFetch(`${router}/delete`);
};

const openMsg = (addOrEdit, success) => {
  const div = document.querySelector('#msgDiv');
  if(success) {
    const message = new Message(div,
      'success',
      `successfully ${addOrEdit} the customer`,
      'customer');
    message.show();
  } else {
    const message = new Message(div,
      'fail',
      'sorry, something went wrong, try again.',
      'customer-add');
    message.show();
  }
};

const addEditCustomer = async (addOrEdit) => {
  const firstName = document.querySelector('#customerFirstName').value;
  const lastName = document.querySelector('#customerLastName').value;
  const email = document.querySelector('#customerEmail').value;
  const phone = document.querySelector('#customerPhone').value;
  const street1 = document.querySelector('#address1street').value;
  const city1 = document.querySelector('#address1city').value;
  const province1 = document.querySelector('#provinces1').value;
  const street2 = document.querySelector('#address2street').value;
  const city2 = document.querySelector('#address2city').value;
  const province2 = document.querySelector('#provinces2').value;
  const companyId = document.querySelector('#container').dataset.id;
  const unlockedCheck = document.querySelector('.unlock');
  const selectedCheck = (unlockedCheck.checked) ? false : true;
  const id = document.querySelector('#formDiv').dataset.id;
  const inputMsgDiv = document.querySelectorAll('.inputMsgDiv');

  inputMsgDiv.forEach(div => div.innerHTML = '');
  
  reguiredInputCheck(firstName, 'first name', 'firstNameMsgDiv');
  reguiredInputCheck(lastName, 'last name', 'lastNameMsgDiv');
  reguiredInputCheck(email, 'email', 'emailMsgDiv');
  reguiredInputCheck(phone, 'phone', 'phoneMsgDiv');
  reguiredInputCheck(street1, 'street', 'streetMsgDiv');
  reguiredInputCheck(city1, 'city', 'cityMsgDiv');
  phoneInputCheck(phone, 'phoneMsgDiv');
  emailInputCheck(email, 'emailMsgDiv');

  const customer = {
    id,
    firstName,
    lastName,
    companyId,
    email,
    phone,
    street1,
    city1,
    province1: (province1 === 'select') ? '' : 'BC',
    street2,
    city2,
    province2: (province2 === 'select') ? '' : province2,
    isLocked: selectedCheck
  };

  const warningMsgDiv = document.querySelector('.warningMsgDiv');
  if(!warningMsgDiv) {
    if(addOrEdit === 'add') {
      const { success } = await addFetch(customer, `${router}/add`);
      openMsg('add', success);
      return { status: 'success' };
    } else {
      const { success } = await editFetch(customer, `${router}/edit`);
      openMsg('edit', success);
      return {  status: 'success' };
    }
  } else {
    return { status: 'fail' };
  }
};

const lockCustomer = async (id) => {
  const { success } = await editFetch({_id: id}, `${router}/lock`);
  openMsg('lock', success);
};

export {
  sampleDataInit,
  addEditCustomer,
  lockCustomer,
  deleteCustomers
}