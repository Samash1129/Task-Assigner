const express = require("express");
const bcrypt = require('bcrypt');
const Tasks = require("../Models/Tasks");
const Users = require("../Models/Users")
const authMiddleware = require('../Middlewares/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Test API
router.get('/temp', async (req, res) => {
    try {
        const tester = await Tasks.find();
        res.json(tester);
    } catch (err) {
        res.send({ message: "Not Found" })
    }
});

//POST API for adding tasks (Admin/SuperAdmin)
router.post('/addTask', authMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const curr_date = new Date()
        const newTask = new Tasks({
            task_name: req.body.task_name,
            description: req.body.description,
            erp: req.user.erp,
            start_date: curr_date,
            end_date: req.body.end_date,
            assigned_to: req.body.assigned_to,
            department: req.body.department
        })

        await newTask.save()

        res.status(201).send('Task Added');
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error');
    }
});

//GET API to get all the task assigned to a particular user
router.get('/getTasks', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const name = req.user.name
        // const users = await Users.findOne({ name }, 'name')
        const tasks = await Tasks.find({ assigned_to: name })

        res.send(tasks)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;