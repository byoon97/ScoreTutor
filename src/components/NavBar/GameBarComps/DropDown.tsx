/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import React, { FC, useState, useRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: { label: string; imageSrc: string };
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ label: string; imageSrc: string }>
  >;
  DropdownOptions: { label: string; imageSrc: string }[];
}

interface Option {
  label: string;
  imageSrc: string;
}

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  DropdownOptions,
}) => {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    console.log(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative border-[1px] rounded-md h-full font-sans flex flex-row mr-4">
      <div className="flex flex-col items-center relative">
        <div className="flex flex-row items-center justify-center h-14 mr-2">
          <Image
            src={selectedOption.imageSrc}
            alt={selectedOption.label}
            width={50}
            height={50}
          />
          <div className="flex flex-row items-center font-bold">
            {selectedOption.label}
          </div>
        </div>
        <div
          onClick={handleToggle}
          className="flex items-center justify-center border-t w-full cursor-pointer h-8"
        >
          <IoIosArrowDown />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {DropdownOptions.map((option) => (
                <div
                  key={option.label}
                  onClick={() => handleOptionClick(option as Option)}
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {/* Display each option with image */}
                  <div className="flex items-center space-x-2">
                    <Image
                      src={option.imageSrc}
                      alt={option.label}
                      width={50}
                      height={50}
                    />
                    <div>{option.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
