/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { GamePick, picks } from "../../../public/data/picks";
import Image from "next/image";
import Link from "next/link";
import { Game, useGlobalState } from "@/app/context/store";
import SinglePick from "./SinglePick";
import PickPreviewMD from "./PickPreviewMD";
import RightColumn from "../HomeComps/Picks/RightColumn";

type Props = {};

export default function PicksList({}: Props) {
  const { state, dispatch } = useGlobalState();

  const addGame = (newGame: Game) => {
    dispatch({ type: "SET_GAME", payload: newGame });
  };

  const getDate = () => {
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="flex flex-col p-4 bg-white text-black pt-4">
      <div className="border-t-[1px] border-[#595959] py-3 mx-16"></div>
      <div className="lg:hidden">
        {picks.map((pick) => {
          const generateLink = () => {
            let link;
            const awayTeam = pick.awayTeam.replace(/\s/g, "_");
            const homeTeam = pick.homeTeam
              .replace(/\s/g, "_")
              .replace("@", "%40");
            const date = getDate().replace(/\//g, "-");

            link = `${awayTeam}_${homeTeam}_${date}`;

            return link;
          };

          return (
            <div key={pick.id} onClick={() => addGame(pick)}>
              <Link href={generateLink()}>
                <SinglePick pick={pick as GamePick} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:flex lg:flex-row">
        <div className="mr-4">
          {" "}
          {picks.map((pick) => {
            return (
              <div key={pick.id} onClick={() => addGame(pick)}>
                <SinglePick pick={pick as GamePick} />
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex">
          <PickPreviewMD />
        </div>
      </div>
    </div>
  );
}
