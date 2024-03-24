"use client";

import { UserRegistrationPayload } from "@/app/types/interfaces/UserRegistrationPayload";
import React, { useState } from "react";
import registerUser from "../../util/registerUser";
import validateData from "../../util/validateData";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState<UserRegistrationPayload>({
    username: "",
    email: "",
    password: "",
  });

  const [registrationResult, setRegistrationResult] = useState<boolean>();
  const [messages, setMessages] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setMessages("");
    const validationResult = validateData(formData);

    if (!validationResult.isValid) {
      const errorMessages = Object.values(validationResult.errors).join(",");
      setMessages(errorMessages);
      return;
    }

    setIsLoading(true);

    const result = await registerUser(
      formData.username,
      formData.email,
      formData.password
    );

    setRegistrationResult(result);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    setTimeout(() => {
      result && router.push("/auth/login");
    }, 1000);
  };

  return (
    <form
      className="flex min-h-screen flex-col items-center p-24 bg-base-100"
      onSubmit={async (e: React.FormEvent) => {
        await handleRegistration(e);
      }}
    >
      <div className="text-xl min-w-52 w-full">
        <div className="mb-4 flex flex-col items-center">
          <h1 className="text-center my-2 text-2xl">Register user</h1>

          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={formData.username}
            onChange={handleInputChange}
            className="input input-bordered input-primary max-w-md w-full my-2 sm:text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col items-center">
          <input
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
      <div className="mb-4">
        {isLoading ? (
          <button
            type="submit"
            className="btn btn-primary w-full text-xl"
            disabled={isLoading}
          >
            Registering
            <span className="loading loading-spinner loading-sm"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-full text-xl">
            Register
          </button>
        )}
      </div>
      {registrationResult !== undefined && (
        <div className="text-center font-medium sm:text-lg">
          {registrationResult ? (
            <p className="text-green-500">Registration successful!</p>
          ) : (
            <p className="text-red-500">
              Registration failed. User with that email address already exists.
            </p>
          )}
        </div>
      )}

      {messages && (
        <span className="text-red-500 font-medium text-md flex flex-col gap-2">
          {messages
            .split(",")
            .map(
              (msg: string, index: number) => msg && <li key={index}>{msg}</li>
            )}
        </span>
      )}
    </form>
  );
}
