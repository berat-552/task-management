"use client";

import React, { useState } from "react";
import { Task } from "../types/interfaces/Task";
import { format } from "date-fns";
import deleteTask from "../util/deleteTask";
import Cookies from "js-cookie";
import editTask from "../util/editTask";
import Priority from "../types/enums/Priority";

interface TaskCardProps {
  task: Task;
}

const accessToken = Cookies.get("accessToken");

const TaskCard = ({ task }: TaskCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const taskDate = format(new Date(task.dueDate), "dd/MM/yyyy");


  const handleTaskEdit = async () => {
    const editResult = accessToken && await editTask(accessToken, task._id, editedTask);
    editResult && setEditing(false);
  };

  return (
    <div className="flex justify-center items-center text-black">
      <div className="bg-white shadow-md p-6 rounded-md w-[400px]">
        <div className="p-4 mb-4 rounded-md">
          <a
            href="/"
            onClick={async () => {
              if (accessToken) {
                accessToken && (await deleteTask(task._id, accessToken));
              }
            }}
            className="btn bg-red-500 text-white border-none relative left-32 bottom-8"
          >
            Delete Task
          </a>
          <h3 className="text-xl font-semibold mb-2">
            Task Title: {task.title}
          </h3>

          <p className="text-gray-700 mb-2">{task.content}</p>

          <p className="text-gray-700 mb-2">
            Completed:{" "}
            {task.completed == false ? (
              <span className="text-primary">Incomplete</span>
            ) : (
              <span className="text-primary">Complete</span>
            )}
          </p>
          <p className="text-gray-700 mb-2">Due Date: {taskDate}</p>
          <p className="text-gray-700 mb-2"><span className="text-primary">{task.priority}</span> Priority</p>
        </div>

        <label htmlFor="my_modal_7" className="btn btn-primary text-white" onClick={() => setEditing(true)}>Edit Task</label>

        {editing && (
          <div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">

                <div className="text-white flex flex-col items-center justify-center">
                  <label className="text-white">New Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    className="input bg-slate-500 input-bordered w-full max-w-xs"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTask((prevTask) => ({
                      ...prevTask,
                      title: e.target.value
                    }))}
                    required
                  />
                  <label className="text-white">New Content</label>
                  <textarea
                    name="content"
                    value={editedTask.content}
                    className="input bg-slate-500 input-bordered w-full max-w-xs resize-none h-24"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedTask((prevTask) => ({
                      ...prevTask,
                      content: e.target.value
                    }))}
                    required
                  />

                  <div>
                    <label className="text-white">New Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="select bg-slate-500 select-bordered w-full max-w-md"
                      value={format(editedTask.dueDate, "yyyy-MM-dd")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTask((prevTask) => ({
                        ...prevTask,
                        dueDate: new Date(e.target.value)
                      }))}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="text-white text-sm">Completed</label>
                    <input
                      type="radio"
                      name="completed"
                      checked={editedTask.completed}
                      className="w-full max-w-xs"
                      onChange={() => setEditedTask((prevTask) => ({
                        ...prevTask,
                        completed: true
                      }))}
                      required
                    />
                    <label className="text-white text-sm">Not Completed</label>
                    <input
                      type="radio"
                      name="completed"
                      checked={!editedTask.completed}
                      className="w-full max-w-xs"
                      onChange={() => setEditedTask((prevTask) => ({
                        ...prevTask,
                        completed: false
                      }))}
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-white">New Priority:</label>
                    <select
                      id="priority"
                      name="priority"
                      className="select bg-slate-500 select-bordered w-full max-w-xs"
                      value={editedTask.priority}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedTask((prevTask) => ({
                        ...prevTask,
                        priority: e.target.value as Priority,
                      }))}
                      required
                    >
                      <option value={Priority.Low}>Low</option>
                      <option value={Priority.Medium}>Medium</option>
                      <option value={Priority.High}>High</option>
                    </select>
                  </div>
                  <button className="btn btn-neutral border-none bg-orange-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setEditing(false)}>Cancel Edit</button>
                  <a href="/" className="btn btn-primary text-white px-4 py-2 rounded-md mt-4" onClick={handleTaskEdit}>
                    Save Task
                  </a>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default TaskCard;
