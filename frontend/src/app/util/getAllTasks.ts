import { TasksPayload } from "../types/interfaces/TasksPayload";

const getAllTasks = async (
  userId: string,
  accessToken: string
): Promise<TasksPayload | null> => {
  const response = await fetch(
    `https://task-management-api-r3rk.onrender.com/api/v1/tasks/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const tasks: TasksPayload = await response.json();

  return tasks ?? null;
};

export default getAllTasks;
