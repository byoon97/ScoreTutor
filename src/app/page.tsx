import React, { FC } from "react";
import AboutUs from "@/components/AboutUs/Index";
import FreePlay from "@/components/FreePlay/Index";
import GameBar from "@/components/NavBar/GameBar";
import Nav from "@/components/NavBar/Nav";
import Content from "@/components/Content/Index";
import Picks from "@/components/Picks/Index";
import Footer from "@/components/Footer/Index";
import HomeCarousel from "@/components/HomeCarousel/Index";

const Home: FC = async () => {
  return (
    <div className="bg-white text-black flex flex-col">
      <Nav />
      <GameBar />

      <div className="md:hidden flex items-center flex-col">
        {" "}
        <div className="px-2 h-full w-full">
          <HomeCarousel />
        </div>
        <Content />
        <div>hello</div>
      </div>

      <div className="hidden lg:hidden md:flex md:flex-col md:w-screen md:justify-between">
        <HomeCarousel />
        <Content />
      </div>

      <div className="hidden md:hidden lg:flex md:flex-row lg:my-8 lg:items-center lg:justify-center lg:h-full md:mb-16 xl:mx-40">
        <HomeCarousel />
        <Content />
      </div>
      <Picks />
      <Footer />
    </div>
  );
};

export default Home;
