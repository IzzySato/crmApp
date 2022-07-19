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
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;