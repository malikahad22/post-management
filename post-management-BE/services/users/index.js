const mongoose = require('mongoose');

const User = require('../../models/users/index');

class UserService {
   constructor() { }

   async createUser(payload) {
      try {
         return await User.insertOne(payload);

      } catch (error) {
         throw error;
      }
   }

   async getAllUsers() {
      try {
         return await User.find({}, { password: 0 });
      } catch (error) {
         throw error;
      }
   }

   async getUserByEmail(email) {
      try {
         return User.findOne({ email: email });
      } catch (error) {
         throw error;
      }
   }

   async getUserById(id) {
      try {
         return await User.findOne({ _id: id }, { password: 0 });
      } catch (error) {
         throw error;
      }
   }

   async deleteUser(id) {
      try {
         return await User.deleteOne({ _id: id });
      } catch (error) {
         throw error;
      }
   }

   async getUserWithPosts(id) {
      try {
         const data = await User.aggregate([
            {
               $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
               $lookup: {
                  from: 'posts',
                  localField: '_id',
                  foreignField: 'author',
                  as: 'posts'
               }
            },
            {
               $project: {
                  password: 0,
               }
            }
         ]);

         return data;

      } catch (error) {
         throw error;
      }
   }
}

module.exports = UserService;