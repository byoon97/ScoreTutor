"use client";
import React, { FC } from "react";
import GameBar from "@/components/Global/NavBar/GameBar";
import Content from "@/components/HomeComps/Content/Index";
import Picks from "@/components/HomeComps/Picks/Index";
import HomeCarousel from "@/components/HomeComps/HomeCarousel/Index";
import SpinningBar from "@/components/Global/NavBar/SpinningBar";

const Home: FC = () => {
  return (
    <>
      <SpinningBar />
      <div className="bg-white text-black flex flex-col px-2 font-mono">
        {/* <GameBar /> */}
        <div className="md:hidden flex items-center flex-col">
          {" "}
          <div className="px-2 h-full w-full">
            <HomeCarousel />
          </div>
        </div>

        <div className="hidden lg:hidden md:flex md:flex-col md:justify-between">
          <HomeCarousel />
        </div>

        <div className="hidden md:hidden lg:flex md:flex-row lg:my-8 lg:items-center lg:justify-center md:mb-16 lg:mx-4 xl:mx-48">
          <HomeCarousel />
        </div>
        <Picks />
      </div>
    </>
  );
};

export default Home;
