const UserService = require('../../services/users/index');
const { generate_jwt, compare_hash_password } = require('../../utils/index');
class AuthController {
   constructor() {
      this.user = new UserService();
   }

   login = async (req, resp) => {

      try {
         const { email, password } = req.body;
         const user = await this.user.getUserByEmail(email);
         if (!!user === false) return resp.error(null, 'No user found!', 401);

         const verify_password = await compare_hash_password(password, user.password);
         if (!verify_password) return resp.error(null, 'Wrong Password', 401);

         const token = generate_jwt(user);
         if (!!token === false) return resp.error('Token creation failed!', 400);

         const userObject = user.toObject();
         delete userObject.password;

         const data = { user: userObject, token: token };
         resp.success(data, 'User login successfull', 200);

      } catch (error) {
         resp.error(error, error.message, 500);
      }

   }

}

module.exports = new AuthController();