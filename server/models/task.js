import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Task'],
        unique: true
    },
    completed:{
        type:Boolean,
        default:false
    }

})
export default mongoose.model('task',taskSchema)