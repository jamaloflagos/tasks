const express = require('express');
const router = express.Router();
const { createNewTask, getAllTasks, getSingleTask, updateTask, deleteTask} = require('../../controllers/tasksController')

router.route('/')
    .get(getAllTasks)
    .post(createNewTask)

router.route('/:id')
    .get(getSingleTask)
    .patch(updateTask)
    .delete(deleteTask)

module.exports = router