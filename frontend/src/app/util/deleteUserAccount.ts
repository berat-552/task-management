const deleteUserAccount = async (accessToken: string): Promise<boolean> => {
  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/auth/delete",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(await response.json());

  return response.ok;
};

export default deleteUserAccount;
