const { body, validationResult } = require('express-validator');

// User Validation Rules
const userValidationRules = () => {
   return [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Email is invalid'),
      body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
      body('role').notEmpty().withMessage('Role is required')
   ];
};

// Post Validation Rules
const postValidationRules = () => {
   return [
      body('title').notEmpty().withMessage('Title is required'),
      body('content').notEmpty().withMessage('Content is required'),
      body('author').notEmpty().withMessage('Author is required'),
   ];
};

// Login Validation Rules
const loginValidationRules = () => {
   return [
      body('email').isEmail().withMessage('Email is invalid'),
      body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
   ];
}

// Validation Middleware
const validate = (req, res, next) => {
   const errors = validationResult(req);
   if (errors.isEmpty()) {
      return next();
   }

   const extractedErrors = []
   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

   res.error(errors, '', 404);
};

// ✅ Export Validation Rules
module.exports = {
   loginValidationRules,
   userValidationRules,
   postValidationRules,
   validate
};
