import Image from "next/image";
import React from "react";
import { PiTelegramLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoReddit } from "react-icons/io";

const Footer: React.FC = () => {
  return (
    <div className="bg-black px-4 pt-2">
      <div className="flex flex-col h-52 px-2 py-6 lg:mx-64">
        <Image src={"/image.png"} alt="logo" width={150} height={150} />
        <div className="text-xs text-[#595959] text-left flex flex-col mt-4 px-2">
          @ 2024 MKA INC. ALL RIGHTS RESERVED.
          <div>
            {" "}
            Score Tutor and MKA PICKS are registered trademarks of Score
            Tutor.com, Inc.
          </div>
        </div>
        <div className="text-[#595959] font-sans mt-4 px-2 flex flex-row justify-center items-center w-full">
          FOLLOW US :
          <PiTelegramLogo color={"#595959"} className="pl-2" size={30} />
          <FaXTwitter color={"#595959"} className="pl-2" size={30} />
          <FaInstagram color={"#595959"} className="pl-2" size={30} />
          <IoLogoReddit color={"#595959"} className="pl-2" size={40} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
