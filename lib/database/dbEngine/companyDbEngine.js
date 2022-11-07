const Company = require('../models/Company');

const getCompanies = async () => {
  try {
    return await Company.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getCompanyById = async (companyId) => {
  try {
    return await Company.findOne({_id: companyId});
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
};

const editCompany = async(updatingCompany) => {
  try {
    await Company.updateOne({ _id: updatingCompany._id }, updatingCompany);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteCompany = async(companyId) => {
  try {
    await Company.deleteOne({ _id: companyId });
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getCompanies,
  getCompanyById,
  addCompany,
  editCompany,
  deleteCompany
}