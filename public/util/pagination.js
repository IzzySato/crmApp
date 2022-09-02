import { insertHTMLIntoDiv } from './page-func-util.js';

const getNumberOfPages = (data, numOfItemPerPage) =>
  Math.ceil(data.length / numOfItemPerPage);
 
const displaySelectedItem = (
  data,
  numOfItemPerPage,
  customerUl,
  customerHTML,
  currentPage ) => {
    const start = numOfItemPerPage * (currentPage-1);
    const selectedData = data.filter((d, index) => index >= start && index < start + numOfItemPerPage);
    insertHTMLIntoDiv(customerUl, selectedData, customerHTML);
};

const pageTemp = (currentPageNum, i) => `
  <div class="dots ${(currentPageNum === i)? "currentDot" : "" }"></div>
  `;

const getPageDots = (div, data, numOfItemPerPage, currentPageNum) => {
  const dotNum = (data.length <= numOfItemPerPage) ? 1 : getNumberOfPages(data, numOfItemPerPage);
  let html = '';
  for(let i = 1; i <= dotNum; i++) {
    html += pageTemp(currentPageNum, i);
  }
  div.innerHTML = html;
};

const incrementDecrementPage = (
    incrementOrDecrement,
    incrementBtns,
    decrementBtns,
    currentPage,
    data,
    numOfItemPerPage,
    dotDiv,
    dataDiv,
    dataHTML
  ) => {
    const breakCondition = (incrementOrDecrement === 'increment') ? 
      (currentPage > getNumberOfPages(data, numOfItemPerPage)) : currentPage === 1;
    
    if (currentPage <= 1) {
        decrementBtns.innerHTML = '';
    }
    if(currentPage < getNumberOfPages(data, numOfItemPerPage)){
        incrementBtns.innerHTML = '&#10097;';
    }
    if(currentPage > 1) {
      decrementBtns.innerHTML = '&#10096;';
    }
    if(currentPage === getNumberOfPages(data, numOfItemPerPage)) {
        incrementBtns.innerHTML = '';
    }
    getPageDots(dotDiv, data, numOfItemPerPage, currentPage);
    displaySelectedItem(data, numOfItemPerPage, dataDiv, dataHTML, currentPage);
    if(breakCondition) {
      return;
    };
};

export {
  displaySelectedItem,
  getPageDots,
  incrementDecrementPage
}