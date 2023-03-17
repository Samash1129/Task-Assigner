const express = require('express');
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Task_Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ERP: {
        type: Number,
        required: true
    },
    Start_Date: {
        type: Date,
        required: true
    },
    End_Date: {
        type: Date,
        required: true
    },
    Assigned_To: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;