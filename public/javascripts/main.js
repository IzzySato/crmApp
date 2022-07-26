import { login } from './pages/login.js';
const mobileIcon = document.querySelector('#mobileIcon');
const navUl = document.querySelector('#navUl');
const loginBtn = document.querySelector('#loginBtn');

const navToggle = () => {
  (navUl.style.display === 'none') ? 
    navUl.style.display = 'block' 
      : navUl.style.display = 'none';
};

const clickFunc = (btn, func) => {
  btn.addEventListener('click', () => {
    func();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if(loginBtn) {
    clickFunc(loginBtn, login);
  }
  if(mobileIcon) {
    clickFunc(mobileIcon, navToggle);
  }
});