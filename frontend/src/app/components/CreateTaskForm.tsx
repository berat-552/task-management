"use client";

import Priority from "../types/enums/Priority";
import { Task } from "../types/interfaces/Task";
import createTask from "../util/createTask";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface CreateTaskFormProps {
  params: {
    id: string;
  };
}

export default function CreateTaskForm({
  params: { id },
}: CreateTaskFormProps) {
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    content: "",
    completed: false,
    dueDate: new Date(),
    userId: id,
    priority: Priority.Low,
  });

  const [creationResult, setCreationResult] = useState<boolean>();

  const accessToken = Cookies.get("accessToken");

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    if (name === "dueDate") {
      const parsedDate = new Date(value);

      setFormData({
        ...formData,
        [name]: parsedDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      const result = await createTask(accessToken, formData);
      setCreationResult(result);

      if (result) {
        setTimeout(() => window.location.reload(), 500);
        router.push("/");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent) => {
          await handleTaskCreation(e);
        }}
        className="task-form p-4 flex flex-col items-center"
      >
        <div className="mb-4">
          <label className="text-sm font-medium text-white">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="text-sm font-medium text-white">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            className="input input-bordered w-full max-w-xs resize-none h-28"
            rows={1}
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="select select-bordered w-full max-w-md"
            value={format(formData.dueDate, "yyyy-MM-dd")}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Priority:</label>
          <select
            id="priority"
            name="priority"
            className="select select-bordered w-full max-w-xs"
            value={formData.priority}
            onChange={handleInputChange}
            required
          >
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.High}>High</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn-primary btn text-white p-2 rounded-md"
        >
          Create Task
        </button>
      </form>
      {creationResult !== undefined && (
        <div className="text-center font-medium sm:text-lg">
          {creationResult ? (
            <p className="text-green-500">Task Created Successfully</p>
          ) : (
            <p className="text-red-500">
              Failed to create task please check your inputs
            </p>
          )}
        </div>
      )}
    </div>
  );
}
