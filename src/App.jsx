import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
    const storedCompleted = localStorage.getItem('completedTasks');
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item) => addToCompleted(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id) => {
    const taskToMove = taskList.find((task) => task.index === id);

    if (taskToMove) {
      // Remove the task from taskList
      const updatedTaskList = taskList.filter((task) => task.index !== id);
      setTaskList(updatedTaskList);

      // Add the task to completed
      setCompleted((prevCompleted) => [...prevCompleted, taskToMove]);

      // Update localStorage
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
      localStorage.setItem('completedTasks', JSON.stringify([...completed, taskToMove]));
    }
  };

  return (
    <>
      <h1 className="bg-[#1b4332] text-center text-[#74c69d] py-2 text-4xl font-bold font-serif">
        Task Manager
      </h1>
      <div className="flex p-4">
        <p className="text-[#74c69d] text-xl px-2 font-serif">
          - Click here to add new Task
        </p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      </div>

      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="text-[#74c69d] text-xl sm:text-2xl ml-6 font-extrabold">YOUR TASKS</h2>
          {taskList.map((task) => (
            <ToDo task={task} key={task.id} index={task.id} setTaskList={setTaskList} taskList={taskList} />
          ))}
        </div>
        <div className="w-full" ref={drop}>
          <h2 className="text-[#74c69d] text-xl sm:text-2xl ml-6 font-extrabold">COMPLETED</h2>
          {completed.map((task) => (
            <ToDo task={task} key={task.id} index={task.id} setTaskList={setTaskList} taskList={taskList} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
