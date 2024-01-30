import React from "react";
import Image from "next/image";

const YourComponent: React.FC = () => {
  return (
    <div className="flex flex-row justify-between font-Inter text-sm">
      <div className="flex flex-col w-1/2">
        <div className="rounded-lg border-[1px] mt-2 mx-2 relative overflow-hidden h-36">
          <Image
            src="/freeplay/SB.webp"
            alt={"superbowl"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
          OUR EXPERTS HAVE DISCOVERED A HIGH VALUE PICK FOR SUPER BOWL LVIII
        </div>
      </div>

      <div className="flex flex-col w-1/2">
        <div className="rounded-lg border-[1px] mt-2 mx-2 relative overflow-hidden h-36">
          <Image
            src="/freeplay/clippers.jpeg"
            alt={"superbowl"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
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
