const ROLE_PERMISSION = require('../../constants/index');

const checkPermission = (resource, action) => {
   return (req, res, next) => {
      const user = req.user;
      const userRole = user.role;
      console.log('userRole', userRole);

      // Check if the role has permission for the resource and action
      if (ROLE_PERMISSION[userRole] && ROLE_PERMISSION[userRole][resource] && ROLE_PERMISSION[userRole][resource].includes(action)) {
         return next();
      } else {
         return res.error(null, 'Forbidden Request', 403);
      }
   };
};

module.exports = checkPermission;
