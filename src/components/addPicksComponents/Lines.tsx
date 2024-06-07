"use client";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { InputObject, OutputObject } from "@/functions/eventsMapper";

type LinesProps = {
  time: string;
  event: any;
};

const CreatePickMutation = gql`
  mutation createPick(
    $homeTeam: String!
    $awayTeam: String!
    $homeTeamLogo: String!
    $awayTeamLogo: String!
    $pick: String!
    $unit: Float!
    $startTime: String!
    $result: String!
    $leagueLogo: String!
  ) {
    createPick(
      homeTeam: $homeTeam
      awayTeam: $awayTeam
      homeTeamLogo: $homeTeamLogo
      awayTeamLogo: $awayTeamLogo
      pick: $pick
      unit: $unit
      startTime: $startTime
      result: $result
      leagueLogo: $leagueLogo
    ) {
      homeTeam
      awayTeam
      homeTeamLogo
      awayTeamLogo
      pick
      unit
      startTime
      result
      leagueLogo
    }
  }
`;

const lineContainer =
  "flex p-2 m-0.5 justify-center text-center flex-col gap-2 bg-[#242424] h-12 text-white";
const oddsBox = "text-xs box-border h-full w-full relative";

const Lines: React.FC<LinesProps> = ({ time, event }) => {
  const [createPick, { data: createdPick, loading, error }] =
    useMutation(CreatePickMutation);

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     createPickFunction();
  //   };

  //   const createPickFunction = async () => {
  //     const variables = {
  //       homeTeam,
  //       awayTeam,
  //       homeTeamLogo,
  //       awayTeamLogo,
  //       pick,
  //       unit,
  //       startTime,
  //       result: "Incomplete",
  //       leagueLogo,
  //     };

  //     try {
  //       console.log("variables", variables);
  //       createPick({ variables })
  //         .then((response) => {
  //           console.log("Pick Created:", response.data.createPick);
  //         })
  //         .catch((err) => {
  //           console.error("Error creating pick:", err);
  //         });
  //       // const newPick = await createPick({ variables });
  //       // console.log(newPick);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Error has occured");
  //     }
  //   };
  return (
    <div className=" text-white border-t border-gray-800 pb-2 pt-2 mt-2">
      <div className="text-[10px]">{time}</div>
      <div className="flex flex-row">
        <div className="mt-2 flex items-center justify-center text-right overflow-hidden w-full">
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
        <div className={oddsBox}>
          {event.lines.spread.point_spread_away == 0.001 ? (
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
        <div className={oddsBox}>
          {event.lines.total.total_over == 0 ||
          event.lines.total.total_over == 0.0001 ? (
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
        <div className={oddsBox}>
          {event.lines.moneyline.moneyline_away == 0.0001 ||
          event.lines.moneyline.moneyline_away == 0.0001 ? (
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
        <div className="mt-2 flex items-center justify-center text-right overflow-hidden w-full">
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
        <div className={oddsBox}>
          {event.lines.spread.point_spread_home == 0.001 ? (
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
        <div className={oddsBox}>
          {event.lines.total.total_over == 0 ||
          event.lines.total.total_over == 0.0001 ? (
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
        <div className={oddsBox}>
          {event.lines.moneyline.moneyline_home == 0.0001 ||
          event.lines.moneyline.moneyline_home == 0.0001 ? (
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
