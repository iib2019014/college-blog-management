const express = require('express');
const mongoose = require('mongoose');
const data = require('./data').data;
let next_id = require('./data').next_id;
const bodyparser = require('body-parser');
// const 


const {
    blogModel,
} = require('./models/blog');


const {
    blogRouter,
} = require('./routes/blog');


const {
    userRouter,
} = require('./routes/user');
const session = require('express-session');


const app = express();


app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {  },
}))

app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
    console.log("connected to database");
})




// render the home page
app.get('/', (req, res) => {
    res.render('home');
})


// get the blogs data and render blogs.ejs
app.use('/blogs', blogRouter);

app.use('/users', userRouter);


// render the createPost page

// posting the new blog data,



// render the editPost page with _id as a query param,

// posting the edited blog,



// render the deletePost page with _id as a query param,

// posting the deleted blog,


app.listen(3001, () => {
    console.log("listening on port 3001");
})