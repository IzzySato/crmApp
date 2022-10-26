const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    businessName:{
        type: String,
        required: true
    },
    logoImg: {
        data: Buffer,
        contentType: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    avaiableTags: {
        type: [String],
    },
    date: {
        type:String,
        default:Date.now()
    }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;