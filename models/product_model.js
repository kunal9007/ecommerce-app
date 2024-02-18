//product Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//product id can be unique object id of mongo but since there might 
//ids given by manufacturers or traders a separate field is used
const Products = new Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    productId: {
        type: String,
        default: "",
        required: true,
        index : true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    stockQuantity: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('table_products', Products);