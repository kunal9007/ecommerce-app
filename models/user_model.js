//user Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    mobileNumber: {
        type: Number,
        default: 0,
        required: true
    },
    password: {
        type: String,
        default: "",
        required: true
    },
    token: {
        type: String,
        default: ""
    },
    address: {
        type: Number,
        default: ""
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('table_users', Users);