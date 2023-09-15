import express from "express"
import dotenv from "dotenv"
import taskRouter from "./routes/task.js"
import connectDB from './Database/mongoDB.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1',taskRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

connectDB()