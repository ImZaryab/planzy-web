"use client";

import { useState } from "react";
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "@/hooks/useLogout";
import useLogin from "@/hooks/useLogin";

export default function Auth() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { mutate: login, isLoading, isError } = useLogin(setLoggedIn);

  async function onSubmit(data: any) {
    login({ email: data.email, password: data.password });
    reset();
  }

  return (
    <div className="flex items-center justify-center gap-20">
      <div>
        <img src="/planzy_logo.png" alt="planzy Logo" className="max-h-40" />
      </div>
      <div>
        <h1 className="text-white text-4xl text-center">planzy</h1>
        {isError && <p className="text-red-500 text-center">Invalid Request</p>}
        <p className="mt-2 opacity-50">Test Username: testuser1</p>
        <p className="opacity-50">Test Password: test12345</p>
        <section className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <input
                className="p-1 text-custom_bg rounded-md"
                type="text"
                placeholder="username/email"
                {...register("email")}
              />
              <input
                className="p-1 text-custom_bg rounded-md"
                type="password"
                placeholder="password"
                {...register("password")}
              />
            </div>
            <div className="flex items-center justify-center w-full mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-8 rounded-md bg-[#d07583] text-white disabled:bg-slate-700"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
