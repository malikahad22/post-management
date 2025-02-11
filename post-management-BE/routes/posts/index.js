//--------------------- app imports //---------------------
const authMiddleware = require('../../middlewares/auth-middleware/index');
const checkPermission = require('../../middlewares/check-permission/index');
const { PostController } = require('../../controller/posts/index');

//--------------------- library imports //---------------------
const express = require('express');
const postRoute = express.Router();



postRoute.post('/create-post',
   authMiddleware,
   checkPermission('posts', 'write'),
   PostController.create_post
);


postRoute.get('/get-post/:id',
   authMiddleware,
   checkPermission('posts', 'read'),
   PostController.get_post_by_id
);


postRoute.get('/get-post',
   authMiddleware,
   checkPermission('posts', 'read'),
   PostController.get_all_posts
);


postRoute.delete('/delete-post/:id',
   authMiddleware,
   checkPermission('posts', 'delete'),
   PostController.delete_post
);

module.exports = postRoute;