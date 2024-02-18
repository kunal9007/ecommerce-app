//api routes for product listing, retrieving, updating and removing

const express = require('express');
const router = express.Router();

const jwtAuth = require('../middlewares/jwt_auth');
const validator = require('../middlewares/validator');
const productController = require('../controllers/product_controller');

router.get('/health', (req, res) => res.sendStatus(200).end());

router.post('/add', [jwtAuth.verifyToken, validator.productAddValidate, validator.validate], productController.add);
router.get('/get-all', productController.getAll);
router.get('/get', productController.get);
router.put('/update', [jwtAuth.verifyToken, validator.productUpdateValidate, validator.validate], productController.update);
router.delete('/remove', [jwtAuth.verifyToken, validator.productDeleteValidate, validator.validate], productController.remove);

module.exports = router;