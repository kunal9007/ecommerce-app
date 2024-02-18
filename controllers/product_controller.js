//controller for product listing, retrieving, updating and removing

const productModel = require('../models/product_model');

const add = async (req, res) => {
    try {
        const product = {
            name: req.body.productName,
            productId: req.body.productId,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        }

        const listedAlready = await productModel.findOne({ productId: req.body.productId });
        if (listedAlready) throw "productId is already listed"

        const listing = await productModel.create(product);

        return res.status(200).jsonp(listing);
    } catch (err) {
        console.log("product add err", err);
        return res.status(400).jsonp(err);
    }
};

const getAll = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        return res.status(200).jsonp(allProducts);
    } catch (err) {
        console.log("product get All err", err);
        return res.status(400).jsonp(err);
    }
};

const get = async (req, res) => {
    try {
        const productId = req.body.productId;
        const product = await productModel.findOne({ productId: productId });
        return res.status(200).jsonp(product);
    } catch (err) {
        console.log("product get err", err);
        return res.status(400).jsonp(err);
    }
};

const update = async (req, res) => {
    try {
        const updateQuery = {};

        if (req.body.productName) {
            updateQuery.name = req.body.productName;
        }
        if (req.body.description) {
            updateQuery.description = req.body.description;
        }
        if (req.body.price) {
            updateQuery.price = req.body.price;
        }
        if (req.body.stockQuantity) {
            updateQuery.stockQuantity = req.body.stockQuantity;
        }

        console.log("updateQuery", updateQuery, "productId", req.body.productId);
        const product = await productModel.updateOne({
            productId: req.body.productId
        },
            updateQuery
        );
        return res.status(200).jsonp(product);
    } catch (err) {
        console.log("product update err", err);
        return res.status(400).jsonp(err);
    }
};

const remove = async (req, res) => {
    try {
        const productId = req.body.productId;
        const deletedResult = await productModel.deleteOne({ productId: productId });
        return res.status(200).jsonp(deletedResult);
    } catch (err) {
        console.log("product delete err", err);
        return res.status(400).jsonp(err);
    }
};

module.exports = {
    add,
    getAll,
    get,
    update,
    remove
};