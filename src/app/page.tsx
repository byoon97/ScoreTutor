"use client";
import React, { FC } from "react";
import GameBar from "@/components/Global/NavBar/GameBar";
import Picks from "@/components/HomeComps/Picks/Index";
import HomeCarousel from "@/components/HomeComps/HomeCarousel/Index";
import SpinningBar from "@/components/Global/NavBar/SpinningBar";
import HowToBet from "@/components/HomeComps/HowToBet";
import NewsLetter from "@/components/HomeComps/NewsLetter";
import SportsbookCarousel from "@/components/HomeComps/Sportsbook";

const container = "xl:px-28";

const Home: FC = () => {
  return (
    <div className="bg-[#EBECF5]">
      <SpinningBar />
      <div className=" text-black flex flex-col font-sans">
        <HomeCarousel />

        <div className={container}>
          {" "}
          <Picks />
          <div className="flex flex-col lg:flex-row">
            {" "}
            <SportsbookCarousel />
            <HowToBet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
