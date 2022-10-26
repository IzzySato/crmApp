import { addFetch, editFetch } from '../../api/fetch.js';
import {
  reguiredInputCheck,
  phoneInputCheck,
  emailInputCheck
 } from '../../../util/input-check.js';
import { openMsg } from '../../../util/open-message.js';

 const router = 'customer';

// addEditCustomer called when confirmed from /javascripts/CsutomerForm.submit()
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
  const tags = document.querySelectorAll('.tags');
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

  const tagArray = [];
  tags.forEach((tag) => (tag.checked) ? tagArray.push(tag.value): '');

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
    tags: tagArray,
    province2: (province2 === 'select') ? '' : province1,
    isLocked: false
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


export {
  addEditCustomer
}