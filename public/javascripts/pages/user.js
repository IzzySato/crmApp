import { clickFunc } from '../../util/page-func-util.js';
import { addFetch } from '../api/fetch.js';

const addUser = async () => {
  const res = await addFetch('/user/add');
}

document.addEventListener('DOMContentLoaded', () => {
  const adminAddBtn = document.querySelector('#adminAddBtn');
  if(adminAddBtn) {
    clickFunc(adminAddBtn, addUser);
  }
});