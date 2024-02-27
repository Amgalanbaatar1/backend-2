const express = require("express");
const { getTasks, createTasks, updateTask, deleteTask } = require("../controller/tasks.controller");

const taskRouter = express.Router();

taskRouter.get("/", getTasks);
taskRouter.post("/create", createTasks);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
