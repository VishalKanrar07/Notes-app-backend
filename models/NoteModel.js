const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: String, required: true },
}, {
    versionKey: false
})

const NoteModel = mongoose.model("note", noteSchema); // "note" -> this is the name of the schema

module.exports = {
    NoteModel,
};