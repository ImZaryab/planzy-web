"use client";

import pb from "@/lib/pocketbase";
import useLogout from "@/hooks/useLogout";
import { useState, useEffect } from "react";

export default function UserInfo() {
  //   const userID = pb.authStore.model?.id;
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true)

  function getLoggedInUserEmail() {
    if(loggedIn){
      return pb.authStore.model?.email;
    }
  }

  useEffect(()=>{
    setUser(getLoggedInUserEmail())
  }, [loggedIn])

  

  const logout = useLogout(setLoggedIn);

  return (
    <div className="absolute top-2 right-4 text-white">
      {user && (
        <>
          <span>Logged-in as: {user}</span>
          <button onClick={logout} className="pl-4 underline text-blue-500">
            Logout
          </button>
        </>
      )}
    </div>
  );
}
