"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [err, setErr] = useState(false);

   async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setErr(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //console.log(response)
    if (response.ok) {
      setUserCreated(true);
    } else {
      //console.log(err);
      setErr(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

      {userCreated && (
        <div className="my-4 text-center">
          User created successfully!
          <br /> Now you can{" "}
          <Link href="/login" className="underline">
            Login &raquo;
          </Link>
        </div>
      )}

      {err && (
        <div className="my-4 text-center">
          An error has occured! <br /> Please try again later.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button onClick={()=>signIn("google", {callbackUrl:"/"})} className="flex gap-4 justify-center">
          <Image src="/google.png" alt="" width={24} height={24} />
          Register with google
        </button>

        <div className="text-center  my-4 text-gray-500 border-t pt-4">
          Exist an account?{" "} <Link href="/login" className="underline">Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
