import Message from '../javascripts/Message.js';

const openMsg = (functionName, success) => {
  const div = document.querySelector('#msgDiv');
  if(success) {
    const message = new Message(div,
      'success',
      `successfully ${functionName} the customer`,
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

export {
  openMsg
}