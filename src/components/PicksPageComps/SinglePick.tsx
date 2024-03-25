/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GamePick } from "../../../public/data/picks";
import Image from "next/image";

interface SinglePickProps {
  pick: GamePick;
}

export default function SinglePick({ pick }: SinglePickProps) {
  return (
    <div className="border-[1px] border-[#595959] my-2 text-sm p-4 rounded-lg shadow-lg hover:border-sky-500 md:w-[397px]">
      {" "}
      <div className="flex flex-row justify-between -px-2">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            {" "}
            <div className="flex flex-col">
              {" "}
              <span className="text-xs pb-1">{pick.when}</span>
              <div className="flex justify-between text-[15px]">
                {" "}
                <div className="flex flex-row items-center">
                  <div className="flex flex-row justify-start items-center">
                    <img
                      src={pick.awayTeamLogo}
                      alt="team logo"
                      width={27}
                      height={27}
                    />
                    &nbsp;
                    <div className="font-inter font-bold text-[13px]">
                      {pick.awayTeam}
                    </div>
                  </div>
                  &nbsp;
                  <div className="flex flex-row justify-start items-center">
                    <div className="font-inter font-bold text-[13px]">
                      @&nbsp;{pick.homeTeam}
                    </div>
                    &nbsp;
                    <img
                      src={pick.homeTeamLogo}
                      alt="team logo"
                      width={27}
                      height={27}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={pick.logo}
              alt="leagueLogo"
              height={50}
              width={50}
              className="ml-4"
            />
          </div>
        </div>
      </div>
      <div className="py-1 text-xs">
        <div className="flex flex-row">
          <span>{pick.spread}</span> &nbsp;
          <span>o/u {pick.total}</span>
        </div>
      </div>
      <div className="text-[9px]">time created</div>
    </div>
  );
}
