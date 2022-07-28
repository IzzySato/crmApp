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
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
});

const Work = mongoose.model('Work', WorkSchema);

module.exports = Work;