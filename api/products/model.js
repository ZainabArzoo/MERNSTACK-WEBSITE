const { Schema, model } = require('mongoose')

const ProductsSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand : {
        type : String,
        required : true,
    },
    price: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
 
},{versionKey:false})

const Product = model('product', ProductsSchema)
module.exports = Product
