const Post = require('../../models/posts/index');

class PostService {
   constructor() { }

   /**
    * 
    * @param {*} payload 
    * @returns 
    */
   async createPost(payload) {
      try {
         return await Post.insertOne(payload);
      } catch (error) {
         throw error;
      }
   }

   /**
    * 
    * @param {*} id 
    * @returns 
    */
   async getPostById(id) {
      try {
         return await Post.findById(id);
      } catch (error) {
         throw error;
      }
   }

   /**
    * 
    * @param {*} limit 
    * @param {*} offset 
    * @param {*} title 
    * @returns 
    *  Get all posts (you can add pagination or filters as needed)
    */
   async getAllPosts(limit, offset, title) {
      try {
         const query = title
            ? { title: { $regex: title, $options: "i" } } // Case-insensitive search in the title
            : {}; // No filter if search is empty

         const posts = await Post.find(query)
            .skip(offset)
            .limit(limit);

         const total = await Post.countDocuments(query); // Count based on filtered results

         return { posts, total };
      } catch (error) {
         throw error;
      }
   }

   /**
    * 
    * @param {*} id 
    * @returns 
    */
   async deletePost(id) {
      try {
         return await Post.deleteOne({ _id: id });
      } catch (error) {
         throw error;
      }
   }
}

module.exports = PostService;
