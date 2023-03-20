require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_Conn);

mongoose.connection.on('error', err => {
    console.log("Connection Failed");
})
mongoose.connection.on("connected", connected => {
    console.log("Connected to Database");
})

const app = express();

app.use(express.json());

const userRoute = require("./Routes/user");
app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Welcome");
})

const port = 8000;

app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})