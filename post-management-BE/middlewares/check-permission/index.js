const ROLE_PERMISSION = require('../../constants/index');

const checkPermission = (resource, action) => {

   return (req, res, next) => {
      const { role } = req.body;
      const user = req.user;
      const userRole = user.role;

      // If anyone try to create superadmin from postman or anyother way then , he will not able to create super admin
      if ((userRole === 'admin' || userRole === 'user') && role === 'superadmin') {
         return res.error(null, 'Forbidden Request', 403);
      }

      // Check if the role has permission for the resource and action
      if (ROLE_PERMISSION[userRole] && ROLE_PERMISSION[userRole][resource] && ROLE_PERMISSION[userRole][resource].includes(action)) {
         return next();
      } else {
         return res.error(null, 'Forbidden Request', 403);
      }
   };
};

module.exports = checkPermission;
