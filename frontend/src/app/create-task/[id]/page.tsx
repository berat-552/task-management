import { cookies } from "next/headers";
import CreateTaskForm from "../../components/CreateTaskForm";
import getUserInfo from "@/app/util/getUserInfo";

export default async function CreateTaskPage() {
  const accessToken = cookies().get("accessToken")?.value;

  const userInfo = accessToken ? await getUserInfo(accessToken) : null;

  const id = userInfo?.user.user.userId;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-100">
      {id && <CreateTaskForm params={{ id }} />}
    </main>
  );
}
