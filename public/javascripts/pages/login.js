import { clickFunc } from '../../util/page-func-util.js';
import { addFetch } from '../api/fetch.js';

const loginRoute = '/login';

const login = async () => {
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;
  const user = {
    email,
    password
  };

  const { status, message, data } = await addFetch(user, loginRoute);
  if(status === 'success') {
    location.href = '/';
  } else {
    // TODO message page
    // location.href = `/error/${message}`;
    console.log(message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('#loginBtn');
  clickFunc(loginBtn, login);
});