import { toggleHide } from "../../util/css-util.js";
import { buildHTML } from "../../util/page-func-util.js";

const navData = [
  {
    "name": "dashboard",
    "icon": "fa-solid fa-table-cells",
    "link": "/",
  },
  {
    "name": "customer",
    "icon": "fa-solid fa-users",
    "link": "/customer",
  },
  {
    "name": "work",
    "icon": "fa-solid fa-screwdriver-wrench",
    "link": "/work",
  },
  {
    "name": "sale",
    "icon": "fa-solid fa-chart-line",
    "link": "/sale",
  },
  {
    "name": "schedule",
    "icon": "fa-solid fa-calendar-days",
    "link": "/schedule",
  },
  {
    "name": "developer",
    "icon": "fa-solid fa-star",
    "link": "/dev",
  },
  {
    "name": "logout",
    "icon": "fa-solid fa-right-from-bracket",
    "link": "/logout",
  }
];

const navHTML = (data) => `
<li class="navLi">
    <a class="navA" href="${data.link}">
      <div class="navIconDiv">
        <i class="${data.icon} navIcon"></i>
        <div class="navName">
          <h2>${data.name}</h2>
        </div>
      </div>
    </a>
</li>`;

document.addEventListener('DOMContentLoaded', () => {
  const leftNavUl = document.querySelector('#leftNavUl');
  leftNavUl.innerHTML = buildHTML(navData, navHTML);
  document.addEventListener('click', ({target}) => {
    if(target.matches('.menuLine, #hamburgerMenu')) {
      toggleHide(leftNavUl);
    }
  });
});