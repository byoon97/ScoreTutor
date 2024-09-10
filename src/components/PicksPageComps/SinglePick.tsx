/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SinglePickProps } from "./PicksList";
import { useUser } from "@/app/context/UserContext/userStore";
import { whenProvider } from "@/util/getDate";

const SinglePick: React.FC<SinglePickProps> = (game) => {
  const { day, when } = whenProvider(game.startTime);

  const { isSignedIn, user } = useUser();
  return (
    <div className="border-[1px] border-[#144E65] bg-[#1D3041] my-2 text-sm p-4 rounded-lg shadow-lg hover:border-sky-500 w-full fo">
      <div className="flex flex-row justify-between">
        {when <= 0 ? (
          <div className="text-[12px] pb-2 pr-2 text-gray-300">In Progress</div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="text-[10px] text-center p-1 text-gray-300">
              {day}
            </div>{" "}
            {when <= 120 ? (
              <div
                className={`text-xs ${
                  when <= 120 ? "bg-red-500 text-white animate-pulse" : ""
                } p-1 rounded`}
              >
                {when} <span>Minutes</span>
              </div>
            ) : (
              <span className="text-[10px] pr-2 text-center p-1 text-gray-300">
                {game.startTime.split(" ")[1]} EST
              </span>
            )}
          </div>
        )}

        <img src={game.leagueLogo} alt="" className="w-8 h-6" />
      </div>

      <div className="flex flex-row items-center justify-start pb-2  text-gray-300">
        <div className="flex flex-row items-center">
          <img src={game.awayTeamLogo} alt="team logo" width={27} height={27} />
          &nbsp;
          <div className="font-inter font-roboto text-[14px]">
            {game.awayTeam}
          </div>
        </div>
        &nbsp;
        <div className="flex flex-row items-center">
          <div className="font-inter font-roboto text-[14px]">
            @&nbsp;{game.homeTeam}
          </div>
          &nbsp;
          <img src={game.homeTeamLogo} alt="team logo" width={27} height={27} />
        </div>
      </div>
      <div className="py-1 text-xs">
        <span className="font-semisemibold text-white">
          Our Pick: {game.pick}
        </span>{" "}
        &nbsp;
      </div>
      <div className="border-t-[1px] border-[#E2E8F0] my-2"></div>
      <div className="flex flex-row justify-between py-2">
        <div>
          <div className="text-[12px] font-semibold text-gray-200">
            Units Wagered: {game.unit}
          </div>
          <div className="text-[12px] font-semibold text-gray-200">
            Units to Win: {game.toWin}
          </div>
        </div>{" "}
        <div className="text-[12px] color-black">Status: {game.createdAt}</div>
        {user && (
          <div className="flex justify-end flex-col text-gray-200">
            <div className="text-[12px] font-semibold">
              Your Wager: ${game.unit * user?.unitSize}
            </div>
            <div className="text-[12px] font-semibold text-gray-200">
              Your Return: ${(game.toWin * user?.unitSize).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePick;
