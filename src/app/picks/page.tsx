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
    <div className="bg-white text-black pt-6 xl:px-80">
      <h1 className="bg-white text-black text-center font-mono">
        {getDate()} Picks
      </h1>
      {/* <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div> */}
      <div className="border-t-[1px] border-[#595959] my-2 mx-16"></div>
      <PicksList page={"picks"} />
    </div>
  );
}

