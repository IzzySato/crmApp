import { 
  toggleClass,
  toggleClasses
} from '../util/css-util.js';
import { addUser } from './api/userApi.js';
import { login } from './pages/login.js';
import { displaySelectedPermission } from './pages/user.js';

const clickFunc = (btn, func) => {
  btn.addEventListener('click', () => func());
};

document.addEventListener('DOMContentLoaded', () => {
  const mobileIcon = document.querySelector('#mobileIcon');
  const loginBtn = document.querySelector('#loginBtn');
  const adminAddBtn = document.querySelector('#adminAddBtn');
  const permissionAdd = document.querySelector('#permissionAdd');
  const cancelBtns = document.querySelectorAll('.cancel');
  const navUl = document.querySelector('#navUl');
  const logo = document.querySelector('#logo');
  const iconNames = document.querySelectorAll('.iconNames');
  const leftNav = document.querySelector('#leftNav');
  const rightNavIcon = document.querySelector('#rightNavIcon');
  const rightNavUl = document.querySelector('#rightNavUl');
  const openConfirmBtns = document.querySelectorAll('.openConfirmBtns');

  if(loginBtn) {
    clickFunc(loginBtn, login);
  }
  if(mobileIcon) {
    clickFunc(mobileIcon, toggleClass(navUl, 'el-hide'));
  }
  if(adminAddBtn) {
    clickFunc(adminAddBtn, addUser);
  }
  if(permissionAdd) {
    clickFunc(permissionAdd, displaySelectedPermission);
  }
  if(logo) {
    clickFunc(logo, toggleClasses(iconNames, 'el-hide'));
    clickFunc(logo, toggleClass(leftNav, 'displayLeftNav'));
  }
  if(rightNavIcon) {
    clickFunc(rightNavIcon, toggleClass(rightNavUl, 'el-hide'));
  }
  if(openConfirmBtns) {
    openConfirmBtns.forEach(btn => {
      const confrimDiv = document.querySelector(`#${btn.id}Confirm`);
      clickFunc(btn, toggleClass(confrimDiv, 'el-hide'));
    });
  }
  if(cancelBtns) {
    cancelBtns.forEach(btn => {
      clickFunc(btn, toggleClass(btn.parentElement.parentElement, 'el-hide'));
    });
  }
});