"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ShoppingCart from "../icons/ShoppingCart";
import BarsThree from "../icons/BarsThree";
import { CartContext } from "@/components/AppContext";

function AuthLinks({ status, userName }) {
  if (status === "authenticated")
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  if (status === "unauthenticated")
    return (
      <>
        <Link href="/login">Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
}

export default function Header() {
  const session = useSession();
  const { clearCart } = useContext(CartContext);

  console.log(session);
  const status = session.status;
  console.log(status);

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      clearCart();
    }

    // clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link
          className="text-primary font-semibold text-2xl flex flex-col items-center justify-center  leading-6"
          href="/"
          onClick={() => setMobileNavOpen(false)}
        >
          <span className="text-sm">AC👨‍🍳</span>
          <span className="text-yellow-600 font-normal text-sm">FOODS</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-1.5 p-1 rounded-full leading-3">
                {" "}
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border-0"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <BarsThree />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-10 text-center min-h-[60vh] text-xl font-bold text-primary"
          onClick={() => setMobileNavOpen(false)}
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        <nav className=" flex items-center gap-8 text-gray-500 font-semibold ">
          <Link className="text-primary font-semibold text-2xl z-50 flex items-center justify-center leading-5 flex-col" href="/">
          <span className="text-normal">AC👨‍🍳</span>
          <span className="text-yellow-600 font-normal text-normal">FOODS</span>
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {/* {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Hello, {userName}
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login">Login</Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Register
              </Link>
            </>
          )} */}
          <AuthLinks status={status} userName={userName} />

          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-1.5 p-1 rounded-full leading-3">
                {" "}
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
