import { customerHTML } from '../javascripts/htmlTemplate/customerList.js';
import { insertHTMLIntoDiv } from './page-func-util.js';

const getNumberOfPages = (dataLength, numOfItemPerPage) =>
  Math.ceil(dataLength / numOfItemPerPage);

const prevDiv = document.querySelector('.prevDiv');
const nextDiv = document.querySelector('.nextDiv');
const pageNumContainer = document.querySelector('.pageNumContainer');
const paginationDiv = document.querySelector('.paginationDiv');

const numHTML = (start, end, currentPage) => {
  let temp = ''
  for(let i = start; i <= end; i++) {
    temp +=`<p data-page=${i} class="pageNum ${(currentPage === i) ? "current" : ""}">${i}</p>`
  }
  return temp;
}

const startNumHTML = (start, end, contentNum, currentPage, totalPageNum) => {
  let html = `<div class="pageNumDiv ${contentNum}">`;
  html += numHTML(start, end, currentPage);
  html += `<div class="dots">
            <i class="fa-solid fa-ellipsis pageDots notSkip"></i>
          </div>
          <p class="pageNum notSkip">${totalPageNum}</p>
        </div>`;
  return html;
};

const middleNumHTML = (currentPage, totalPageNum) => `<div class="pageNumDiv gridCol7">
    <p class="pageNum">1</p>
    <div class="dots">
      <i class="fa-solid fa-ellipsis pageDots notSkip"></i>
    </div>
    <p  data-page=${currentPage-1} class="pageNum">${currentPage-1}</p>
    <p  data-page=${currentPage} class="pageNum current">${currentPage}</p>
    <p  data-page=${currentPage+1} class="pageNum">${currentPage+1}</p>
    <div class="dots">
      <i class="fa-solid fa-ellipsis pageDots notSkip"></i>
    </div>
    <p class="pageNum">${totalPageNum}</p>
  </div>`;

const endNumHTML = (start, end, contentNum, currentPage) => {
  let html = `<div class="pageNumDiv ${contentNum}">
                <p class="pageNum notSkip">1</p>
                <div class="dots">
                  <i class="fa-solid fa-ellipsis pageDots notSkip"></i>
                </div>`;
  html += numHTML(start, end, currentPage);
  return html;
};

const setPageNum = (dataLength, numOfItemPerPage, currentPage) => {
  const totalPageNum = getNumberOfPages(dataLength, numOfItemPerPage);
  // no '...' 
  if (totalPageNum <= 5) {
    return `<div class="pageNumDiv gridCol${totalPageNum}">
              ${numHTML(1, totalPageNum, currentPage)}
            </div>`;
  }
  if(currentPage <= 3) {
    return startNumHTML(1, 3, 'gridCol5', currentPage, totalPageNum);
  }
  if (currentPage === 4) {
    return startNumHTML(1, 5, 'gridCol7', currentPage, totalPageNum);
  }
  if (currentPage === totalPageNum-3) {
    return endNumHTML(currentPage-1, totalPageNum, 'gridCol7', currentPage);
  }
  if (currentPage >= totalPageNum-3  && currentPage <= totalPageNum) {
    return endNumHTML(totalPageNum-3, totalPageNum, 'gridCol6', currentPage);
  }
  return middleNumHTML(currentPage, totalPageNum);
};

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
  if(data.length === 0) {
    div.innerHTML = '<p class="noDataText">Sorry, there are no data</p>';
    return;
  }
  const start = numOfItemPerPage * (currentPage - 1);
  const selectedData = data.filter((_, index) =>
    index >= start && index < start + numOfItemPerPage);
  insertHTMLIntoDiv(div, selectedData, html);
};

const prevNextAbility = (totalPageNum, currentPage) => {
  if (totalPageNum === currentPage) {
    nextDiv.classList.add('nextNotAvailable');
  } else {
    nextDiv.classList.remove('nextNotAvailable');
  }
  if (currentPage > 1) {
    prevDiv.classList.remove('prevNotAvaiable');
  } else {
    prevDiv.classList.add('prevNotAvaiable');
  }
};

const displayPagination = (
  currentPage,
  data,
  pageName
) => {
  const { numOfItemPerPage } = getPagePaginationInfo(pageName);
  const totalPageNum = getNumberOfPages(data.length, numOfItemPerPage);
  displaySelectedItem(data, pageName, currentPage);
  if (data.length <= numOfItemPerPage) {
    paginationDiv.classList.add('hidePagination');
    return;
  }
  if (currentPage === 1) {
    //previous grey out and no cursor when hovering
    prevDiv.classList.add('prevNotAvaiable');
  }
  paginationDiv.classList.remove('hidePagination');
  prevNextAbility(totalPageNum, currentPage);
  pageNumContainer.innerHTML = setPageNum(data.length, numOfItemPerPage, currentPage);
};

export {
  displayPagination
}