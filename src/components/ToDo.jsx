import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import EditTask from "./EditTask";

const ToDo = ({ task, setTaskList, taskList, index }) => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [{isDragging} ,drag] = useDrag(()=>({
    type:'todo',
    item:{
      id:index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timeStamp: task.timeStamp
    },
    collect:(monitor) =>({
      isDragging: !!monitor.isDragging(),
    })
  }))

  const handleDelete = () => {
    let updateTaskList = taskList.filter((task, taskIndex) => taskIndex !== index);
    // setTaskList(updateTaskList);
    localStorage.setItem("taskList", JSON.stringify(updateTaskList))
    window.location.reload()

  };

  const toggleStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalId);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [intervalId]);

  return (
    <div className="bg-[#40916c] text-black w-[80%] sm:w-[45%] flex flex-col items-start justify-start px-6 py-6 ml-6 my-4 rounded-sm" ref={drag}>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <p className="font-serif uppercase font-bold text-md sm:text-xl">
          {task.projectName}
        </p>
        <EditTask task={task} setTaskList={setTaskList} taskList={taskList} index={index} />
      </div>
      <p className="font-mono text-xs sm:text-sm text-balance break-words w-full py-2">
        {task.taskDescription}
      </p>

      {/* Stopwatch Feature */}
      <div className="w-full flex flex-col items-center mt-3">
        <p className="font-mono text-xs sm:text-sm">Time Elapsed: {formatTime(time)}</p>
        <div className="flex space-x-2 mt-2">
          <button 
            className="px-3 sm:px-7 py-1 text-sm font-bold bg-[#22b83b] hover:bg-[#43ab55] rounded-sm font-sans transition duration-200"
            onClick={toggleStopwatch}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button 
            className="px-3 sm:px-7 py-1 text-sm font-bold bg-[#84b88b] hover:bg-[#75a47c] rounded-sm font-sans transition duration-200"
            onClick={resetStopwatch}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center mt-3">
        <button 
          className="px-3 sm:px-7 py-1 text-sm font-bold bg-red-700 hover:bg-red-800 rounded-sm font-sans transition duration-200"
          onClick={handleDelete}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default ToDo;
