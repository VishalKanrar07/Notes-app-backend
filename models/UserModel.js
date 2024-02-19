const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema); // "user"-> this is the name of the schema

module.exports = {
    UserModel,
};