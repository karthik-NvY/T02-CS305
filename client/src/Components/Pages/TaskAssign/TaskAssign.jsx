import React, { useState, useEffect } from "react";
import "./TaskAssign.css";
import NavBar from "../Dashboard/NavBar/NavBar"; // Optional NavBar component
import { FaCheck, FaTimes } from "react-icons/fa";
import fetchAPI from "../../Tools/FetchAPI";

const port_address = `http://localhost:8080`;

const ngo_id1 = "65da11a82216111bff5d0bc0";
const task_id = "66026442e2b18cac8fdda359";

const TaskAssign = () => {
  // State to hold task list fetched from backend
  const [taskList, setTaskList] = useState([]);
  const[taskInfo, setTaskInfo] = useState(null);

   useEffect(() => {
    const fetchData = async () => {
      let response = await fetchAPI(`${port_address}/api/ngoTask`, {ngo_id: ngo_id1}, "POST", false);
     // console.log(response);
      if (response.success) {
       // console.log("Response indicates success");
       // console.log("Ngo tasks received:", response.Ngo_tasks);
        setTaskList(response.Ngo_tasks);
      } else {
        console.log("Error from backend:", response.message);
      }
    };
    fetchData();
  }, []);
  

  
  useEffect(() => {
    const fetchTaskInfo = async (taskId) => {
      let response = await fetchAPI(`${port_address}/task/fetchInfo`, { id: taskId }, "POST", false);
      if (!response.success) {
        return response; // Return the fetched taskInfo
      } else {
        console.log("Error from backend:", response.message);
        return null;
      }
    };
  
    const fetchDataForTasks = async () => {
      const tasksInfo = await Promise.all(taskList.map(fetchTaskInfo));
      // Filter out any null responses
      const validTasksInfo = tasksInfo.filter(taskInfo => taskInfo !== null);
      setTaskInfo(validTasksInfo);
    };
  
    fetchDataForTasks();
  }, [taskList]); // Run this effect whenever taskList changes
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let response = await fetchAPI(`${port_address}/task/fetchInfo`, {id:task_id}, "POST", false);
  //   //  console.log(response);
  //     if (response.success) {
  //       console.log("Error from backend:", response.message);
       
  //     } else {
  //     //  console.log("Response indicates success");
        
  //          console.log("Ngo tasks received:", response.title);
  //           setTaskInfo([response]);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // Function to handle selection of a user for a task
  const handleUserSelect = (taskId, userId) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.task === taskId) {
        const updatedUsers = task.users.filter((user) => user.id !== userId);
        return { ...task, users: updatedUsers };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const handleUserReject = (taskId, userId) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.task === taskId) {
        const updatedUsers = task.users.filter((user) => user.id !== userId);
        return { ...task, users: updatedUsers };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  return (
    <div className="taskAssignpage">
      {/* Optional: Add NavBar component here */}
      <NavBar />

      <div className="taskassign-container">
        <h1>Task Assign</h1>

        <div className="tasklist-heading">
          <h2>Tasks</h2>
          <div className="tasklist">
            {/* Check if taskList is defined before mapping */}
            {Array.isArray(taskInfo) && taskInfo.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                {/* setTaskId(task._id); */}
                <div className="user-list">
                  {/* Map through the users array for each task to render each user */}
                  {/* {task.users.map((user) => (
                    <div key={user.id} className="user-card">
                      <span>{user.name}</span>
                      <div className="user-actions">
                        <button
                          className="select-button"
                         // onClick={() => handleUserSelect(task.task, user.id)}
                        >
                          <FaCheck style={{ color: "green" }} />
                        </button>
                        <button
                          className="cancel-button"
                        //  onClick={() => handleUserReject(task.task, user.id)}
                        >
                          <FaTimes style={{ color: "red" }} />
                        </button>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssign;
