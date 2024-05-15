/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { GamePick, picks } from "../../../public/data/picks";
import Image from "next/image";
import Link from "next/link";
import { useGlobalState } from "@/app/context/store";
import SinglePick from "./SinglePick";
import PickPreviewMD from "./PickPreviewMD";
import { gql, useQuery } from "@apollo/client";

const GET_PICKS_QUERY = gql`
  query GetPicks {
    getPicks {
      createdAt
      homeTeam
      awayTeam
      homeTeamLogo
      awayTeamLogo
      pick
      unit
      startTime
      result
    }
  }
`;

export type SinglePickProps = {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  pick: string;
  unit: number;
  startTime: string;
  result: string;
  createdAt: string;
};

type Props = {};

export default function PicksList({}: Props) {
  const { state, dispatch } = useGlobalState();
  const [slate, setSlate] = React.useState([]);

  const addGame = (newGame: SinglePickProps) => {
    dispatch({ type: "SET_GAME", payload: newGame });
  };

  const { loading, error, data } = useQuery(GET_PICKS_QUERY);

  const getDate = () => {
    const currentDate = new Date();
    const formattedMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${formattedMonth}-${formattedDay}-${currentDate.getFullYear()}`;
    const dateCheck = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

    return { formattedDate, dateCheck };
  };

  useEffect(() => {
    if (!loading) {
      data.getPicks.forEach((game: SinglePickProps) => {
        console.log(game.createdAt, getDate().dateCheck);
      });
      setSlate(
        data.getPicks.filter(
          (pick: SinglePickProps) => pick.createdAt == getDate().dateCheck
        )
      );
      console.log(slate);
    } else {
      console.log(loading);
    }
  }, [loading, error, data]);

  return (
    <div className="flex flex-col p-4 bg-white text-black pt-4">
      <div className="border-t-[1px] border-[#595959] py-1 mx-16"></div>
      <div className="flex justify-center items-center">
        <Link href={"/addPick"}>
          {" "}
          <button className="border-[1px] px-2 py-1 rounded-lg border-black text-[13px]">
            Add Pick
          </button>
        </Link>
      </div>
      <div className="flex items-center, justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
          {!loading &&
            slate.map((pick: SinglePickProps) => {
              const generateLink = () => {
                let link;
                const awayTeam = pick.awayTeam.replace(/\s/g, "_");
                const homeTeam = pick.homeTeam
                  .replace(/\s/g, "_")
                  .replace("@", "%40");
                const date = getDate().formattedDate.replace(/\//g, "-");

                link = `${awayTeam}_${homeTeam}_${date}`;

                return link;
              };

              return (
                // change to flex wrap or grid later on medium screens
                <div
                  key={data.getPicks.indexOf(pick)}
                  // onClick={() => addGame(pick)}
                  className="md:w-[397px]"
                >
                  <Link href={generateLink()}>
                    <SinglePick {...pick} />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-row lg:m-6">
        <div className="mr-4">
          {" "}
          {slate.map((pick: SinglePickProps) => {
            return (
              <div
                key={data.getPicks.indexOf(pick)}
                onClick={() => addGame(pick)}
              >
                <SinglePick {...pick} />
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex">
          <PickPreviewMD
            homeTeam={""}
            awayTeam={""}
            homeTeamLogo={""}
            awayTeamLogo={""}
            pick={""}
            unit={0}
            startTime={""}
            result={""}
            createdAt={""}
          />
        </div>
      </div>
    </div>
  );
}
