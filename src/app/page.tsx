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
        <div className="py-2">
          <HomeCarousel />
        </div>
        <Picks />
      </div>
    </>
  );
};

export default Home;
