"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import MenuPage from "@/app/menu/page";

const HomeMenu = () => {

  const [bestSellers, setBestSellers]=useState([])

  useEffect(()=>{
    fetch("/api/menu-items").then(res=>{
      res.json().then(menuItems=>{
        //const bestSellers=menuItems.slice(-3)
       // console.log(bestSellers)
       setBestSellers(menuItems.slice(-3))
      })
    })

  }, [])
  return (
    <section>
      <div className="relative left-0 right-0   ">
        <div className=" hidden xl:inline-block h-48 w-48 absolute -left-64 rotate-180  -z-10 overflow-x-hidden  ">
          <Image src={"/leafs.png"} alt="" layout="fill" objectFit="contain " />
        </div>
        <div className="hidden 2xl:inline-block ">
        <div className="h-1 -z-10 overflow-x-hidden ">
          <Image
            src={"/leafs.png"}
            alt=""
            width={200}
            height={200}
            objectFit="contain"
            className="absolute -right-48     "
          />
        </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders subHeader="Checkout" mainHeader="Our Best Sellers" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length>0 &&
      bestSellers.map(item=>(
        <MenuItem key={item._id} {...item}  />
      ))  
      }
        
      </div>
    </section>
  );
};

export default HomeMenu;
