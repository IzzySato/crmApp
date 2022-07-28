const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    expirationDate: {
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    }
});

const Invite = mongoose.model('Invite', InviteSchema);

module.exports = Invite;