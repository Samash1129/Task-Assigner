const express = require("express");
const Users = require("../Models/Tasks");
const router = express.Router();

//Test API
// router.get('/temp', async (req, res) => {
//     try {
//         const tester = await Users.find();
//         res.json(tester);
//     } catch (err) {
//         res.send({
//             message: "Not Found"
//         })
//     }
// });

//POST request for login
router.post('/login', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password

        const user = await Users.findOne({name})

        if(!user) {
            return res.status(401).send("Invalid Username or Password")
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            return res.status(401).send("Invalid Username or Password")
        }

        return res.status(200).json({
            name: user.name,
            message: "Login Successfull"
        })
    } catch (err) {
        console.error(err);
        res.send("ERROR");
    }
});

//POST request for register
router.post('/register', async (req, res) => {
    const name = req.body.name
    const password = req.body.password

    const user = await Users.findOne({name})

    if(user) {
        res.status(400).send("User already Exists")
    }

    const hashedPass = await bcrypt.hash(password, 10)

    // sample JSON
    // {
        //     "name": "test1",
    //     "password": "qwerty123",
    //     "contact_number": 123456789,
    //     "gender": "Male",
    //     "age": 20,
    //     "erp": 34876,
    //     "department": "CS",
    //     "email": "342@123.com",
    //     "roles": "User"
    // }
    const newUser = new Users({
        name,
        password: hashedPass,
        contact_number: req.body.contact_number,
        gender: req.body.gender,
        age: req.body.age,
        erp: req.body.erp,
        department: req.body.department,
        email: req.body.email,
        roles: req.body.roles
    })
    
    await newUser.save()

    res.status(201).send("User Created")
});

module.exports = router;