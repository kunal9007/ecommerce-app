'use strict';
//validator middlewares

const _ = require('lodash');
const {
    check,
    validationResult
} = require('express-validator');

const validate = (req, res, next) => {
    const validationError = validationResult(req).mapped();
    if (_.keys(validationError).length > 0) return res.status(412).jsonp({
        "validationError": validationError
    });
    return next();
};

const userSignUpValidate = [
    check('name', 'name is required').not().isEmpty().trim(),
    check('mobileNumber', 'mobileNumber is required').not().isEmpty().isInt(),
    check('password', 'password is required').not().isEmpty().trim()
];

const userSignInValidate = [
    check('mobileNumber', 'mobileNumber is required').not().isEmpty().isInt(),
    check('password', 'password is required').not().isEmpty().trim()
];

const productAddValidate = [
    check('productName', 'productName required').not().isEmpty().trim(),
    check('productId', 'productId is required').not().isEmpty().trim(),
    check('price', 'Device is required').not().isEmpty().isInt(),
    check('stockQuantity', 'Version code is required').not().isEmpty().isInt()
];

const productUpdateValidate = [
    check('productName', 'productName required').not().isEmpty().trim() ||
    check('productId', 'productId is required').not().isEmpty().trim() ||
    check('price', 'Device is required').not().isEmpty().isInt() ||
    check('stockQuantity', 'Version code is required').not().isEmpty().isInt()
];

const productDeleteValidate = [
    check('productId', 'productId is required').not().isEmpty().trim()
];

module.exports = {
    validate,

    userSignUpValidate,
    userSignInValidate,

    productAddValidate,
    productUpdateValidate,
    productDeleteValidate
};