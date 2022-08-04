const mongoose = require('mongoose');
const { getCompanies } = require('./dbEngine/companyDbEngine');
const { addUser, getAllUsers } = require('./dbEngine/userDbEngine');

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Connect to Database'));
    const users = await getAllUsers();
    if(users.length === 0) {
      const company = await getCompanies();
      const adminUser = {
        firstName: 'Izzy',
        lastName: 'Sato',
        email: 'izzy.sato@gmail.com',
        companyId: company[0]._id,
        password: 'molly123',
        permissions: ['developer', 'addCustomer', 'editCustomer', 'deleteCustomer', 'all'],
      };
      await addUser(adminUser);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  connect
}
