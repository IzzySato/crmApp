const mongoose = require('mongoose');

const init = () => {
  try {
    mongoose.connect(process.env.DB_URI);
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Connect to Database'));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  init
}
