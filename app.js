const express = require('express');
const mongoose = require('mongoose');
const data = require('./data').data;
let next_id = require('./data').next_id;
const bodyparser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
//     console.log("connected to database");
// })

// let data = [ 'blog1', 'blog2', 'blog3', 'blog4' ];



// render the home page
app.get('/', (req, res) => {
    res.render('home');
})


// get the blogs data and render blogs.ejs
app.get('/blogs', (req, res) => {
let     context = {};
    context['blogs'] = data;
    // res.send("Hello World. This is my first app with tech stack (NodeJS, Express, JS)");

    res.render('blogs', context);
})


// render the createPost page
app.get('/blog/new', (req, res) => {
    let context = {};
    console.log("to createPost");
    res.render('createPost', context);
})

// posting the new blog data,
app.post('/blog/new', (req, res) => {
    console.log("in POST blog");
    
    let context = {};
    console.log(req.body);

    let {title, body} = req.body;

    console.log("title - " + title, "body - " + body);


    let newblog = {
        id: next_id.toString(),
        title: title,
        body: body,
    };

    data.push(newblog);

    console.log(newblog.id, newblog.title, newblog.body);

    next_id++;

    context['blogs'] = data;
    res.redirect('/blogs');
})


// render the editPost page with id as a query param,
app.get('/blog/edit/:id', (req, res) => {
    let id = req.params.id;

    let filtered_blogs = data.filter((blog) => blog.id === id);
    console.log(filtered_blogs);

    let context = {};
    context['blog'] = filtered_blogs[0];

    res.render('editPost', context);
});


app.post('/blog/edit/:id', (req, res) => {
    let id = req.params.id;
    let {title, body} = req.body;
    console.log("New values");
    console.log(title, body);

    let filtered_blogs = data.filter((blog) => blog.id === id);
    // console.log(filtered_blogs);

    filtered_blogs[0].title = title;
    filtered_blogs[0].body = body;

    // res.redirect('/blogs/edit/' + id.toString());
    res.redirect('/blogs');
})

app.get('/blog/delete/:id', (req, res) => {
    let id = req.params.id;

    let filtered_blogs = data.filter((blog) => blog.id === id);
    console.log(filtered_blogs);

    let context = {};
    context['blog'] = filtered_blogs[0];

    res.render('deletePost', context);
})

app.post('/blog/delete/:id', (req, res) => {
    let id = req.params.id;

    for (let i = 0; i < data.length; i++) {
        if(data[i].id === id) {
            data.splice(i, 1);
            break;
        }
    }

    res.redirect('/blogs');
})

app.listen(3001, () => {
    console.log("listening on port 3001");
})