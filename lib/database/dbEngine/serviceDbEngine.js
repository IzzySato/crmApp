const Service = require('../models/Service');

const getServicesByCompany = async (companyId) => {
  try {
    return await Service.find({ companyId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getServicesByServiceId = async (serviceId) => {
  try {
    return await Service.findOne({ _id: serviceId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addService = async (newService) => {
  try {
    const service = new Service(newService);
    service.save();
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editService = async(updatingService) => {
  try {
    await Service.updateOne({ _id: updatingService.id }, updatingService);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteService = async(serviceId) => {
  try {
    await Service.deleteOne({ _id: serviceId });
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getServicesByCompany,
  addService,
  editService,
  deleteService,
  getServicesByServiceId
}