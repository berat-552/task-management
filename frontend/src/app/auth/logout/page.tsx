"use client";
import logoutUser from "@/app/util/logoutUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutPage() {
  const router = useRouter();

  const accessToken = Cookies.get("accessToken");

  const handleLogout = async () => {
    const loggedOut = accessToken && logoutUser(accessToken);

    if (loggedOut) {
      setTimeout(() => {
        router.push("/auth/login");
        router.refresh();
      }, 1500);
    }
  };

  handleLogout();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-100">
      <h1 className="font-medium text-lg sm:text-xl flex items-center justify-center">
        Logged out. Goodbye!
        <span className="ml-4 loading loading-spinner loading-lg"></span>
      </h1>
    </main>
  );
}
