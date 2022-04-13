const express = require('express');
const userRouter = express.Router();

const {
    getCreateUser,
    postCreateUser,
    getLoginUser,
    postLoginUser,
} = require('../controllers/userController');


userRouter.get('/signup', getCreateUser);
userRouter.get('/signin', getLoginUser);


userRouter.post('/signup', postCreateUser);
userRouter.post('/signin', postLoginUser);


module.exports = {
    userRouter,
}