// const express = require('express');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Age: {
        type: Number
    },
    ERP: {
        type: Number,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Roles: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;