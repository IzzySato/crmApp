const Company = require('../models/Company');

const getCompanies = async () => {
  try {
    return await Company.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getCompanyByBusinessName = async () => {
  try {

  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addCompany = async (company) => {
  try {
    const newCompany = new Company(company)
    await newCompany.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getCompanies,
  addCompany
}