import React, { FC } from "react";
import { GetServerSideProps } from "next";
import AboutUs from "@/components/AboutUs/Index";
import FreePlay from "@/components/FreePlay/Index";
import GameBar from "@/components/NavBar/GameBar";
import Nav from "@/components/NavBar/Nav";
import Content from "@/components/Content/Index";
import Picks from "@/components/Picks/Index";
import Footer from "@/components/Footer/Index";
import axios from "axios";

const Home: FC = async () => {
  return (
    <div className="bg-white text-black px-2">
      <Nav />
      <GameBar />
      <AboutUs />
      <FreePlay />
      <Content />
      <Picks />
      <Footer />
    </div>
  );
};

export default Home;
