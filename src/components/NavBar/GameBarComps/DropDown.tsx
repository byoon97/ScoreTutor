/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import React, { FC, useState } from "react";

interface Option {
  label: string;
  imageSrc: string;
}

interface DropdownProps {
  DropdownOptions: Option[];
}

const Dropdown: FC<DropdownProps> = ({ DropdownOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(DropdownOptions[0]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative border-[1px] rounded-md w-24 h-full font-sans">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center h-14">
          <Image
            src={selectedOption.imageSrc}
            alt={selectedOption.label}
            width={50}
            height={50}
          />
          <div className="flex flex-row items-center pr-1 font-bold">
            {selectedOption.label}
          </div>
        </div>
        <div className="flex items-center justify-center border-t w-full cursor-pointer h-8">
          <IoIosArrowDown onClick={handleToggle} />
        </div>
      </div>

      {isOpen && (
        <div className="origin-top-right right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {DropdownOptions.map((option) => (
              <div
                key={option.label}
                onClick={() => handleOptionClick(option)}
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
  );
};

export default Dropdown;
