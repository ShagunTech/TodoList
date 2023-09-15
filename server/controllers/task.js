import Task from "../models/task.js"

export const createTask= async (req,res)=>{
    try {
        let {task} = req.body

        task = task.toLowerCase()

        const tsk = await Task.findOne({name: task})

        if(tsk){
            return res.status(400).json({
                success:false,
                message:"Task is already there"
            })
        }

        const taskValue = await Task.create({
            name:task
        })
        await taskValue.save();
        return res.status(201).json({
            success:true,
            message:"Task created successfully",
            task: taskValue
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }

}

export const getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find({})
    
        res.status(200).json({
            status: true,
            tasks,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateTask = async (req,res) => {
    try {
        
        const {id} = req.params
        const {name} = req.body

        const task = await Task.findById(id)

        if(!task){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }

        if(!name){
            return res.status(400).json({
                success:false,
                message:"Name is required"
            })
        }

        task.name = name;
        await task.save();

        res.status(200).json({
            success: true,
            message:"Task Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const removeTask = async (req,res) => {
    try {
        
        const {id} = req.params
    
        const task = await Task.findById(id)

        if (!task) {
          return res.status(404).json({
            success: false,
            message: "Task not found",
          });
        }

        await task.deleteOne()
        
        return res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

export const completeTask = async (req,res) => {
    const {id} = req.params

    const task = await Task.findById(id)

    if(!task){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
    }

    if(task.completed){
        task.completed=false
    }else{
        task.completed=true
    }
    await task.save()

    return res.status(200).json({
        success:true,
        message:"Task Updated"
    })
}