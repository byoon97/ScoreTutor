import React from "react";
import { picks } from "../../../public/data/picks";
import PicksList from "@/components/PicksPageComps/PicksList";

type Props = {};

export default function Page({}: Props) {
  const getDate = () => {
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    return formattedDate;
  };
  return (
    <div className="bg-[#14222F] text-black pt-6 xl:px-80">
      <h1 className="bg-[#14222F] text-gray-300 text-center font-sans">
        {getDate()} Picks
      </h1>
      {/* <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div> */}
      <div className="border-t-[1px] border-gray-300 my-2 mx-16"></div>
      <PicksList page={"picks"} />
    </div>
  );
}

