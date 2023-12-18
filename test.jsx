import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../public/assets/logo.png";
import {
  FaBars,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

const Navbar = () => {
  const [navigation, setNavigation] = useState(false);
  const [pageScroll, setPageScroll] = useState(false);
  useEffect(() => {
    const sub = window.addEventListener("scroll", () =>
      setPageScroll(window.scrollY >= 90)
    );
    return sub;
  }, []);
  const links = [
    { id: 1, link: "portfolio" },
    { id: 2, link: "experience" },
    { id: 3, link: "me" },
    { id: 4, link: "contact" },
  ];
  return (
    <div
      className={`${
        pageScroll
          ? "w-full  h-12 z-10 fixed duration-300 ease-in  bg-black text-[#fff]"
          : "w-full h-12 z-10 fixed duration-300 ease-in  bg-blue-500 text-[#fff]"
      }`}
    >
      <div className="flex justify-between items-center w-full h-full max-w-screen-xl mx-auto p-4">
        <Link href="/">
          <Image className="w-[60px] h-[60px]" src={logo} alt="img" />
        </Link>
        <div>
          <ul className="hidden md:flex">
            {links.map(({ id, link }) => (
              <Link href={`/${link}`} key={id}>
                <li className="ml-10 text-sm uppercase duration-200 ease-out hover:scale-105 tracking-wider">
                  {link}
                </li>
              </Link>
            ))}
          </ul>
          {!navigation && (
            <div
              className="md:hidden cursor-pointer"
              onClick={() => {
                setNavigation(true);
              }}
            >
              <FaBars size={30} />
            </div>
          )}
        </div>
      </div>
      <div
        className={
          navigation
            ? "md:hidden fixed left-0 top-0 w-full h-full bg-black/70 backdrop-blur"
            : ""
        }
      >
        <div
          className={
            navigation
              ? "fixed left-0 top-0  h-full w-screen bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-10 ease in duration-500  overflow-scroll"
              : "fixed top-0 left-[-100%] p-10 h-full duration-500 "
          }
        >
          <div>
            <div className="flex w-full  items-center justify-between">
              <div className=" p-2 cursor-pointer ">
                <FaTimes
                  className=" absolute top-10 right-10"
                  onClick={() => {
                    setNavigation(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-18 flex flex-col h-fit text-center  gap-12">
            <ul className="uppercase">
              {links.map(({ id, link }) => (
                <Link key={id} href={`/${link}`}>
                  <li
                    onClick={() => setNavigation(false)}
                    className="py-4 text-2xl tracking-wider cursor-pointer"
                  >
                    {link}
                  </li>
                </Link>
              ))}
            </ul>
            <div>
              <div
                className="grid grid-cols-2 mx-auto w-4/5
                gap-8 "
              >
                <div className="flex items-center justify-center rounded-full shadow-md shadow-white p-3 cursor-pointer ">
                  <Link href="https://web.whatsapp.com">
                    <FaWhatsapp size={25} />
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-full shadow-md shadow-white p-3 cursor-pointer ">
                  <Link href="https://www.linkedin.com/in/mrigen-pegu-883864a4">
                    <FaLinkedin size={25} />
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-full shadow-md shadow-white p-3 cursor-pointer ">
                  <Link href="https://github.com/Pegu-Mrigen">
                    <FaGithub size={25} />
                  </Link>
                </div>
                <div className=" flex items-center justify-center rounded-full shadow-md shadow-white p-3 cursor-pointer ">
                  <Link href="https://www.facebook.com/mrigenp">
                    <FaFacebook size={25} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
