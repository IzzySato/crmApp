const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;