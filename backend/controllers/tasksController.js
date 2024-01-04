const Task = require("../models/taskModel")
const asyncHandler = require('express-async-handler')

const createNewTask = asyncHandler(async(req, res) => {
    console.log("create new task request recieved");
    const { title, description, frequency, due_date } = req.body
    
    if (!title || !description || !frequency || !due_date) return res.status(400).json({message: "All input field required"});

    const task = await Task.create({title, description, frequency, due_date});

    if (task) {
        res.status(201).json({message: "A new task added", task})
    } else {
        res.status(400).json({message: "Invalid input type"})
    }
    
})

const getAllTasks = asyncHandler(async(req, res) => {
    console.log("get all tasks request recieved");
    
    const tasks = await Task.find().sort({createdAt: -1});

    if (!tasks || !tasks.length) {
        return res.sendStatus(204)
    }

    res.json(tasks)
})

const getSingleTask = asyncHandler(async(req, res) => {
    console.log("get single task request recieved")
    const { id } = req.params

    if (!id) return res.status(400).json({message: "Invalid task ID"});

    const task = await Task.findOne({_id: id});

    if (!task) {
        return res.status(204).json({message: "Task with such ID doesn't exit"});
    }

    res.json(task)

})

const updateTask = asyncHandler(async(req, res) => {
    console.log("update task request recieved")
    const { id } = req.params

    if (!id) return res.status(400).json({message: "Can't update task, Invalid Task ID"});

    const task = await Task.findByIdAndUpdate(id, req.body, {new: true});  

    if (task) {
        res.status(201).json(task);
    } else {
        res.status(500).json({message: "Can't update task, Server side error"})
    }

})

const deleteTask = asyncHandler(async(req, res) => {
    console.log("delete task request receieved")
    const { id } = req.params

    if (!id) return res.status(400).json({message: "Can't delete task, Invalid task ID"});

    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.json(500).json({message: "Can't delete task, Server side error"})

    const reply = `Task ${task.title} deleted successfully`

    res.json({message: reply, task})

})

module.exports = {
    createNewTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}