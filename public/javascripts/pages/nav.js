const navData = [
  {
    "name": "dashboard",
    "icon": "fa-solid fa-table-cells",
    "link": "/",
    "permission": "",
    "position": "left"
  },
  {
    "name": "customer",
    "icon": "fa-solid fa-users",
    "link": "/customer",
    "permission": "",
    "position": "left"
  },
  {
    "name": "sale",
    "icon": "fa-solid fa-chart-line",
    "link": "/sale",
    "permission": "",
    "position": "left"
  },
  {
    "name": "schedule",
    "icon": "fa-solid fa-calendar-days",
    "link": "/schedule",
    "permission": "",
    "position": "left"
  },
  {
    "name": "company",
    "icon": "fa-solid fa-star",
    "link": "/company",
    "permission": "",
    "position": "left"
  },
  {
    "name": "logout",
    "icon": "fa-solid fa-right-from-bracket",
    "link": "/logout",
    "permission": "",
    "position": "left"
  },
  {
    "name": "configuration",
    "icon": "fa-solid fa-gear",
    "link": "/configuration",
    "permission": "",
    "position": "right"
  },
  {
    "name": "users",
    "icon": "fa-solid fa-user-pen",
    "link": "/user",
    "permission": "",
    "position": "right"
  },
];

const navHTML = (data) => `
<li class="${data.position}NavLi">
    <a class="${data.position}NavLiA" href="${data.link}">
      <div class="${data.position}NavIcon">
        <i class="${data.icon}"></i>
      </div>
      <div class="${data.position}IconNames">
        ${data.name}
      </div>
    </a>
</li>`;

const indexNavHTML = (data) => `
  <li class="dashLi ${data.name}">
    <a class="links" href="${data.link}">
      <div class="navIcons">
        <i class="${data.icon}"></i>
      </div>
      <div class="names">
        ${data.name}
      </div>
    </a>
  </li>
`;

export {
  navData,
  navHTML,
  indexNavHTML
}