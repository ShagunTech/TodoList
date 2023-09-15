import React, { useRef, useState,useEffect } from 'react'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-toastify';
import axios from 'axios'

const TaskList = ({task,setTasks}) => {

  const [taskName,setTaskName] = useState(task.name)
  const [isEditing,setIsEditing] = useState(false)
  const [isCompleted,setIsCompleted] = useState(task.completed)

  const taskValue = useRef(null)
  
  const editTask = ()=>{
    setIsEditing(true);
  }

  const deleteTask = async (id) => {
    try {
      const {data} = await axios.delete(`http://localhost:3000/api/v1/delete/${id}`)
      
      setTasks(prev =>{
        return prev.filter((task)=>task._id !== id)
      })
  
      toast.success(data.message,{
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error(error.response.data.message,{
        position: toast.POSITION.TOP_CENTER
      })
    }
  }
  

  const updateTask = async (id) => {
    
    if(taskName.length!==0){
      setIsEditing(false)
  
      setTasks(prevTasks => {
        return prevTasks.map((task) => task._id === id ? { ...task, name: taskName } : task);
      });
    }

    try {
      const {data} = await axios.put(`http://localhost:3000/api/v1/update/${id}`,{
        name:taskName
      })
      toast.success(data.message,{
        position:toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error(error.response.data.message,{
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const checked = async (id)=> {
    try{
      setIsCompleted(!isCompleted)
      const {data} = await axios.get(`http://localhost:3000/api/v1/complete/${id}`)  
    }catch(error){
      toast.error(error.response.data.message,{
        position:toast.POSITION.TOP_CENTER
      })
    }
  }

  useEffect(() => {
    if (isEditing) {
      taskValue.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex justify-between items-center py-2">
      <div className={`flex gap-4 items-center ${isCompleted ? 'line-through':''}`}>
        <input type="checkbox" className="checkbox" checked={isCompleted} onChange={()=>checked(task._id)}/>
        {isEditing ? (
          <div>
            <input
              className="input input-bordered join-item w-full h-9 px-2"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              ref={taskValue}
            />
            <div className='flex gap-2 py-4 justify-start'>
              <button
                onClick={() => updateTask(task._id)}
                className="bg-green-800 px-4 py-1 rounded-md"
                > 
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-800 px-4 py-1 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h3>{task.name}</h3>
        )}
      </div>

      <div className="flex items-center">
        <button
          className="btn btn-circle bg-[#1D232A] border-none"
          onClick={editTask}
        >
          <PencilSquareIcon className="w-5 h-5 text-gray-600" />
        </button>
        <button
          className="btn btn-circle bg-[#1D232A] border-none"
          onClick={() => deleteTask(task._id)}
        >
          <TrashIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default TaskList
