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
            FIND OUT WHO WE&apos;RE TAKING FOR SUPER BOWL LVIII HERE{" "}
          </div>
        </div>
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
            FIND OUT WHO WE&apos;RE TAKING FOR SUPER BOWL LVIII HERE{" "}
          </div>
        </div>
      </div>

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
            FIND OUT WHO WE&apos;RE TAKING FOR SUPER BOWL LVIII HERE{" "}
          </div>
        </div>
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
            FIND OUT WHO WE&apos;RE TAKING FOR SUPER BOWL LVIII HERE{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
