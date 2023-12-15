"use client";
import {signIn} from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const [loginInProgress, setLoginInProgress] = useState(false)


  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true)
    // const {ok} =  await fetch("/api/login", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (ok) {
    //     setUserCreated(true);
    //   }else{

    //   }

    await signIn("credentials", {email, password, callbackUrl:"/"})

      setLoginInProgress(false)
} 
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={()=>signIn("google", {callbackUrl:"/"})} className="flex gap-4 justify-center" disabled={false}>
          <Image src="/google.png" alt="" width={24} height={24} />
          Login with google
        </button>

        <div className="text-center  my-4 text-gray-500 border-t pt-4">
          Do not have an account?{" "}
          <Link href="/register" className="underline">
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
