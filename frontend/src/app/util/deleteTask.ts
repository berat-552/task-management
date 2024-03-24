const deleteTask = async (
  taskId: string,
  accessToken: string
): Promise<boolean> => {
  const response = await fetch(
    `https://task-management-api-r3rk.onrender.com/api/v1/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.ok;
};

export default deleteTask;
