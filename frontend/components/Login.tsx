"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin} from "@/utils/auth";
import { setAuthentication } from "@/utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const Loggedin = await isLogin();
      if (Loggedin.auth) {
        router.push("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        setAuthentication(res.data.token)
        toast.success("LOGIN SUCCESSFULLY");    
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <>
      <div
        className={`flex h-screen max-md:flex-col flex-row `}
      >
        <div className="h-screen flex justify-center items-center flex-1 p-16">
          <div className="text-center">
            <h1 className="text-accent font-bold text-4xl">Login Account</h1>
            <div className="flex items-center gap-4 pt-8 w-fit mx-auto">
              <div className="icon__wrapper">
                <FaFacebookF />
              </div>
              <div className="icon__wrapper">
                <FaGoogle />
              </div>
              <div className="icon__wrapper">
                <FaInstagram />
              </div>
            </div>

            <p className="pt-8 text-[13px] text-gray-400">
              Or use your registered email account 
            </p>

            <form
              className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
              onSubmit={handleSubmit}
            >
            
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input__style"
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input__style"
                type="password"
                placeholder="Password"
                required
              />

              <button className="uppercase bg-accent hover:bg-accentDark px-4 py-2 text-white mt-4">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="bg-accent h-screen flex justify-center p-16 items-center ">
          <div className="text-center w-full text-white space-y-8">
            <h2 className="font-bold text-4xl">welcome</h2>
            <div className="text-[#eeeeee] w-fit mx-auto">
              <p>To keep connected with us please</p>
              <p>please signup with your personal info</p>

              <Link href="/signup">
                <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;