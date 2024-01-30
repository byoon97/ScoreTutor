import React from "react";
import Image from "next/image";

const FreePlay: React.FC = () => {
  return (
    <div>
      {" "}
      <div className="cursor-pointer font-bold rounded-lg border-[1px] mt-4 mx-2 h-52 relative overflow-hidden">
        {/* The next/image component */}
        <div className="relative h-full">
          <Image
            src="/freeplay/mavsmagic.jpeg"
            alt="Free Play Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
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
