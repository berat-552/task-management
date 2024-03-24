import Link from "next/link";
import getUserInfo from "../util/getUserInfo";
import { cookies } from "next/headers";
import isTokenExpired from "../util/isTokenExpires";
import React from "react";

export default async function Navbar() {
  const accessToken = cookies().get("accessToken")?.value;

  const userInfo = accessToken ? await getUserInfo(accessToken) : null;


  const username = userInfo?.user?.user.username;

  return (
    <div className="navbar text-primary px-4 bg-base-100">
      <div className="navbar-start">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <span className="text-white">Task</span>
          Management
        </Link>
      </div>

      <div className="navbar-end">
        {accessToken && userInfo !== null && !isTokenExpired(accessToken) ? (
          <>
            <Link
              href={`/profile/${userInfo.user.user.userId}`}
              className="avatar placeholder"
            >
              <div className="bg-neutral text-neutral-content rounded-full w-16">
                <span className="text-3xl">{username?.charAt(0)}</span>
              </div>
            </Link>
            <Link
              href={"/auth/logout"}
              className="btn btn-primary text-white mx-2"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="btn btn-primary text-white mx-2"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="btn btn-primary text-white mx-2"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
