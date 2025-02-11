const UserService = require('../../services/users/index');

const checUserExistance = async (req, resp, next) => {
   const user = new UserService();
   try {

      const { email } = req.body;
      const response = await user.getUserByEmail(email);

      if (response) {
         resp.error(null, 'Email already in use', 400);
      } else {
         next();
      }

   } catch (error) {
      resp.error(error, error.message, 500);
   }
}

module.exports = { checUserExistance };