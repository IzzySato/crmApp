const Company = require('../models/Company');

const getCompanies = async () => {
  try {
    return await Company.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getCompanyInfoByUserId = async (userId) => {
  try {
    return await Company.find({ userId });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const addCompany = async (company) => {
  try {
    const newCompany = new Company(company)
    await newCompany.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getCompanies,
  getCompanyInfoByUserId,
  addCompany
}