import { cookies } from "next/headers";
import TaskCard from "./components/TaskCard";
import isTokenExpired from "./util/isTokenExpires";
import getAllTasks from "./util/getAllTasks";
import getUserInfo from "./util/getUserInfo";
import Link from "next/link";

export default async function Home() {
  const accessToken = cookies().get("accessToken")?.value;

  const userInfo = accessToken ? await getUserInfo(accessToken) : null;

  const id = userInfo?.user.user.userId;

  const tasks = id && accessToken && (await getAllTasks(id, accessToken));

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-base-100 text-center">
        {userInfo && (
          <Link
            href={`/create-task/${id}`}
            className="btn btn-primary text-white text-xl my-5"
          >
            Create new Task
          </Link>
        )}
        <div className="flex flex-wrap justify-start gap-6">
          {tasks ? (
            accessToken &&
            !isTokenExpired(accessToken) &&
            tasks.tasks.map((task, idx) => <TaskCard task={task} key={idx} />)
          ) : (
            <h1 className="font-medium text-xl">
              Register or login to start managing your tasks
            </h1>
          )}
        </div>
      </main>
    </>
  );
}
