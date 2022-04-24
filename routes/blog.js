const express = require('express');
const blogRouter = express.Router();

const {
    getBlogs,
    getNewBlog,
    postNewBlog,
    getEditBlog,
    postEditBlog,
    getDeleteBlog,
    postDeleteBlog,
} = require('../controllers/blogController');


const {
    authenticateToken,
} = require('../controllers/userController');



blogRouter.get('/', getBlogs);
blogRouter.get('/new', getNewBlog);
blogRouter.get('/edit/:_id', getEditBlog);
blogRouter.get('/delete/:_id', getDeleteBlog);


blogRouter.post('/new', postNewBlog);
blogRouter.post('/edit/:_id', postEditBlog);
blogRouter.post('/delete/:_id', postDeleteBlog);



module.exports = {
    blogRouter,
}