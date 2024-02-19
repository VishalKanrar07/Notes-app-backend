const express = require('express');
require("dotenv").config()
const { UserModel } = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("hello from server")
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {    // Store hash in your DB.
        if (err) {
            return res.send({ message: "something went wrong", status: 0 });
        }
        try {
            let user = new UserModel({ name, email, password: hash })
            console.log(user);
            await user.save();
            res.send({
                message: "User Created",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })
})

// userRouter.post("/register", async (req, res) => {

//     try {
//         const user = new UserModel(req.body);
//         console.log(user);
//         const createUser = await user.save();
//         res.status(201).send(createUser);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let option = {
        expiresIn: "50m"
    }

    try {
        let data = await UserModel.find({ email });
        if (data.length > 0) {
            let token = jwt.sign({ userId: data[0]._id }, "vishal", option);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) {
                    return res.send({ message: "Something went wrong:" + err, status: 0 });
                }
                if (result) {
                    res.send({
                        message: "User logged in successfully",
                        token: token,
                        status: 1,
                    });
                } else {
                    res.send({
                        message: "Incorrect password",
                        status: 0,
                    });
                }

            })
        } else {
            res.send({
                message: "User does not exist",
                status: 0,
            })
        }
    } catch (error) {
        res.send({
            message: error.message,
            status: 0,
        })
    }
})


module.exports = { userRouter };