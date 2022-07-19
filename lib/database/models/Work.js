const mongoose = require('mongoose');
const Customer = require('./Customer');
const Product = require('./Product');

const WorkSchema = new mongoose.Schema({
    workName: {
        type: String,
        required:true
    },
    startDate: {
        type: String,
        required:true
    },
    endDate: {
        type: Date,
        required:true
    },
    customer: {
        type: Customer,
        required:true
    },
    products: {
      type: [Product]
    }
});

const Work = mongoose.model('Work', WorkSchema);

module.exports = Work;