import express from "express"
import { completeTask, createTask, getAllTasks, removeTask, updateTask } from "../controllers/task.js"

const router = express.Router()

router.post('/create',createTask)
router.get('/tasks',getAllTasks)
router.put('/update/:id',updateTask)
router.delete('/delete/:id',removeTask)
router.get('/complete/:id',completeTask)
export default router
