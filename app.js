const express = require('express');
const mongoose = require('mongoose');
const data = require('./data').data;
let next_id = require('./data').next_id;
const bodyparser = require('body-parser');


const {
    blogModel,
} = require('./models/blog');


const {
    blogRouter,
} = require('./routes/blog');

const app = express();

app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));



// render the home page
app.get('/', (req, res) => {
    res.render('home');
})


// get the blogs data and render blogs.ejs
app.use('/blogs', blogRouter);


// render the createPost page

// posting the new blog data,


// render the editPost page with _id as a query param,
app.get('/blog/edit/:_id', async(req, res) => {

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
});


app.post('/blog/edit/:_id', async(req, res) => {
    try {
        // await blogModel.findByIdAndUpdate(req.params._id, body: req.body);
        await blogModel.findByIdAndUpdate(req.params._id, req.body);
        res.redirect('/blogs');
    }

    catch {

    }
})

app.get('/blog/delete/:_id', async(req, res) => {

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
})

app.post('/blog/delete/:_id', async(req, res) => {

    try {
        await blogModel.findByIdAndDelete(req.params._id);

        res.redirect('/blogs');
    }

    catch {

    }
})

app.listen(3001, () => {
    console.log("listening on port 3001");
})