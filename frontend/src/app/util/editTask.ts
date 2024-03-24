import { UpdateTask } from "../types/interfaces/UpdateTask";

const editTask = async (accessToken: string, taskId: string, task: UpdateTask): Promise<boolean> => {

  const response = await fetch(
    `https://task-management-api-r3rk.onrender.com/api/v1/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: task.title,
        content: task.content,
        completed: task.completed,
        dueDate: task.dueDate,
        priority: task.priority
      }),
    }
  );

  return response.ok;
}

export default editTask;
