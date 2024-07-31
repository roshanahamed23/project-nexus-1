"use client";

import { isLogin, logOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.data) {
        setUser(loggedIn.data);
      } else {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main
      className={` bg-accentDark w-full h-screen flex justify-center items-center `}
    >
      <div className="p-4 text-white flex justify-center items-center flex-col text-center space-y-4">
        <p className="text-4xl font-semibold">Hi {user?.name}, Welcome!</p>
        <p className="text-xl">{user?.email}</p>
        <button
          className="bg-white px-4 py-2 text-accent font-semibold text-lg"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </main>
  );
}