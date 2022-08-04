const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    isLocked: {
        type: Boolean
    },
    date:{
        type:String,
        default:Date.now()
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;