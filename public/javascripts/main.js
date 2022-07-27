import { toggleDisplay } from '../util/css-util.js';
import { addUser } from './api/userApi.js';
import { login } from './pages/login.js';
import { displayConfirmDiv, displaySelectedPermission } from './pages/user.js';

// const navToggle = () => {
  
//   (navUl.style.display === 'none') ? 
//     navUl.style.display = 'block' 
//       : navUl.style.display = 'none';
// };

const clickFunc = (btn, func) => {
  btn.addEventListener('click', () => {
    func();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const mobileIcon = document.querySelector('#mobileIcon');
  const loginBtn = document.querySelector('#loginBtn');
  const adminAddBtn = document.querySelector('#adminAddBtn');
  const permissionAdd = document.querySelector('#permissionAdd');
  const addUserBtn = document.querySelector('#addUserBtn');
  const cancelBtns = document.querySelectorAll('.cancel');
  const navUl = document.querySelector('#navUl');

  if(loginBtn) {
    clickFunc(loginBtn, login);
  }
  if(mobileIcon) {
    clickFunc(mobileIcon, toggleDisplay(navUl));
  }
  if(adminAddBtn) {
    clickFunc(adminAddBtn, addUser);
  }
  if(permissionAdd) {
    clickFunc(permissionAdd, displaySelectedPermission);
  }
  if(addUserBtn) {
    clickFunc(addUserBtn, displayConfirmDiv);
  }

if(cancelBtns) {
  cancelBtns.forEach(btn => clickFunc(btn, displayConfirmDiv))
}
});