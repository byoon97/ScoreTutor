/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Pick, event } from "@/types";

type LinesProps = {
  time: string;
  selectedSport: string;
  event: event;
  setBetSlip: React.Dispatch<React.SetStateAction<Pick[]>>;
};

const lineContainer =
  "flex p-2 m-0.5 justify-center text-center flex-col gap-2 bg-[#242424] h-12 text-white";
const oddsBox = "text-xs box-border h-full w-full relative";

const leagueLogos = [
  { label: "NBA", imageSrc: "/sportsLogos/NBA.png" },
  { label: "NFL", imageSrc: "/sportsLogos/NFL.png" },
  { label: "MLB", imageSrc: "/sportsLogos/MLB.png" },
  { label: "NHL", imageSrc: "/sportsLogos/NHL.png" },
  { label: "NCAA", imageSrc: "/sportsLogos/NCAA.png" },
];

const Lines: React.FC<LinesProps> = ({
  time,
  event,
  selectedSport,
  setBetSlip,
}) => {
  const [data, setData] = React.useState<Pick>({
    homeTeam: event.teams[1].name,
    homeTeamLogo: event.teams[1].teamLogo,
    awayTeam: event.teams[0].name,
    awayTeamLogo: event.teams[0].teamLogo,
    pick: "",
    unit: 0,
    startTime: time,
    result: "In Progress",
    eventId: event.eventid,
    toWin: 0,
    leagueLogo: leagueLogos.filter((league) => league.label == selectedSport)[0]
      .imageSrc,
    status: "In Progress",
  });

  const handleAdd = (ele: Pick) => {
    setBetSlip((prevBetSlip) => [...prevBetSlip, ele]);
  };

  return (
    <div className=" text-white border-t border-gray-800 pb-2 pt-2 mt-2">
      <div className="text-[10px]">{time}</div>
      <div className="flex flex-row">
        <div className="mt-2 flex items-center justify-center overflow-hidden w-full">
          <div className="imgContainer">
            <img
              src={event.teams[0].teamLogo}
              width={18}
              height={18}
              alt="AwayTeam Icon"
            />
          </div>
          <div className=" text-white text-sm ml-2.5 overflow-hidden max-w-full team1">
            {event.teams[0].name}
          </div>
        </div>
        {/* AWAY TEAM SPREAD!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `${event.teams[0].name} ${event.lines.spread.point_spread_away} ${event.lines.spread.point_spread_away_odds}`,
            })
          }
        >
          {event.lines.spread.point_spread_away == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-white line">
                {event.lines.spread.point_spread_away.toString()[0] === "-"
                  ? event.lines.spread.point_spread_away
                  : "+" + event.lines.spread.point_spread_away}
              </div>
              <div className="text-[#00aa38] lineodds">
                {event.lines.spread.point_spread_away_odds.toString()[0] === "-"
                  ? event.lines.spread.point_spread_away_odds
                  : "+" + event.lines.spread.point_spread_away_odds}
              </div>
            </div>
          )}
        </div>
        {/* OVER!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `Over ${event.lines.total.total_over} ${event.lines.total.total_over_odds}`,
            })
          }
        >
          {event.lines.total.total_over == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-white line">
                O {event.lines.total.total_over}
              </div>
              <div className="text-[#00aa38] lineodds">
                {event.lines.total.total_over_odds.toString()[0] == "-"
                  ? event.lines.total.total_over_odds
                  : "+" + event.lines.total.total_over_odds}
              </div>
            </div>
          )}
        </div>
        {/* AWAY TEAM!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `${event.teams[0].name} ML ${event.lines.moneyline.moneyline_away}`,
            })
          }
        >
          {event.lines.moneyline.moneyline_away == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-[#00aa38] lineodds">
                {" "}
                {event.lines.moneyline.moneyline_away.toString()[0] === "-"
                  ? event.lines.moneyline.moneyline_away
                  : "+" + event.lines.moneyline.moneyline_away}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* home team */}
      <div className="flex flex-row">
        <div className="mt-2 flex items-center justify-center overflow-hidden w-full">
          <div className="imgContainer">
            <img
              src={event.teams[1].teamLogo}
              width={18}
              height={18}
              alt="AwayTeam Icon"
            />
          </div>
          <div className=" text-white text-sm ml-2.5 overflow-hidden max-w-full team1">
            {event.teams[1].name}
          </div>
        </div>
        {/* HOME TEAM SPREAD!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `${event.teams[1].name} ${event.lines.spread.point_spread_home} ${event.lines.spread.point_spread_home_odds}`,
            })
          }
        >
          {event.lines.spread.point_spread_home == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-white line">
                {event.lines.spread.point_spread_home.toString()[0] === "-"
                  ? event.lines.spread.point_spread_home
                  : "+" + event.lines.spread.point_spread_home}
              </div>
              <div className="text-[#00aa38] lineodds">
                {event.lines.spread.point_spread_home_odds.toString()[0] === "-"
                  ? event.lines.spread.point_spread_home_odds
                  : "+" + event.lines.spread.point_spread_home_odds}
              </div>
            </div>
          )}
        </div>
        {/* UNDER!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `Over ${event.lines.total.total_over} ${event.lines.total.total_under_odds}`,
            })
          }
        >
          {event.lines.total.total_over == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-white line">
                U {event.lines.total.total_over}
              </div>
              <div className="text-[#00aa38] lineodds">
                {event.lines.total.total_under_odds.toString()[0] === "-"
                  ? event.lines.total.total_under_odds
                  : "+" + event.lines.total.total_under_odds}
              </div>
            </div>
          )}
        </div>
        {/* home TEAM!!!!!!!!!!! */}
        <div
          className={oddsBox}
          onClick={() =>
            handleAdd({
              ...data,
              pick: `${event.teams[1].name} ML ${event.lines.moneyline.moneyline_home}`,
            })
          }
        >
          {event.lines.moneyline.moneyline_home == 0.0001 ? (
            <div className={lineContainer}>N/A</div>
          ) : (
            <div className={lineContainer}>
              <div className="text-[#00aa38] lineodds">
                {" "}
                {event.lines.moneyline.moneyline_home.toString()[0] === "-"
                  ? event.lines.moneyline.moneyline_home
                  : "+" + event.lines.moneyline.moneyline_home}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lines;
