const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street1: {
        type: String,
        required: true
    },
    city1: {
        type: String,
        required:true
    },
    province1: {
        type: String,
        required: true
    },
    street2: {
        type: String
    },
    city2:{
        type: String
    },
    province2: {
        type: String
    },
    tags: {
        type: [String]
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    isLocked: {
        type: Boolean
    },
    date: {
        type: String,
        default: Date.now()
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;