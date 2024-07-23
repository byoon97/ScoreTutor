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
      <div className="bg-white text-black flex flex-col font-sans">
        <div className="pt-1">
          <HomeCarousel />
        </div>
        <Picks />
      </div>
    </>
  );
};

export default Home;
