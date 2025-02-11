const AuthController = require('../../controller/auth/index');
const { validate, loginValidationRules } = require('../../middlewares/validator/index');
const express = require('express');
const authRoute = express.Router();

authRoute.post('/login',
   loginValidationRules(),
   validate,
   AuthController.login);

module.exports = authRoute;