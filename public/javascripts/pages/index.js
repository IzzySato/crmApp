import { clickFunc, insertHTMLIntoDiv } from '../../util/page-func-util.js';
import { indexNavHTML, navData } from './nav.js';

const insertTotalCustomers = async () => {
  //const data = await getCustomers();
  const div = document.querySelector('#totalCustomersDash');
  div.innerHTML = `${ data.length }`;
};

document.addEventListener('DOMContentLoaded', () => {
  const dashboardUl = document.querySelector('#dashboardUl');
  insertHTMLIntoDiv(dashboardUl, navData ,indexNavHTML);
});