// const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
    console.log("connected to database");
})


let blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_date: {
        type: Date,
        default: Date.now,
    }
})

let blogModel = mongoose.model('Blog', blogSchema)



module.exports = {
    blogModel,
}