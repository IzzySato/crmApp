import { addFetch, editFetch } from '../api/fetch.js';
import Message from '../Message.js';

const router = '/customer';

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
  const address = document.querySelector('#customerAddress').value;
  const companyId = document.querySelector('#container').dataset.id;
  const unlockedCheck = document.querySelector('.unlock');
  const selectedCheck = (unlockedCheck.checked) ? false : true;
  const id = document.querySelector('#formDiv').dataset.id;
  const customer = {
    id,
    firstName,
    lastName,
    companyId,
    email,
    phone,
    address,
    isLocked: selectedCheck
  };

  if(addOrEdit === 'add') {
    const { success } = await addFetch(customer, `${router}/add`);
    openMsg('add', success);
  } else {
    const { success } = await editFetch(customer, `${router}/edit`);
    openMsg('edit', success);
  }
};

const lockCustomer = async (id) => {
  const { success } = await editFetch({_id: id}, `${router}/lock`);
  openMsg('lock', success);
};

export {
  addEditCustomer,
  lockCustomer
}