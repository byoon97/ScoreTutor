import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu size="35px" />
          <Image src="/logo.png" alt="logo" width="90" height="90" />
        </div>
        <div className="flex flex-row items-center">
          <CgProfile size="35px" />
        </div>
      </div>
    </div>
  );
}
