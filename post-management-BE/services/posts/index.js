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
