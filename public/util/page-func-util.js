import ConfirmationBox from '../javascripts/ConfirmationBox.js';

const search = (data, input) => 
 data.filter(m =>
    Object.keys(m).some(k =>
        (k !== '_id' && (m[k] === input
                     || m[k].includes(input)))
));

const capitalizeText = (text) => 
  text.charAt(0).toUpperCase() + text.slice(1);

const formatPhone = (phone) => {
  let resultPhone = phone;
  if(phone.includes('-')) {
    resultPhone = resultPhone.replace('-', '');
  }
  if(phone.includes(' ')) {
    resultPhone = resultPhone.replace(/\s/g, '');
  }
  return resultPhone;
};

const lowerCaseData = (data) => 
  data.map(({
    _id,
    firstName,
    lastName,
    email,
    phone,
    street1,
    city1,
    province1,
    street2,
    city2,
    province2,
  }) => 
    ({
      _id,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      phone: formatPhone(phone),
      street1: street1.toLowerCase(),
      city1: city1.toLowerCase(),
      province1: province1.toLowerCase(),
      street2: street2.toLowerCase(),
      city2: city2.toLowerCase(),
      province2: province2.toLowerCase(),
    }));

const formatData = (data) => 
  data.map(({
    _id,
    firstName,
    lastName,
    email,
    phone,
    street1,
    city1,
    province1,
    street2,
    city2,
    province2,
  }) => 
    ({
      _id,
      firstName: capitalizeText(firstName),
      lastName: capitalizeText(lastName),
      email: email.toLowerCase(),
      phone: formatPhone(phone),
      street1: street1.toLowerCase(),
      city1: capitalizeText(city1),
      province1: province1.toUpperCase(),
      street2: street2.toLowerCase(),
      city2: capitalizeText(city2),
      province2: province2.toUpperCase(),
    }));

const confirmOpen = () => {
      const confirmationBox = new ConfirmationBox();
      confirmationBox.show();
  }

const buildHTML = (data, html) => 
  data.map(d => html(d)).join('');

const insertHTMLIntoDiv = (div, data, html) => 
  div.innerHTML = buildHTML(formatData(data), html);

export {
  search,
  buildHTML,
  insertHTMLIntoDiv,
  lowerCaseData,
  formatPhone,
  confirmOpen
}