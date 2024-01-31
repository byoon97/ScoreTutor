import AboutUs from "@/components/AboutUs/Index";
import FreePlay from "@/components/FreePlay/Index";
import GameBar from "@/components/NavBar/GameBar";
import Nav from "@/components/NavBar/Nav";
import Content from "@/components/Content/Index";
import Picks from "@/components/Picks/Index";
import Footer from "@/components/Footer/Index";

export default function Home() {
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
}
