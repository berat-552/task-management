import { UserInfoPayload } from "../types/interfaces/UserInfoPayload";

const getUserInfo = async (accessToken: string): Promise<UserInfoPayload> => {
  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/auth/info",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const userInfo: UserInfoPayload = await response.json();

  return userInfo;
};

export default getUserInfo;
