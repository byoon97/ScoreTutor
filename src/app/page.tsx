"use client";
import React, { FC } from "react";
import GameBar from "@/components/Global/NavBar/GameBar";
import Content from "@/components/HomeComps/Content/Index";
import Picks from "@/components/HomeComps/Picks/Index";
import HomeCarousel from "@/components/HomeComps/HomeCarousel/Index";

const Home: FC = () => {
  return (
    <div className="bg-white text-black flex flex-col px-2">
      {/* <GameBar /> */}
      <div className="md:hidden flex items-center flex-col">
        {" "}
        <div className="px-2 h-full w-full">
          <HomeCarousel />
        </div>
        <Content />
      </div>

      <div className="hidden lg:hidden md:flex md:flex-col md:justify-between">
        <HomeCarousel />
        <Content />
      </div>

      <div className="hidden md:hidden lg:flex md:flex-row lg:my-8 lg:items-center lg:justify-center md:mb-16 lg:mx-4 2xl:mx-40">
        <HomeCarousel />
        <Content />
      </div>
      <Picks />
    </div>
  );
};

export default Home;
