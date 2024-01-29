import GameBar from "@/components/NavBar/GameBar";
import Nav from "@/components/NavBar/Nav";

export default function Home() {
  return (
    <div className="h-screen bg-white text-black">
      <Nav />
      <GameBar />
    </div>
  );
}
