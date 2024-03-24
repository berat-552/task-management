import DeleteAccountButton from "@/app/components/DeleteAccountButton";
import getAllTasks from "@/app/util/getAllTasks";
import getUserInfo from "@/app/util/getUserInfo";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserPage() {
  const accessToken = cookies().get("accessToken")?.value;

  const userInfo = accessToken ? await getUserInfo(accessToken) : null;

  const username = userInfo?.user?.user.username;

  const id = userInfo?.user.user.userId;

  const tasks = id && accessToken && (await getAllTasks(id, accessToken));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-base-100">
      <h1 className="text-lg sm:text-xl">
        Welcome, <span className="text-primary font-medium">{username}</span>
      </h1>

      <div className="card w-96 bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title">
            Email address:
            <span className="text-primary font-medium">
              {userInfo?.user.user.email}
            </span>
          </h2>
          <h2 className="card-title">
            Number of tasks:
            <span className="text-primary font-medium">
              {tasks && tasks.quantity} task(s)
            </span>
          </h2>
        </div>
        {/* <Link href="/auth/delete" className="btn btn-primary">
          Delete account
        </Link> */}
        <div className="text-center my-2">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
