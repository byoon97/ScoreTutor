import React from "react";
import Image from "next/image";

const Content: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center font-Inter text-sm mt-2 lg:flex-col lg:mt-6">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
            <Image
              src="/freeplay/SB.webp"
              alt={"superbowl"}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            FIND OUT WHO WE&apos;RE TAKING FOR SUPER BOWL LVIII BY CLICKING HERE{" "}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
            <Image
              src="/freeplay/TK.webp"
              alt={"superbowl"}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            CHECK OUT OUR PLAYER PROPS FOR SUPER BOWL LVIII
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
            <Image
              src="/freeplay/clippers.jpeg"
              alt={"superbowl"}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            CHECK OUT OUR FAVORITE PREIUM PLAY BY CLICKING HERE
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg bg-black flex justify-center items-center">
            <Image
              src="/Image.png"
              alt={"superbowl"}
              width={200}
              height={200}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            CLICK HERE TO FIND OUT HOW TO BEAT THE BOOKS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
