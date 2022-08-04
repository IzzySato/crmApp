import ConfirmationBox from '../javascripts/ConfirmationBox.js';

const search = (data, input) => 
 data.filter(m =>
    Object.keys(m).some(k =>
        (k !== '_id' && (m[k] === input
                     || m[k].includes(input)))
));

// use for customers and users
const formatSearchData = (data, arrayStringFunc, stringFunc) => 
  data.map(({
    _id,
    firstName,
    lastName,
    email,
    phone,
    address }) => 
    ({
      _id,
      firstName: stringFunc(firstName),
      lastName: stringFunc(lastName),
      email,
      phone,
      address: arrayStringFunc(address)
    }));

const clickFunc = (btn, func) => {
  btn.addEventListener('click', () => {
    if(btn.classList.contains('openConfirmBtns')) {
      const confirmDiv = document.querySelector('.confirmDiv');
      const confirmationBox = new ConfirmationBox(confirmDiv, func);
      confirmationBox.show();
    } else {
      func();
    }
  });
};

const buildHTML = (data, html) => 
  data.map(d => html(d)).join('');

const insertHTMLIntoDiv = (div, data, html) => 
  div.innerHTML = buildHTML(data, html);

export {
  search,
  clickFunc,
  buildHTML,
  insertHTMLIntoDiv,
  formatSearchData
}