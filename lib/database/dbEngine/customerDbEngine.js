const Customer = require('../models/Customer');

const getCustomersByCompany = async (companyId) => {
  try {
    return await Customer.find({ companyId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCustomersById = async (customerId) => {
  try {
    return await Customer.findOne({ _id: customerId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addCustomer = async (newCustomer) => {
  try {
    const customer = new Customer(newCustomer);
    await customer.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editCustomer = async (updatingCustomer) => {
  try {
    await Customer.updateOne({ _id: updatingCustomer.id }, updatingCustomer);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const lockCustomer = async (_id) => {
  try {
    await Customer.updateOne({ _id }, { isLocked: true });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteAllCustomers = async () => {
  try {
    await Customer.deleteMany();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addCustomer,
  editCustomer,
  lockCustomer,
  getCustomersByCompany,
  getCustomersById,
  editCustomer,
  deleteAllCustomers
}
