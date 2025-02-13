/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * This middleware is use to format the response for success and error
 */
const responseFormatter = (req, res, next) => {

   res.success = (data, message = "Success", statusCode = 200) => {
      res.status(statusCode).json({
         statusCode,
         success: true,
         message,
         data,
      });
      return;
   };

   res.error = (error, message = "An error occurred", statusCode = 500) => {
      res.status(statusCode).json({
         statusCode,
         success: false,
         message,
         data: error
      });
      return;
   };

   next();
};

module.exports = responseFormatter;
