import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = async ()=> {
   try {

    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database connected successfully")
   } catch (error) {

    console.log(`Database are not connected ${error.message}`)
   }
}

export default connection