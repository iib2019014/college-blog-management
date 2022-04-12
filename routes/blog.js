const express = require('express');
const blogRouter = express.Router();

const {
    getBlogs,
    getNewBlog,
    postNewBlog,
} = require('../controllers/blogController');

blogRouter.get('/', getBlogs);
blogRouter.get('/new', getNewBlog);


blogRouter.post('/new', postNewBlog);

module.exports = {
    blogRouter,
}