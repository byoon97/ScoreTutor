import React from "react";
import Image from "next/image";

const FreePlay: React.FC = () => {
  return (
    <div className="mt-4">
      {" "}
      <div className="cursor-pointer w-screen font-bold rounded-lg border-[1px] h-52 relative overflow-hidden shadow-lg">
        {/* The next/image component */}
        <div className="h-full">
          <Image
            src="/freeplay/knicksgrizz.jpeg"
            alt="Free Play Image"
            style={{ objectFit: "cover", objectPosition: "center" }}
            fill
          />
        </div>

        {/* The caption text */}
      </div>
      <div className="font-Inter bg-white text-black text-center p-2 cursor-pointer text-sm">
        CHECK OUT OUR DAILY FREE PLAY HERE
      </div>
    </div>
  );
};

export default FreePlay;
