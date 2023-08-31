const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({

    Items: {
        type: Array,
        required: true
    },
    Totalbill: {
        type: String,
        required: true
    },
    Customeraddress: {
        type: String,
        required: true
    },
    Customercontact: {
        type: String,
        required: true
    },
    Customername: {
        type: String,
        required: true
    },
    Customeremail: {
        type: String,
        required: true
    },
    Orderdate: {
        type: Date,
        default: Date.now
    },
    Status: {
        type: String,
        default: "pending"
    },

    Message: {
        type: String,
        default: "Thankyou"
    } 


},{versionKey:false})
const Order = model('order', OrderSchema)
module.exports = Order 