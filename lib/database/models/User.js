const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const User = new Schema({
    firstName:{
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
    password:{
        type:String,
        required:true
    },
    
    googleId: String,

    permission:{
        type:[String],
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    }
});

User.plugin(passportLocalMongoose);
User.plugin(findOrCreate);

module.exports = mongoose.model('User', User);