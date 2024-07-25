/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SinglePickProps } from "./PicksList";
import { useUser } from "@/app/context/UserContext/userStore";
import { whenProvider } from "@/util/getDate";

const SinglePick: React.FC<SinglePickProps> = (game) => {
  const { day, when } = whenProvider(game.startTime);

  const { isSignedIn, user } = useUser();
  return (
    <div
      style={{ backgroundColor: "white" }}
      className="border-[1px] border-[#E2E8F0] bg-white my-2 text-sm p-4 rounded-lg shadow-lg hover:border-sky-500 w-full"
    >
      <div className="flex flex-row justify-between">
        {when <= 0 ? (
          <div className="text-[12px] pb-2 pr-2">In Progress</div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="text-[10px] text-center p-1">{day}</div>{" "}
            {when <= 120 ? (
              <div
                className={`text-xs ${
                  when <= 120 ? "bg-red-500 text-white animate-pulse" : ""
                } p-1 rounded`}
              >
                {when}
              </div>
            ) : (
              <span className="text-[10px] pr-2 text-center p-1">
                {game.startTime.split(" ")[1]} EST
              </span>
            )}
          </div>
        )}

        <img src={game.leagueLogo} alt="" className="w-8 h-6" />
      </div>

      <div className="flex flex-row items-center justify-start pb-2 text-[#212A31]">
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
        <span className="font-bold text-[#144E66]">Our Pick: {game.pick}</span>{" "}
        &nbsp;
      </div>
      <div className="border-t-[1px] border-[#E2E8F0] my-2"></div>
      <div className="flex flex-row justify-between py-2">
        <div>
          <div className="text-[12px] font-bold">
            Units Wagered: {game.unit}
          </div>
          <div className="text-[12px] font-bold">
            Units to Win: {game.toWin}
          </div>
        </div>
        {user && (
          <div className="flex justify-end flex-col">
            <div className="text-[12px] font-bold">
              Your Wager: ${game.unit * user?.unitSize}
            </div>
            <div className="text-[12px] font-bold">
              Return: ${game.toWin * user?.unitSize}
            </div>
          </div>
        )}
      </div>

      {/* <div className="text-[12px]">Status: {game.status}</div> */}
    </div>
  );
};

export default SinglePick;
