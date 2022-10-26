import {
  toggleHide
} from '../util/css-util.js';
import { buildHTML } from '../util/page-func-util.js';
import { navHTML, navData } from './components/nav.js';


const mainClickFunc = (target, rightNavUl) => {
  if(target.matches('#rightNavIcon')) {
    toggleHide(rightNavUl);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const leftNavUl = document.querySelector('#leftNavUl');
  const rightNavUl = document.querySelector('#rightNavUl');

  document.addEventListener('click', ({ target }) => {
    mainClickFunc(target, rightNavUl);
  });
  
  if(leftNavUl) {
    rightNavUl.innerHTML = buildHTML(navData, navHTML);
    leftNavUl.innerHTML = buildHTML(navData, navHTML);
  }
});