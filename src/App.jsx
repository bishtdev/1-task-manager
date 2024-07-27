import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {

  const [taskList, setTaskList] = useState([])
  const [completed, setCompleted] = useState([])
  
  useEffect(()=>{
    let array = localStorage.getItem('taskList')

    if(array){
      setTaskList(JSON.parse(array))
    }
  },[])

  const [{isOver}, drop] = useDrop(()=>({
    accept:'todo',
    drop: (item) => addToCompleted(item.id, item.projectName, item.taskDescription, item.timeStamp),
    collect: (monitor) =>({
      isOver : !!monitor.isOver(),
    })
  }))
  
  const addToCompleted = (id, projectName, taskDescription, timeStamp) =>{
    const moveTask = taskList.filter((task) => id === task.id)
    setCompleted((completed) => [...completed, {moveTask, projectName, taskDescription, timeStamp}])
  }
  
  return (
    <>
      <h1 className="bg-[#1b4332] text-center text-[#74c69d] py-2 text-4xl font-bold font-serif">
        {" "}
        Task Manager{" "}
      </h1>
      <div className="flex p-4">
        <p className="text-[#74c69d] text-xl px-2 font-serif">
          {" "}
         - Click here to add new Task{" "}
        </p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      </div>

      <div className="flex flex-row ">
      <div className="w-full">
      <h2 className="text-[#74c69d] text-xl sm:text-2xl ml-6 font-extrabold">YOUR TASKS </h2>
      {taskList.map((task, i) => (
        <ToDo task={task} key={i} index={i} setTaskList={setTaskList} taskList={taskList}/>
      ))}
      </div>
      <div className="w-full" ref={drop}>
      <h2 className="text-[#74c69d] text-xl sm:text-2xl ml-6 font-extrabold">COMPLETED </h2>
      {completed.map((task, i) => (
        <ToDo task={task} key={i} index={i} setTaskList={setTaskList} taskList={taskList}/>
      ))}
      </div>
      </div>
    </>
  );
}

export default App;
