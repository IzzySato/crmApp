const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    workType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    note: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    productIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
});

const Work = mongoose.model('Work', WorkSchema);

module.exports = Work;