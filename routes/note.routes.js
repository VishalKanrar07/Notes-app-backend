const express = require('express');
require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require('../middleware/authenticator');
const { NoteModel } = require('../models/NoteModel');

const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {

    let token = req.headers.authorization;
    jwt.verify(token, "vishal", async (err, decode) => {

        try {
            let data = await NoteModel.find({ user: decode.userId });
            res.send({
                data: data,
                message: "Success",
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

noteRouter.post("/create", async (req, res) => {

    try {
        let note = new NoteModel(req.body);
        await note.save();
        res.send({
            message: "Note Created",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.patch("/update", async (req, res) => {

    let { id } = req.headers
    console.log(id);
    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
        console.log(id);
        console.log(req.body);
        res.send({
            message: "Note updated 1",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.delete("/delete", async (req, res) => {

    let { id } = req.headers;
    try {
        await NoteModel.findByIdAndDelete({ _id: id });
        res.send({
            message: "Note deleted",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


module.exports = {
    noteRouter
}