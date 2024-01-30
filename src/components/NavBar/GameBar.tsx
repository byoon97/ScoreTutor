import React from "react";
import Dropdown from "./GameBarComps/DropDown";

const dropdownOptions = [
  { label: "NBA", imageSrc: "/sportsLogos/NBA.png" },
  { label: "NFL", imageSrc: "/sportsLogos/NFL.png" },
  { label: "MLB", imageSrc: "/sportsLogos/MLB.png" },
  { label: "NHL", imageSrc: "/sportsLogos/NHL.png" },
  { label: "NCAA", imageSrc: "/sportsLogos/NCAA.png" },
];

const YourComponent: React.FC = () => {
  return (
    <div className="w-full flex flex-row items-center mt-2 h-22">
      <Dropdown DropdownOptions={dropdownOptions} />
    </div>
  );
};

export default YourComponent;
