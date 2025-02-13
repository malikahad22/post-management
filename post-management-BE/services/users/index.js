const mongoose = require('mongoose');

const User = require('../../models/users/index');

class UserService {
   constructor() { }

   /**
    * 
    * @param {*} payload 
    * @returns 
    */
   async createUser(payload) {
      try {
         return await User.insertOne(payload);

      } catch (error) {
         throw error;
      }
   }

   /**
    * 
    * @param {*} limit 
    * @param {*} offset 
    * @param {*} user 
    * @returns 
    */
   async getAllUsers(limit, offset, user) {
      try {
         const users = await User.find({ _id: { $ne: user } }, { password: 0 })
            .skip(offset)
            .limit(limit);
         const total = await User.countDocuments();
         return { users, total }
      } catch (error) {
         throw error;
      }
   }


   /**
    * 
    * @param {*} email 
    * @returns 
    */
   async getUserByEmail(email) {
      try {
         return User.findOne({ email: email });
      } catch (error) {
         throw error;
      }
   }


   /**
    * 
    * @param {*} id 
    * @returns 
    */
   async getUserById(id) {
      try {
         return await User.findOne({ _id: id }, { password: 0 });
      } catch (error) {
         throw error;
      }
   }


   /**
    * 
    * @param {*} id 
    * @returns 
    */
   async deleteUser(id) {
      try {
         return await User.deleteOne({ _id: id });
      } catch (error) {
         throw error;
      }
   }


   /**
    * 
    * @param {*} id 
    * @returns 
    */
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