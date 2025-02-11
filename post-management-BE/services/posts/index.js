const Post = require('../../models/posts/index');

class PostService {
   constructor() { }

   // Create a new post
   async createPost(payload) {
      try {
         return await Post.insertOne(payload);
      } catch (error) {
         throw error;
      }
   }

   // Get a single post by its ID
   async getPostById(id) {
      try {
         return await Post.findById(id);
      } catch (error) {
         throw error;
      }
   }

   // Get all posts (you can add pagination or filters as needed)
   async getAllPosts() {
      try {
         return await Post.find({});
      } catch (error) {
         throw error;
      }
   }

   // Update a post by its ID
   async updatePost(id, payload) {
      try {
         return await Post.findByIdAndUpdate(id, payload, { new: true });
      } catch (error) {
         throw error;
      }
   }

   // Delete a post by its ID
   async deletePost(id) {
      try {
         return await Post.deleteOne({ _id: id });
      } catch (error) {
         throw error;
      }
   }
}

module.exports = PostService;
