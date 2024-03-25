/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useGlobalState } from "../context/store";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Fanduel } from "../../../public/sportsLogos/fanduel";

type Props = {};

export default function Page({}: Props) {
  const { state, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (state.currentGame) {
      console.log(state.currentGame);
      setIsLoading(false);
    }
  }, [state]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white text-black pb-2 border-[1px] border-black">
      {/* 
      HEADER */}
      <div className="bg-[#1E2021] text-white py-1 px-2 text-xs h-8 flex items-center">
        {state.currentGame?.when}
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

      {/* Preview and Pick */}
      <div className="mx-4 my-8">
        <h4 className="text-xl mb-2 font-bold">Preview and Pick</h4>
        <p className="text-sm">
          Heading into this matchup, the IND Pacers are 8th in the Eastern
          Conference with a home record of 20-12 while the MIN Timberwolves are
          1st in the Western Conference with an away record of 20-11. While the
          Timberwolves have the best overall defense in the game with the
          defensive rating of 109.4, they are missing star player, Karl-Anthony
          Towns. He accounts for 34% of help defense in the post as well as
          having the ability to guard the perimiter with his 7&apos;1 wingspan,
          which funnels the opposing offense into the realm of Rudy Gobert. The
          abense of KAT allows the Pacers with the 2nd highest rated offense of
          121.5 to free up both the perimiter and paint.
        </p>
        <br />
        <div className="font-bold">Quick Facts about tonights Matchup</div>
        <ul>
          <li className="text-xs py-1">
            - Pacers are #1 in allowing the least amount of 3s allowed and made
            to opposing offenses at 10.9 made at 29 attempts
          </li>
          <li className="text-xs py-1">
            - Timberwolves are 16th in 3PM at a rate of 12.5 made and 25th in
            3PA at a rate of 32.1 attempts
          </li>
          <li className="text-xs py-1">
            - Timerwolves are #1 in average rebounds per game at 44.2 (although
            KAT accounts for 8.4)
          </li>
          <li className="text-xs py-1">
            - Pacers are 3rd to last in RPG at 40.9 per game but bumped up to
            42.2 with star Pascal Siakam
          </li>
          <li className="text-xs py-1">
            - In the last 5 matchups MIN is 5-0 ATS with the average total being
            227.5
          </li>
        </ul>
        <br />
        <div className="py-4 border-black">
          {" "}
          <div className="mb-4 font-bold">Key Injuries</div>
          <div className="flex flex-row">
            <div className="mr-6 pr-6 border-r-[1px] border-black">
              {" "}
              <span className="text-sm font-bold">MIN Timberwolves</span>
              <ul>
                <li className="text-xs">- Karl-Anthony Towns | OUT - knee</li>
              </ul>
            </div>
            <div>
              {" "}
              <span className="text-sm font-bold">IND Pacers</span>
              <ul>
                <li className="text-xs">- Doug Mcdermott | OUT - Calf</li>
                <li className="text-xs">
                  - Bennedict Mathurin | OUT - Shoulder
                </li>
              </ul>
            </div>
          </div>
        </div>

        <br />
        <div className="pb-4">
          <div className="font-inter text-sm">
            Look for Pacers to be aggressive while hunting mismatches all night.
            The Wolves will more than likely have to figure out their roles on
            the fly without KAT on the floor tonight.
          </div>
          <br />
          <div className="text-sm font-bold">Our Pick : Pacers ML (-120)</div>
          <div className="text-sm font-bold">Leans: OVER 228.5</div>
        </div>

        <div className="text-xs text-[#5F5F5F]">
          Created: 03/07/24 5:13PM EST
        </div>
      </div>
    </div>
  );
}
