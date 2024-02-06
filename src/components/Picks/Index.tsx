import React from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

const Picks: React.FC = () => {
  return (
    <div className="bg-[#F3F4F6] -mx-2 px-4 pt-4 flex flex-col">
      <div className="md:hidden">
        <LeftColumn />
      </div>
      {/* Medium View */}
      <div className="hidden md:flex md:flex-row lg:mx-52 lg:my-2">
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
};

export default Picks;
