const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema

const taskSchema = Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        required: false
    },

    due_date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Task = mongoose.model("tasks", taskSchema)

module.exports = Task