import { AuthPayload } from "../types/interfaces/AuthPayload";

const loginUser = async (
  email: string,
  password: string
): Promise<AuthPayload> => {
  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const authPayload: AuthPayload = await response.json();

  return authPayload;
};

export default loginUser;
