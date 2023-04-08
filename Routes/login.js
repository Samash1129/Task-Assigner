const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../Models/Users");
const router = express.Router();

//POST request for login
router.post('/login', async (req, res) => {
    try {
        const erp = req.body.erp
        const password = req.body.password

        const user = await Users.findOne({ erp })

        if (!user) {
            return res.status(401).send("Invalid Username or Password")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).send("Invalid Username or Password")
        }

        const token = jwt.sign({ name: user.name, roles: user.roles, erp: user.erp }, process.env.Secret_Key, { expiresIn: '1hr' })

        user.access_token = token
        await user.save()

        return res.status(200).json({
            name: user.name,
            erp: user.erp,
            message: "Login Successfull",
            Token: token
        })
    } catch (err) {
        console.error(err);
        res.send("ERROR");
    }
});

module.exports = router