import React, { useEffect, useState } from "react";

const EditTask = ({ index, setTaskList, taskList, task }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a copy of the taskList to avoid direct state mutation
    const updatedTaskList = [...taskList];

    // Find the index of the task to be updated
    const taskIndex = updatedTaskList.indexOf(task);

    // Update the task at the found index
    if (taskIndex > -1) {
      updatedTaskList[taskIndex] = {
        projectName: projectName,
        taskDescription: taskDescription,
        timestamp:task.timeStamp,
        duration:task.duration
      };
    }

    // Update the state with the modified task list
    // setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList))
    window.location.reload()

    // Close the edit modal
    setEditModal(false);
  };
  return (
    <>
      <button
        onClick={() => setEditModal(true)}
        className="px-3 sm:px-7 py-1 text-sm font-bold bg-green-700 hover:bg-green-800 rounded-sm font-sans transition duration-200"
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-black bg-opacity-50">
            <div className="w-[80%] sm:w-[40%] flex flex-col bg-[#9ad0b7] items-center justify-center rounded-sm shadow-2xl ">
              <div className="w-full flex flex-row justify-between p-5 gap-5 ">
                <h3 className="text-md leading-tight sm:text-3xl font-serif ">
                  Edit Task
                </h3>
                <button
                  className="px-1 font-semibold leading-none block text-md sm:text-2xl hover:scale-110"
                  onClick={() => setEditModal(false)}
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
                    Edit Project name
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
                </div>
                <div>
                  <label className="block uppercase text-gray-700 text-xs font-semibold my-2">
                    {" "}
                    Edit task Description
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
                  onClick={handleUpdate}
                >
                  EDIT TASK
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditTask;
