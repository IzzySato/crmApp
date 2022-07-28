const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    businessName:{
        type: String,
        required: true
    },
    userId:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    permissionTags: {
        type: [String]
    },
    logo: {
      data: Buffer,
      contentType: String
    },
    date: {
        type:String,
        default:Date.now()
    }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;