/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { picks } from "@/data/picks";
import Image from "next/image";

const Picks: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Most Recent Picks");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-[#F3F4F6] -mx-2 px-4 pt-4 flex flex-col mt-4 pb-6">
      <h1 className="text-black text-3xl font-sans font-bold">
        Daily Premium Plays
      </h1>

      <div className="flex flex-row mt-4 h-8">
        <h4 className="text-black text-sm font-sans font-thin flex items-center justify-center pr-1">
          Sort By :
        </h4>
        <div className="relative flex flex-row space-between w-3/4">
          <div
            className="h-full border-[1px] bg-white w-full flex flex-row items-center justify-between px-2 text-xs font-medium cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="">{selectedOption}</span>
            <div className="border-l-[1px] pl-2 ">
              <IoIosArrowDown size="16px" />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border-[1px] border-gray-300 font-sans text-sm">
              {/* Dropdown options */}
              <div
                className="p-2 cursor-pointer"
                onClick={() => handleOptionClick("Most Recent Picks")}
              >
                Most Recent Picks
              </div>
              <div
                className="p-2 cursor-pointer"
                onClick={() => handleOptionClick("Upcoming Games")}
              >
                Upcoming Games
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-2">
        {picks.map((pick, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col border-[1px] rounded-lg shadow-lg my-2 bg-white p-4"
          >
            <div className="flex flex-row justify-between">
              <div className="font-sans text-sm text-[#656667]">
                {pick.when}
              </div>
              <div>
                <Image src={pick.logo} alt="logo" width={35} height={35} />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row justify-start items-center">
                {" "}
                <img
                  src={pick.awayTeamLogo}
                  alt="team logo"
                  width={30}
                  height={30}
                />
                <div className="font-inter text-[12px] pl-2">
                  {pick.awayTeam}
                </div>
              </div>
              <div className="flex flex-row justify-start items-center mt-2 ">
                {" "}
                <img
                  src={pick.homeTeamLogo}
                  alt="team logo"
                  width={30}
                  height={30}
                />
                <div className="font-inter text-[12px] pl-2">
                  {pick.homeTeam}
                </div>
              </div>
            </div>

            <button className="text-center rounded-lg bg-[#77D2EF] mt-3 h-10 shadow-lg text-black font-inter">
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picks;
