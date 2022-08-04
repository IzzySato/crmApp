import { clickFunc } from '../../util/page-func-util.js';
import { addFetch } from '../api/fetch.js';

const addUser = async () => {
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const companyId = document.querySelector('#addUserDiv').dataset.id;
  const permissions = document.querySelectorAll('.permissions');
  const permissionArray = [];
  permissions.forEach(permission => {
    if(permission.checked) {
      permissionArray.push(permission.value);
    }
  });
  const newUser = {
    firstName,
    lastName,
    email,
    companyId,
    permissions: permissionArray
  };
  await addFetch(newUser, '/user/add');
};

document.addEventListener('DOMContentLoaded', () => {
  const userAddBtn = document.querySelector('#addUser');
  clickFunc(userAddBtn, addUser);
});