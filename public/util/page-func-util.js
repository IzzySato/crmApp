import ConfirmationBox from '../javascripts/ConfirmationBox.js';

const search = (data, input) =>
  data.filter(m =>
    Object.keys(m).some(k =>
      {
        return k !== '_id' && (m[k] === input
      || m[k].includes(input))
      }
    ));

const sort = (data, byName) => {
  data.sort((a, b) => {
    const itemA = a[byName].toUpperCase();
    const itemB = b[byName].toUpperCase();
    if(itemA < itemB) {
      return -1;
    }
    if(itemA > itemB) {
      return 1;
    }
    return 0;
  });
};

const confirmOpen = () => {
  const confirmationBox = new ConfirmationBox();
  confirmationBox.show();
}

const buildHTML = (data, html) =>
  data.map(d => html(d)).join('');

const insertHTMLIntoDiv = (div, data, html, formatter = '') => {
  div.innerHTML = buildHTML((formatter === '') ? data : formatter(data), html);
}

export {
  search,
  sort,
  buildHTML,
  insertHTMLIntoDiv,
  confirmOpen
}