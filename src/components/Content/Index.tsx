import React from "react";
import Image from "next/image";

const Content: React.FC = () => {
  return (
    <div className="flex flex-row justify-between font-Inter text-sm mt-2 lg:flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 ">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
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
        <div className="flex flex-col w-1/2 ">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
            <Image
              src="/freeplay/TK.webp"
              alt={"superbowl"}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            CHECK OUT OUR FAVORITE SUPERBOWL PLAYER PROPS{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg">
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
        <div className="flex flex-col w-1/2 ">
          <div className="rounded-lg border-[1px] mx-2 relative overflow-hidden h-44 shadow-lg bg-black flex justify-center items-center">
            <Image
              src="/Image.png"
              alt={"superbowl"}
              width={200}
              height={200}
            />
          </div>
          <div className=" bg-white text-black text-left p-2 cursor-pointer leading-4">
            CLICK HERE TO READ OUR MISSION IN HELPING OTHERS SUCCEED
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
