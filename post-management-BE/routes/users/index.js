const { checUserExistance } = require('../../middlewares/check-user-existance/index');
const checkPermission = require('../../middlewares/check-permission/index');
const authMiddleware = require('../../middlewares/auth-middleware/index');
const { UserController } = require('../../controller/users/index');


const express = require('express');
const userRoute = express.Router();


userRoute.post('/create-user',
   authMiddleware,
   checkPermission('users', 'write'),
   checUserExistance,
   UserController.create_user);


userRoute.get('/get-user',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_all_users);


userRoute.get('/get-user/:id',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_user);


userRoute.get('/get_user_with_posts/:id',
   authMiddleware,
   checkPermission('users', 'read'),
   UserController.get_user_with_posts);

userRoute.delete('/delete-user/:id',
   authMiddleware,
   checkPermission('users', 'delete'),
   UserController.delete_user);


module.exports = userRoute;

