const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const User = new Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String
    },

    permissions: {
        type:[String]
    },
    date:{
        type:String,
        default:Date.now()
    }
});

User.plugin(passportLocalMongoose);
User.plugin(findOrCreate);
User.set('autoIndex', false);

module.exports = mongoose.model('User', User);