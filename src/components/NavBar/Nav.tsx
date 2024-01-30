import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="sticky top-0 bg-black z-10 text-white -mx-2 px-4 shadow-xl py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu size={25} fontSize={"1.5em"} />
          <Image src="/image.png" alt="logo" width="100" height="100" />
        </div>
        <div className="flex flex-row items-center">
          <CgProfile size={"1em"} fontSize={"1.5em"} />
        </div>
      </div>
    </div>
  );
}
