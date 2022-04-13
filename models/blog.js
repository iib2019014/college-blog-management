// const express = require('express');
const mongoose = require('mongoose');


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