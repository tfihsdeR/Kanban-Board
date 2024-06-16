import express from "express";

import {
    createTask,
    deleteTask,
    readAllTasks,
    readTaskById, readTasksByBoardId, updateTask
} from "../controllers/task"
const router = express.Router()

router.post("/task/create", createTask)
router.get("/task/read/:id", readTaskById)
router.get("/task/readByBoardId/:id", readTasksByBoardId)
router.get("/task/readAll", readAllTasks)
router.put("/task/update", updateTask)
router.delete("/task/delete/:id", deleteTask)

export default router