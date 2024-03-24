import deleteUserAccount from "@/app/util/deleteUserAccount";
import { cookies } from "next/headers";

export default async function DeletePage() {
  const accessToken = cookies().get("accessToken")?.value;

  let result;

  if (accessToken) {
    await deleteUserAccount(accessToken);
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-base-100">
      {result ? (
        <h1 className="font-medium text-xl text-green-500">
          Account deleted successfully
        </h1>
      ) : (
        <h1 className="font-medium text-xl text-red-500">
          Error deleting account
        </h1>
      )}
    </div>
  );
}
