"use client";
import {signIn, useSession} from "next-auth/react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false)


  const router= useRouter()


  const session = useSession();


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

    //  await signIn("credentials", {email, password, callbackUrl:"/"})
//     const { error }  = await signIn("credentials", {email, password, callbackUrl:"/"})
//     if (error) {
//       router.push("/");
// } else {
//       router.push("/");
// }


await signIn("credentials", { email, password, redirect: false })
    .then(({ ok, error }) => {
        if (ok) {
            router.push("/");
        } else {
            console.log(error)
            toast("Credentials do not match!", { type: "error" });
        }
        setLoginInProgress(false)
    })

} 
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          type="password"
          name="password"
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
