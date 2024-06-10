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
    <div className="bg-white text-black pt-6">
      <div className="text-center">
        {" "}
        <span className="text-3xl font-bold">{getDate()} Picks</span>
      </div>

      <PicksList page={"picks"} />
    </div>
  );
}
