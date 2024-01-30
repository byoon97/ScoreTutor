import React from "react";
import Image from "next/image";

const YourComponent: React.FC = () => {
  return (
    <div className="flex flex-row justify-between font-Inter text-sm mt-1">
      <div className="flex flex-col w-1/2 ">
        <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-36 shadow-lg">
          <Image
            src="/freeplay/SB.webp"
            alt={"superbowl"}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
          OUR EXPERTS HAVE DISCOVERED A HIGH VALUE PICK FOR SUPER BOWL LVIII
        </div>
      </div>

      <div className="flex flex-col w-1/2">
        <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-36 shadow-lg">
          <Image
            src="/freeplay/clippers.jpeg"
            alt={"superbowl"}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className=" bg-white text-black text-LEFT p-2 cursor-pointer leading-4">
          CHECK OUR OUR FAVORITE PREMIUM PLAY OF THE DAY
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
