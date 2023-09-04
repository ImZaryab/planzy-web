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
    <>
      <h1 className="text-white text-4xl">planzy</h1>
      {isLoading && (
        <section className="bg-slate-400 mx-4 p-2">
          <h1>Loading.....</h1>
        </section>
      )}

      {isError && <p className="text-red-500">Invalid Request</p>}

      <section className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="email" {...register("email")} />
            <input
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-slate-500 text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
