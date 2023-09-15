import React from 'react'

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import TaskList from './TaskList';

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(null);

    const create = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/create",
          {
            task,
          }
        );
        setTask("");
        setTasks([...tasks, data.task]);
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/tasks");
        setTasks(data.tasks);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    useEffect(() => {
      let tasks = async () => {
        await fetchTasks();
      };
      tasks();
    }, []);

    useEffect(()=>{
        console.log(tasks)
    },[tasks])
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      {/* input */}
      <div className="w-1/2 flex mt-32">
        <form className="join w-full" onSubmit={create}>
          <input
            className="input input-bordered join-item w-full rounded-full h-16  px-5"
            placeholder="Enter the task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn join-item rounded-full h-full px-10">
            Add
          </button>
        </form>
      </div>

      {/* to contain all tasks */}
      <div className="w-1/2 px-2 mt-5">
        {
          tasks && tasks.map((task) => {
            return (
              <TaskList key={task._id} task={task} setTasks={setTasks} />
            );
          })
        }
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home
