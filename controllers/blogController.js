const {
    blogModel
} = require('../models/blog');


const getBlogs = async (req, res) => {

    try {
        console.log("in try for getBlogs");
        let blogs = await blogModel.find({});

        // console.log(blogs);

        console.log("loggedUser : ", req.loggedUser);

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

const getEditBlog = async (req, res) => {
    try {
        let context = {};
        
        console.log("req.params._id: " + req.params._id);
        let filtered_blogs = await blogModel.find({
            _id: req.params._id,
        });

        context['blog'] = filtered_blogs[0];

        res.render('editPost', context);
    }

    catch {

    }
}

const postEditBlog = async (req, res) => {
    try {
        // await blogModel.findByIdAndUpdate(req.params._id, body: req.body);
        await blogModel.findByIdAndUpdate(req.params._id, req.body);
        res.redirect('/blogs');
    }

    catch {

    }
}

const getDeleteBlog = async (req, res) => {
    try {
        let context = {};

        let filtered_blogs = await blogModel.find({
            _id: req.params._id,
        })

        context['blog'] = filtered_blogs[0];
        res.render('deletePost', context);
    }

    catch {

    }
}

const postDeleteBlog = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params._id);

        res.redirect('/blogs');
    }

    catch {

    }
}


module.exports = {
    getBlogs,
    getNewBlog,
    postNewBlog,
    getEditBlog,
    postEditBlog,
    getDeleteBlog,
    postDeleteBlog,
}