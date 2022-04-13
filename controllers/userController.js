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
    let {
        username,
        password,
    } = req.body;
}


module.exports = {
    getCreateUser,
    postCreateUser,
    getLoginUser,
    postLoginUser,
}

