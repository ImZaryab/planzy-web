import React from "react";
import CreatePlanForm from "@/components/CreatePlanForm";

export default function page() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <a href="/menu" className="absolute text-white top-2 left-4">go back</a>
      <section className="bg-yellow-500 h-[40rem] w-4/5 flex justify-center items-center rounded-xl relative">
        <h1 className="absolute top-2 left-4 text-xl font-semibold">create</h1>
        <CreatePlanForm />
      </section>
    </main>
  );
}
