//--------------------- app imports //---------------------
const authMiddleware = require('../../middlewares/auth-middleware/index');
const checkPermission = require('../../middlewares/check-permission/index');
const { PostController } = require('../../controller/posts/index');
const upload = require('../../middlewares/mutler');


//--------------------- library imports //---------------------
const express = require('express');
const postRoute = express.Router();




postRoute.post('/post',
   authMiddleware,
   checkPermission('posts', 'write'),
   upload.single('thumbnail'),
   PostController.create_post
);


postRoute.get('/post/:id',
   authMiddleware,
   checkPermission('posts', 'read'),
   PostController.get_post_by_id
);


postRoute.get('/post',
   authMiddleware,
   checkPermission('posts', 'read'),
   PostController.get_all_posts
);


postRoute.delete('/post/:id',
   authMiddleware,
   checkPermission('posts', 'delete'),
   PostController.delete_post
);

module.exports = postRoute;