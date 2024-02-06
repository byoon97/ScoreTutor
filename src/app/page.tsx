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
    <div className="bg-white text-black px-2">
      <Nav />
      <GameBar />

      <div className="md:hidden">
        <AboutUs />
        <FreePlay />
      </div>

      <div className="hidden lg:mb-2 lg:flex lg:mx-32 lg:flex-row lg:items-center lg:justify-center lg:h-full lg:my-4">
        <HomeCarousel />
        <Content />
      </div>
      <Picks />
      <Footer />
    </div>
  );
};

export default Home;
