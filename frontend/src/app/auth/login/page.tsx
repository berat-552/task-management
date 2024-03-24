"use client";

import { AuthPayload } from "@/app/types/interfaces/AuthPayload";
import { UserLoginPayload } from "@/app/types/interfaces/UserLoginPayload";
import loginUser from "@/app/util/loginUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [formData, setFormData] = useState<UserLoginPayload>({
    email: "",
    password: "",
  });

  const [loginResult, setLoginResult] = useState<AuthPayload>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();

    setLoginResult(await loginUser(formData.email, formData.password));

    router.push("/");

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const { status, accessToken, refreshToken } = loginResult || {};

    if (status == 200 && accessToken && refreshToken) {
      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    }

    loginResult && router.refresh();
  }, [loginResult, router]);

  return (
    <form
      className="flex min-h-screen flex-col items-center p-24 bg-base-100"
      onSubmit={async (e: React.FormEvent) => {
        await handleLogin(e);
      }}
    >
      <div className="text-xl min-w-52 w-full">
        <div className="mb-4 flex flex-col items-center">
          <h1 className="text-center my-2 text-2xl">Login user</h1>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered input-primary max-w-md w-full my-2 sm:text-lg"
          />
        </div>

        <div className="mb-4 flex flex-col items-center">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="input input-bordered input-primary max-w-md w-full my-2 sm:text-lg"
          />
        </div>
      </div>
      <div className="mb-4 max-w-52 w-full">
        {isLoading ? (
          <button
            type="submit"
            className="btn btn-primary w-full text-xl flex"
            disabled={isLoading}
          >
            Logging in
            <span className="loading loading-spinner loading-sm"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-full text-xl">
            Login
          </button>
        )}
      </div>
      {loginResult !== undefined && (
        <div className="text-center font-medium sm:text-lg">
          {loginResult.status == 200 ? (
            <p className="text-green-500">Login successful!</p>
          ) : (
            <p className="text-red-500">Login failed, Invalid email/password</p>
          )}
        </div>
      )}
    </form>
  );
}
