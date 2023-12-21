import Header from "@/components/layout/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Foods Online, Gohpur",
  description: "Build by Appun Computers",
  icons: {
    icon: [
      {
        //media: '(prefers-color-scheme: dark)',
        url: "/images/favicon.ico",
        href: "/images/favicon.ico",
      },
      {
        //media: '(prefers-color-scheme: light)',
        url: "/images/icon.png",
        href: "/images/icon.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        {" "}
        <link rel="icon" type="image/svg" href="/icons/icon.svg" />
      </Head>
      {/* <Head>  <link rel="icon" type="image/svg" href="icon.png" /></Head> */}
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto  p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}

            {/* <footer  className="bg-[url('/appun.jpg')] text-center h-full m-10 p-20    "> */}
            <footer className=" m-10 ">
              <div className="flex flex-col justify-center items-center">
                {/* <Link
                  href={"/"}
                  className="bg-primary  my-2 p-1 w-fit rounded-md text-white"
                >
                  Top 👆{" "}
                </Link> */}
                <div className="flex items-center justify-center flex-col ">
                  <Image
                    width={40}
                    height={40}
                    src="/Icon.png"
                    alt="logo"
                  ></Image>
                  <p className="font-bold text-primary">
                    &copy; 2023 All rights reserved{" "}
                  </p>
                </div>
              </div>
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
