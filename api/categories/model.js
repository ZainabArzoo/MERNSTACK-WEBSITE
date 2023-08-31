const { Schema, model } = require('mongoose')

const CategoriesSchema = new Schema({

    Categoryname  : {
        type : String,
        unique : true,
        required : true
    },
    Categoryimage  : {
        type : String,
        required : true
    },

},{versionKey:false}) 

const category = model('category', CategoriesSchema)
module.exports = category
