const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * Middleware to check the expiry of the token or user authorization
 */
const authMiddleware = (req, res, next) => {
   try {

      const token = req.header('Authorization');
      if (!token) return res.error(null, 'Access denied. No token provided.', 401);

      const extractedToken = token.replace('Bearer ', '');

      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(extractedToken, secretKey);

      if (decoded.exp * 1000 < Date.now()) {
         return res.error(null, 'Token has expired. Please log in again.', 401);
      }

      req.user = decoded;
      next();
   } catch (error) {
      return res.error(null, 'Token has expired. Please log in again', 401)
   }
};

module.exports = authMiddleware;
