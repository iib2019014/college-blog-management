const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    hash,
    genSalt,
} = require('bcrypt');

const {
    userModel
} = require('../models/user');


const getCreateUser = async (req, res) => {
    let context = {};

    res.render('createUser', context);
}

const getLoginUser = async (req, res) => {
    try {
        let context = {};

        res.render('loginUser', context);
    }

    catch {
        
    }
}






const postCreateUser = async (req, res) => {
    try {
        let {
            name,
            username,
            email,
            department,
            password,
        } = req.body;

        // console.log(req.body);


        let salt = await genSalt();
        let hashed = await hash(password, salt);


        console.log("salt : ", salt, "hashed : ", hashed);

        password = hashed;

        await userModel.create({
            name,
            username,
            email,
            department,
            password,
        });

        res.send("User Created");
    }

    catch (err) {
        console.log(err);
    }
    


}

const postLoginUser = async (req, res) => {
    try {
        let {
            // username,
            email,
            password,
        } = req.body;

        console.log(email, password);
    
    
        let req_user = await userModel.findOne({
            email,
        })  // returns only one element,
        
        console.log("req_user : ", req_user);
    
    
        if(!req_user) {
            console.log("User Not Found");
        }
        
        console.log("User found");
        console.log(password, req_user.password);
        if(await compare(password, req_user.password)) {
            let loggedUser = {
                email,
                name: req_user.name,
                username: req_user.username,
                department: req_user.department,
            }
    
            const token = await jwt.sign(loggedUser, "secret_key", {expiresIn: "15s"})
            // we need to send this token to authenticateToken().
            

            res.locals.token = token;
            // now we can use token jst by typing 'token' in  the rendered ejs files,

            req.session.token = token;
            req.session.loggedUser = loggedUser;
            console.log("Credentials authenticated");
            res.redirect('/blogs')
        }
        
        else {
            console.log("Invalid credentials");
        }


        res.send("user logged in");
    }

    catch (err) {
        console.log(err);
    }
}



const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (token == null) {
            res.send("Please log in");
        }


        let loggedUser = jwt.verify(token, "secret_key");

        if(!loggedUser) {
            res.send("Please log in(not verified)");
        }

        req.loggedUser = loggedUser;

        console.log(loggedUser);

        next();
    }

    catch (err) {
        console.log(err);
    }
}



const shareToken = async (req, res, next) => {
    
}


module.exports = {
    getCreateUser,
    postCreateUser,
    getLoginUser,
    postLoginUser,
    authenticateToken,
    shareToken,
}

