const {
    blogModel
} = require('../models/blog');


const getBlogs = async (req, res) => {

    try {
        console.log("in try for getBlogs");
        let blogs = await blogModel.find({});

        // console.log(blogs);

        let context = {};

        context['blogs'] = blogs;

        res.render('blogs', context);
    }

    catch (err) {
        console.log("caught error");
        console.error(err);
        res.render('home');
    }
}

const getNewBlog = async(req, res) => {
    try {
        let context = {};
        console.log("to createPost");
        res.render('createPost', context);
    }

    catch {
        res.redirect('error');
    }
}


const postNewBlog = async(req, res) => {
    console.log("in POST blog");
    
    let context = {};


    try {
        let blog = await blogModel.create(req.body);
        context['blogs'] = data;
        res.redirect('/blogs');
    }

    catch {
        res.redirect('/blogs');
    }
}


module.exports = {
    getBlogs,
    getNewBlog,
    postNewBlog,
}