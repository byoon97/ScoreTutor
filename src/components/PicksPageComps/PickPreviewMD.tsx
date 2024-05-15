/* eslint-disable @next/next/no-img-element */
import { useGlobalState } from "@/app/context/store";
import React from "react";
import Loader from "../Loader";
import { Fanduel } from "../../../public/sportsLogos/fanduel";
import { SinglePickProps } from "./PicksList";

type Props = {};

const PickPreviewMD: React.FC<SinglePickProps> = (game) => {
  const { state, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (state.currentGame) {
  //     console.log(state.currentGame);
  //     setIsLoading(false);
  //   }
  // }, [state]);

  return (
    <div className="bg-white text-black pb-2 border-[1px] border-black">
      {/* 
    HEADER */}
      <div className="bg-[#1E2021] text-white py-1 px-2 text-xs h-8 flex items-center">
        {state.currentGame?.createdAt} {state.currentGame?.startTime}
      </div>
      <div className="flex flex-col mt-2">
        {" "}
        <div className="flex flex-row items-center p-4">
          <img
            src={state.currentGame?.awayTeamLogo}
            alt="away team"
            width={50}
            height={50}
          />
          <div className="flex flex-col ml-4 ">
            {" "}
            <span className="font-bold">{state.currentGame?.awayTeam}</span>
            <div className="text-xs text-[#5F5F5F]">43-19, 1st Western</div>
          </div>
        </div>
        <div className="border-b-[1px] my-2 border-[#5F5F5F]"></div>
        <div className="flex flex-row items-center p-4">
          <img
            src={state.currentGame?.homeTeamLogo}
            alt="home team"
            width={50}
            height={50}
          />
          <div className="flex flex-col ml-4 ">
            <span className="font-bold">{state.currentGame?.homeTeam}</span>
            <span className="text-xs text-[#5F5F5F]">35-28, 8th Eastern</span>
          </div>
        </div>
        <div className="border-b-[1px] my-2 border-[#5F5F5F]"></div>
      </div>

      {/* TEAM DATA */}
      <div className="my-2 px-2">
        <div className="flex flex-col">
          <div className="flex flex-row bg-[#E0E0E0] font-bold text-sm px-4 py-1">
            <span className="mr-10">Team</span>
            <span className="mr-6">Record</span>
            <span className="mr-12">ATS</span>
            <span className="mr-16">O/U</span>
            <span className="mr-12">Away</span>
            <span className="mr-12">Home</span>
          </div>
          <div className=" text-sm flex flex-row items-center px-4 py-2 border-b-[1.5px] border-[#E0E0E0]">
            <div className="flex flex-row items-center mr-6">
              {" "}
              <img
                src={state.currentGame?.awayTeamLogo}
                alt="away team"
                width={25}
                height={25}
                className="mr-1"
              />{" "}
              <span className="underline">MIN</span>
            </div>

            <span className="mr-8">45-21</span>
            <span className="mr-5">33-33-0</span>
            <span className="mr-8">33-33-0</span>
            <span className="mr-12">22-13</span>
            <span className="">23-8</span>
          </div>
          <div className=" text-sm flex flex-row items-center px-4 py-2">
            <div className="flex flex-row items-center mr-6">
              {" "}
              <img
                src={state.currentGame?.homeTeamLogo}
                alt="away team"
                width={25}
                height={25}
                className="mr-1"
              />{" "}
              <span className="underline">IND</span>
            </div>

            <span className="mr-8">45-21</span>
            <span className="mr-5">33-33-0</span>
            <span className="mr-8">33-33-0</span>
            <span className="mr-12">22-13</span>
            <span className="">23-8</span>
          </div>
        </div>
      </div>

      {/* ODD DATA */}
      <div className="my-2 px-2">
        <div className="flex flex-col">
          <div className="flex flex-row bg-[#E0E0E0] font-bold text-sm px-4 py-1">
            <span className="mr-10">Odds</span>
            <span className="mr-14">Team</span>
            <span className="mr-20">Spread</span>
            <span className="mr-24">Total</span>
            <span className="mr-12">ML</span>
          </div>
          <div className="flex flex-row">
            {" "}
            <Fanduel />
            <div className="flex flex-col">
              <div className=" text-sm flex flex-row items-center py-2">
                <div className="flex flex-row items-center mr-9 ">
                  {" "}
                  <img
                    src={state.currentGame?.awayTeamLogo}
                    alt="away team"
                    width={25}
                    height={25}
                    className="mr-1"
                  />{" "}
                  <span>IND</span>
                </div>

                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
              </div>{" "}
              <div className=" text-sm flex flex-row items-center py-2">
                <div className="flex flex-row items-center mr-9">
                  {" "}
                  <img
                    src={state.currentGame?.homeTeamLogo}
                    alt="away team"
                    width={25}
                    height={25}
                    className="mr-1"
                  />{" "}
                  <span>IND</span>
                </div>
                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
                <div className="mr-8 border-[1px] border-[#B6B7BB] rounded-lg w-24 flex p-1 justify-center text-xs">
                  <span className="mr-2">-7.5</span>{" "}
                  <span className="text-[#989898]">-110</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickPreviewMD;
