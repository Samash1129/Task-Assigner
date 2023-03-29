require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(process.env.DB_Conn);

mongoose.connection.on('error', err => {
    console.log("Connection Failed");
})
mongoose.connection.on("connected", connected => {
    console.log("Connected to Database");
})

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))

const userRoute = require('./Routes/user');
app.use("/user", userRoute);

const taskRoute = require('./Routes/tasks');
app.use("/tasks", taskRoute);

app.get("/", (req, res) => {
    res.send("Welcome");
})

const port = 8000;

app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})