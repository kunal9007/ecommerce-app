//api routes for user authentication
const authController = require('../controllers/auth_controller');

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');

router.get('/health', (req, res) => res.sendStatus(200).end());
router.post('/sign-up', [validator.userSignUpValidate, validator.validate], authController.signUp);
router.post('/sign-in', [validator.userSignInValidate, validator.validate], authController.signIn);

module.exports = router;