const PostService = require('../../services/posts/index');

class PostController {

   constructor() {
      this.post = new PostService();
   }

   // Create a post
   create_post = async (req, resp) => {
      try {
         const payload = req.body;

         const response = await this.post.createPost(payload);
         if (!response) return resp.error(null, 'Post creation failed!', 400);

         resp.success(response, 'Post creation successful', 201);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   };

   // Get a post by ID
   get_post_by_id = async (req, resp) => {
      try {
         const { id } = req.params;

         const response = await this.post.getPostById(id);
         if (!response) return resp.error(null, 'Post not found', 404);

         resp.success(response, 'Post retrieved successfully', 200);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   };

   // Get all posts
   get_all_posts = async (req, resp) => {
      try {
         const response = await this.post.getAllPosts();
         if (!response || response.length === 0) return resp.error(null, 'No posts found', 404);

         resp.success(response, 'Posts retrieved successfully', 200);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   };

   // Update a post
   update_post = async (req, resp) => {
      try {
         const { id } = req.params;
         const payload = req.body;

         const response = await this.post.updatePost(id, payload);
         if (!response) return resp.error(null, 'Post update failed', 400);

         resp.success(response, 'Post updated successfully', 200);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   };

   // Delete a post
   delete_post = async (req, resp) => {
      try {

         const { id } = req.params;
         const post = await this.post.getPostById(id);
         if (!!post === false) return resp.error(null, 'No post exist!', 400);

         const response = await this.post.deletePost(id);
         if (!response) return resp.error(null, 'Post deletion failed', 400);

         resp.success(null, 'Post deleted successfully', 200);
      } catch (error) {
         resp.error(error, error.message, 500);
      }
   };
}

module.exports.PostController = new PostController();
