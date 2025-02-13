const { checUserExistance } = require('../../middlewares/check-user-existance/index');
const checkPermission = require('../../middlewares/check-permission/index');
const authMiddleware = require('../../middlewares/auth-middleware/index');
const { UserController } = require('../../controller/users/index');


const express = require('express');
const userRoute = express.Router();


userRoute.post('/user',
   authMiddleware,
   checkPermission('users', 'write'),
   checUserExistance,
   UserController.create_user);


userRoute.get('/user',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_all_users);


userRoute.get('/user/:id',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_user);


userRoute.get('/user/posts/:id',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_user_with_posts);

userRoute.delete('/user/:id',
   authMiddleware,
   checkPermission('users', 'delete'),
   UserController.delete_user);


module.exports = userRoute;

