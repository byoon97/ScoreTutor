/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GamePick } from "../../../public/data/picks";
import Image from "next/image";
import { SinglePickProps } from "./PicksList";

const SinglePick: React.FC<SinglePickProps> = (game) => {
  return (
    <div className="border-[1px] border-[#595959] my-2 text-sm p-4 rounded-lg shadow-lg hover:border-sky-500 md:w-[397px]">
      {" "}
      <div className="flex flex-row justify-between -px-2">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            {" "}
            <div className="flex flex-col">
              {" "}
              <div className="flex justify-between text-[15px]">
                {" "}
                <div className="flex flex-row items-center">
                  <div className="flex flex-row justify-start items-center">
                    <img
                      src={game.awayTeamLogo}
                      alt="team logo"
                      width={27}
                      height={27}
                    />
                    &nbsp;
                    <div className="font-inter font-bold text-[13px]">
                      {game.awayTeam}
                    </div>
                  </div>
                  &nbsp;
                  <div className="flex flex-row justify-start items-center">
                    <div className="font-inter font-bold text-[13px]">
                      @&nbsp;{game.homeTeam}
                    </div>
                    &nbsp;
                    <img
                      src={game.homeTeamLogo}
                      alt="team logo"
                      width={27}
                      height={27}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <Image
              src={pick.logo}
              alt="leagueLogo"
              height={50}
              width={50}
              className="ml-4"
            /> */}
          </div>
        </div>
      </div>
      <div className="py-1 text-xs">
        <div className="flex flex-row">
          <span>{game.pick}</span> &nbsp;
        </div>
      </div>
      <div className="text-[12px] font-bold">Units Wagered: {game.unit}</div>
      <div className="text-[12px]">Pick: {game.startTime}</div>
      <div className="text-[12px]">Result: {game.result}</div>
    </div>
  );
};

export default SinglePick;
