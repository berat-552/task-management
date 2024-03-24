import { Task } from "../types/interfaces/Task";

const createTask = async (
  accessToken: string,
  task: Task
): Promise<boolean> => {
  const { title, content, completed, userId, dueDate, priority } = task;

  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/tasks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        content,
        completed,
        user_id: userId,
        dueDate,
        priority,
      }),
    }
  );

  return response.ok;
};

export default createTask;
