const mongoose = require('mongoose');
const { addUser, getAllUsers } = require('./dbEngine/userDbEngine');

const adminUser = {
  firstName: 'Izzy',
  lastName: 'Sato',
  email: 'izzy.sato@gmail.com',
  password: 'molly123',
  permission: ['developer', 'addCustomer', 'editCustomer', 'deleteCustomer', 'all'],
};


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
