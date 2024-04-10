import React, { useState, useEffect } from 'react';
import axios from "axios"; // Make sure axios is installed in your project

import './DescriptionPage.css';
export const DescriptionPage=()=>{
    const [taskInfo, setTaskInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch task details when component mounts
    const fetchTaskInformation = async () => {
      try {
        const ngo_id = localStorage.getItem('ngo_id'); // Retrieve ngo_id from local storage
        const task_id = localStorage.getItem('task_id'); // Retrieve task_id from local storage

        const response = await axios.get('/fetchInfo', { id: task_id });

        if (response.data.success) {
          setTaskInfo(response.data); // Set taskInfo state with fetched data
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      } catch (error) {
        setError('Internal server error while fetching Task Info');
        setLoading(false);
      }
    };
    fetchTaskInformation(); // Call the fetchTaskInfo function
  }, []); // Empty dependency array ensures useEffect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
        <div>
        {taskInfo ? (
          <div>
            <h2>Task Details</h2>
            <p>Task ID: {taskInfo._id}</p>
            <p>Title: {taskInfo.title}</p>
            <p>Description: {taskInfo.description}</p>
            {/* Add more task details here */}
          </div>
        ) : (
          <div>No Task Information Available</div>
        )}
      </div>
    )
}
export default DescriptionPage;