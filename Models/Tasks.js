const express = require('express');
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    erp: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;