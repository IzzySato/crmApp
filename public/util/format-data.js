const capitalizeText = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const formatPhone = (phone) => {
  let resultPhone = phone;
  if (phone.includes('-')) {
    resultPhone = resultPhone.replace('-', '');
  }
  if (phone.includes(' ')) {
    resultPhone = resultPhone.replace(/\s/g, '');
  }
  return resultPhone;
};

const formatCustomerData = (data) =>
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

const lowerCaseCustomerData = (data) =>
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
    tags,
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
    tags,
  }));

const formatCompanyData = (data) =>
  data.map(({ bisinessName }) => ({
    businessName: capitalizeText(bisinessName)
  }));

export {
  formatCustomerData,
  lowerCaseCustomerData,
  formatCompanyData,
  capitalizeText,
  formatPhone
}