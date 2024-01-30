"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { picks } from "@/data/picks";

const Picks: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Most Recent Picks");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-[#F3F4F6] -mx-2 px-4 pt-4 flex flex-col h-screen">
      <h1 className="text-black text-3xl font-sans font-bold">
        Daily Premium Plays
      </h1>

      <div className="flex flex-row mt-2 h-8">
        <h4 className="text-black text-sm font-sans font-thin flex items-center justify-center pr-1">
          Sort By :
        </h4>
        <div className="relative">
          <div
            className="h-full border-[1px] bg-white w-full flex flex-row items-center justify-between px-2 text-xs font-medium cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="">{selectedOption}</span>
            <IoIosArrowDown size="16px" />
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

      <div className="flex flex-col">
        {picks.map((pick, idx) => (
          <div key={idx}>{pick.homeTeam}</div>
        ))}
      </div>
    </div>
  );
};

export default Picks;
