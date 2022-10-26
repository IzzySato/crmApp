import { customerHTML } from '../javascripts/pages/customer/htmlTemplate/customerList.js';
import { insertHTMLIntoDiv } from './page-func-util.js';

const getPagePaginationInfo = (pageName) => {
  let data = {};
  switch (pageName) {
    case 'customer':
      data = {
        numOfItemPerPage: 10,
        divName: '#customerUl',
        html: customerHTML
      }
      break;
    case '':
      break;
  }
  return data;
}

const getNumberOfPages = (data, numOfItemPerPage) =>
  Math.ceil(data.length / numOfItemPerPage);

const displaySelectedItem = (
  data,
  pageName,
  currentPage
  ) => {
    const {
      numOfItemPerPage,
      divName,
      html
    } = getPagePaginationInfo(pageName);
    const div = document.querySelector(divName);
    const start = numOfItemPerPage * (currentPage-1);
    const selectedData = data.filter((d, index) => 
      index >= start && index < start + numOfItemPerPage);
    insertHTMLIntoDiv(div, selectedData, html);
};

const pageTemp = (currentPageNum, i) => `
  <div class="dots ${(currentPageNum === i)? "currentDot" : "" }"></div>
  `;

const getPageDots = (
  data,
  pageName,
  currentPageNum
  ) => {
  const div = document.querySelector('.pageDots');
  const { numOfItemPerPage } = getPagePaginationInfo(pageName);
  const dotNum = (data.length <= numOfItemPerPage) ? 1 : getNumberOfPages(data, numOfItemPerPage);
  let html = '';
  for(let i = 1; i <= dotNum; i++) {
    html += pageTemp(currentPageNum, i);
  }
  div.innerHTML = html;
};

const incrementDecrementPage = (
    incrementOrDecrement,
    currentPage,
    data,
    pageName
  ) => {
    const incrementBtns = document.querySelector('.incrementBtns');
    const decrementBtns = document.querySelector('.decrementBtns');
    const { numOfItemPerPage } = getPagePaginationInfo(pageName);
    const breakCondition = (incrementOrDecrement === 'increment') ? 
      (currentPage > getNumberOfPages(data, numOfItemPerPage)) : currentPage === 1;
    
    if (currentPage <= 1) {
        decrementBtns.innerHTML = '';
    }
    if(currentPage < getNumberOfPages(data, numOfItemPerPage)){
        incrementBtns.innerHTML = '<i class="fa-solid fa-forward"></i>';
    }
    if(currentPage > 1) {
      decrementBtns.innerHTML = '<i class="fa-solid fa-backward"></i>';
    }
    if(currentPage === getNumberOfPages(data, numOfItemPerPage)) {
        incrementBtns.innerHTML = '';
    }

    getPageDots(data, pageName, currentPage);
    displaySelectedItem(data, pageName, currentPage);
    if(breakCondition) {
      return;
    };
};

export {
  displaySelectedItem,
  getPageDots,
  incrementDecrementPage
}