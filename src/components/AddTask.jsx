import { useState } from "react";
import React from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }

    if (name === "projectName" && value === "") {
      setErrorMessage("please enter project name to continue");
    }
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("please enter project name to continue");
    } else {
      let timeStamp = new Date();
      let tempList = taskList;
      tempList.push({
        projectName,
        taskDescription,
        timeStamp: timeStamp,
        duration: 0,
      });
      
      localStorage.setItem('taskList', JSON.stringify(tempList)) //for local storage
      window.location.reload()

      // setTaskList([
      //   ...taskList,
      //   { projectName, taskDescription, timeStamp: timeStamp },
      // ]);
      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  };

  return (
    <>
      <button
        className="px-2 py-0.5 font-bold bg-[#40916c] rounded-md transition duration-200 hover:scale-110 font-serif"
        onClick={() => setAddModal(true)}
      >
        Add Task
      </button>
      {addModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-black bg-opacity-50">
            <div className="w-[80%] sm:w-[40%] flex flex-col bg-[#9ad0b7] items-center justify-center rounded-sm shadow-2xl ">
              <div className="w-full flex flex-row justify-between p-5 gap-5 ">
                <h3 className="text-md leading-tight sm:text-3xl font-serif ">
                  Add New Task
                </h3>
                <button
                  className="px-1 font-semibold leading-none block text-md sm:text-2xl hover:scale-110"
                  onClick={() => setAddModal(false)}
                >
                  X
                </button>
              </div>
              <form className="p-6">
                <div>
                  <label
                    htmlFor="project-name"
                    className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                  >
                    Project name
                  </label>
                  <input
                    className="p-1 w-56 md:w-48 lg:w-[30rem] h-10 focus:outline-none"
                    name="projectName"
                    value={projectName}
                    onChange={handleInput}
                    type="text"
                    placeholder="project name"
                    id="project-name"
                    required
                  />
                  <p className="text-red-500 p-1">{errorMessage}</p>
                </div>
                <div>
                  <label className="block uppercase text-gray-700 text-xs font-semibold my-2">
                    {" "}
                    task Description
                  </label>
                  <textarea
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleInput}
                    id="task-description"
                    rows={3}
                    placeholder="Description of product"
                    className="p-1 w-56 md:w-48 lg:w-[30rem] focus:outline-none"
                  ></textarea>
                </div>
              </form>
              <div className="p-4 flex justify-end ">
                <button
                  className="px-10 py-1 font-bold bg-[#40916c] hover:bg-green-700 rounded-sm font-serif transition duration-200"
                  onClick={handleAdd}
                >
                  ADD TASK
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
