"use client";
import React, { useState, FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SinglePicks from "./SinglePicks";

const LeftColumn: FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Most Recent Picks");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  return (
    <div className="md:w-2/3">
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
    </div>
  );
};

export default LeftColumn;
