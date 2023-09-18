"use client";
import { useRouter } from "next/navigation";

import React from "react";

export default function page() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-white">
      <span>This feature is currently under development</span>
      <button
        onClick={() => router.push("/menu")}
        className="underline text-blue-400"
      >
        Go back
      </button>
    </div>
  );
}
