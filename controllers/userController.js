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
    let {
        name,
        username,
        email,
        department,
        password,
    } = req.body;
}

const postLoginUser = async (req, res) => {
    let {
        name,
        username,
        email,
        department,
        password,
    } = req.body;
}


module.exports = {
    getCreateUser,
    postCreateUser,
}

