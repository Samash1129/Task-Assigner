const express = require('express');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    erp: {
        type: Number,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    roles: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;