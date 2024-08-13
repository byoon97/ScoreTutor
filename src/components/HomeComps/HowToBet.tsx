import React, { useState } from "react";
import { RiBookReadLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import UnitsAndBankroll from "./HowToBetComps/UnitsBankroll";
import Parlays from "./HowToBetComps/Parlays";
import OurStyle from "./HowToBetComps/OurStyle";

const container =
  "border-[1px] p-3 text-sm hover:border-blue-200 cursor-pointer flex flex-col space-y-2";

const menuItem = "flex flex-row justify-between items-center cursor-pointer";

const Index: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F5] flex flex-col p-4 space-y-2 font-sans lg:w-2/3 mx-2 mb-2 h-full">
      <div className="flex flex-row items-center space-x-2 pb-1">
        <RiBookReadLine size={32} color={"orange"} />
        <h1 className="text-2xl font-semibold">Sports Betting With MKAbets</h1>
      </div>
      {["Units and Bankroll", "Parlays", "How We Bet"].map((title, index) => (
        <div key={index} className={container}>
          <div className={menuItem} onClick={() => handleExpand(index)}>
            <h4>{title}</h4>
            <IoIosArrowRoundForward
              size={25}
              className={`transition-transform duration-300 ${
                expanded === index ? "transform rotate-90" : ""
              }`}
            />
          </div>
          {expanded === index && (
            <div className="mt-2 text-gray-700">
              <p>
                {expanded === 0 && <UnitsAndBankroll />}
                {expanded === 1 && <Parlays />}
                {expanded === 2 && <OurStyle />}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Index;
