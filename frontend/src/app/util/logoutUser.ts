import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const logoutUser = async (accessToken: string): Promise<void> => {
  // remove cookies
  // POST /api/v1/auth/logout

  const response = await fetch(
    "https://task-management-api-r3rk.onrender.com/api/v1/auth/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
};

export default logoutUser;
