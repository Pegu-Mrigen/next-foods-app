import Image from "next/image";
import React from "react";
import RightSide from "../icons/RightSide";

const Hero = () => {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Make every party<br /> better with a&nbsp;<span className="text-primary">Pizza!</span>
        </h1>

        <p className="my-6 text-gray-500 text-sm">
          Its versatility allows for endless customization, making it a favorite
          among food lovers worldwide.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary uppercase  flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full ">Order now
          
          <RightSide />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600  font-semibold">Learn more
          
          <RightSide />
          </button>
        </div>
      </div>

      <div className=" relative hidden md:block">
        <Image src={"/p1.png"} layout="fill" objectFit="contain" alt="pizza" />
      </div>
    </section>
  );
};

export default Hero;
