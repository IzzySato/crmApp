import {
  toggleHide,
  toggleClass,
  toggleClasses
} from '../util/css-util.js';
import { clickFunc, buildHTML } from '../util/page-func-util.js';
import { navHTML, navData } from './pages/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  const logo = document.querySelector('#logo');
  const iconNames = document.querySelectorAll('.leftIconNames');
  const rightNavIcon = document.querySelector('#rightNavIcon');
  const leftNavUl = document.querySelector('#leftNavUl');
  const rightNavUl = document.querySelector('#rightNavUl');

  if(logo) {
    clickFunc(logo, toggleClasses(iconNames, 'el-hide'));
    clickFunc(logo, toggleClass(leftNavUl, 'displayLeftNav'));
  }
  if(rightNavIcon) {
    clickFunc(rightNavIcon, toggleHide(rightNavUl));
  }
  if(leftNavUl) {
    rightNavUl.innerHTML = buildHTML(navData, navHTML);
    leftNavUl.innerHTML = buildHTML(navData, navHTML);
  }
});