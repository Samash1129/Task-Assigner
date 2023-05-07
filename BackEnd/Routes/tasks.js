const express = require("express");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require("multer");
const Tasks = require("../Models/Tasks");
const Users = require("../Models/Users")
const authMiddleware = require('../Middlewares/auth');
const router = express.Router();

const upload = multer({});

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
router.post('/addTask', authMiddleware, upload.array('files'), async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const curr_date = new Date()
        const formattedDate = curr_date.toLocaleDateString('en-GB')

        const newTask = new Tasks({
            task_name: req.body.task_name,
            description: req.body.description,
            erp: req.user.erp,
            start_date: formattedDate,
            end_date: req.body.end_date,
            assigned_to: req.body.assigned_to,
            department: req.body.department,
            files: req.files.map((file) => {
                return {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    file: file.buffer,
                };
            })
        })

        await newTask.save()
        // res.send(newTask)

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mashoudntaha@gmail.com',
                pass: 'pkfbteyeydlsepnk'
            }
        });

        // retrieve the email address from the database
        const user = await Users.findOne({ name: req.body.assigned_to }); // replace with your own query
        const email = user.email;

        // create an email message object
        let mailOptions = {
            from: 'mashoudntaha@gmail.com',
            to: email,
            subject: 'Test email',
            text: 'This is a test email sent from Node.js'
        };

        // send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).send('Task Added');
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error');
    }
});

//GET API to get all the task assigned to a particular user
router.get('/getMyTasks', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const name = req.user.name
        // const users = await Users.findOne({ name }, 'name')
        const tasks = await Tasks.find({ assigned_to: name }, { _id: 0, task_name: 1, erp: 1, end_date: 1, status: 1 })

        const formattedMyTasks = tasks.map(task => {
            const formattedDate = new Date(task.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            return { 
                task_name: task.task_name, 
                assigned_by: task.erp, 
                end_date: formattedDate, 
                status: task.status 
            }
        });

        res.send(formattedMyTasks)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//GET API to get all the task assigned by the user(Admin/Super Admin)
router.get('/getAssignedTasks', authMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const erp = req.user.erp
        // const users = await Users.findOne({ name }, 'name')
        const tasks = await Tasks.find({ erp: erp }, { _id: 0, task_name: 1, assigned_to: 1, end_date: 1, status: 1 })

        const formattedTasks = tasks.map(task => {
            const formattedDate = new Date(task.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            return { 
                task_name: task.task_name, 
                assigned_to: task.assigned_to, 
                end_date: formattedDate, 
                status: task.status 
            }
        });

        res.send(formattedTasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//DELETE API to delete a task
router.delete('/deleteTask/:id', authMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const task = await Tasks.findOneAndDelete({ _id: req.params.id, erp: req.user.erp });

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.status(200).send('Task removed');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//PATCH API to update a task
router.patch('/updateTask/:id', authMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.Secret_Key);
        req.user = decoded;

        const task = await Tasks.findOneAndUpdate({ _id: req.params.id, erp: req.user.erp });

        if (!task) {
            return res.status(404).send('Task not found');
        }

        task.task_name = req.body.task_name || task.task_name
        task.description = req.body.description || task.description
        task.end_date = req.body.end_date || task.end_date
        task.assigned_to = req.body.assigned_to || task.assigned_to
        task.department = req.body.department || task.department

        await task.save()

        res.status(200).send('Task updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

module.exports = router;