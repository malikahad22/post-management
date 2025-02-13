const UserService = require('../../services/users/index');

class UserController {

   constructor() {
      this.user = new UserService();
   }

   create_user = async (req, resp) => {
      try {

         const payload = req.body;
         const response = await this.user.createUser(payload);

         if (response) {
            resp.success(null, 'User created successfull!', 201);
         } else {
            resp.error(null, 'User creation failed', 400);
         }

      } catch (error) {
         console.error('Error creating user:', error.message);
         resp.error(error, error.message, 500);
      }
   }

   get_all_users = async (req, resp) => {
      try {

         const { limit, offset,user } = req.query;

         const response = await this.user.getAllUsers(limit,offset,user);
         if (response.length === 0) return resp.success(response, 'No Users exist', 200);
         resp.success(response, 'Users get successfully!', 200);

      } catch (error) {
         resp.error(error, error.message, 500);
      }
   }

   get_user = async (req, resp) => {
      try {

         const { id } = req.params;
         if (!!id === false) return resp.error(null, 'Bad request', 400);
         const response = await this.user.getUserById(id);
         if (!!response === false) return resp.success(null, 'No user found!', 200);
         resp.success(response, 'User get successfully', 200);

      } catch (error) {
         resp.error(error, error.message, 500);
      }
   }

   delete_user = async (req, resp) => {
      try {
         const { id } = req.params;

         const user = await this.user.getUserById(id);

         if (!!user === false) return resp.error(null, 'User does not exist', 404);
         const response = await this.user.deleteUser(id);
         if (!!response === false) return resp.error(null, 'User deletion failed', 400);
         resp.success(null, 'User successfully deleted!', 200);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   }

   get_user_with_posts = async (req, resp) => {

      try {

         const { id } = req.params;
         const response = await this.user.getUserWithPosts(id);
         if (response.length === 0) return resp.error(null, 'No user exist', 400);
         resp.success(response, 'User get successfully', 200);

      } catch (error) {
         resp.error(null, error.message, 500);
      }

   }

}

module.exports.UserController = new UserController();
