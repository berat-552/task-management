const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  return response.ok;
};

export default registerUser;
