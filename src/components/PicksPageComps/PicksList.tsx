/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useGlobalState } from "@/app/context/store";
import SinglePick from "./SinglePick";
import PickPreviewMD from "./PickPreviewMD";
import { gql, useQuery } from "@apollo/client";
import { getDate } from "@/util/getDate";
import UpdateModal from "../Admin/UpdatePicksModal/UpdateModal";
import { Toaster } from "react-hot-toast";

const GET_PICKS_QUERY = gql`
  query GetPicks {
    getPicks {
      id
      createdAt
      homeTeam
      awayTeam
      homeTeamLogo
      awayTeamLogo
      pick
      unit
      startTime
      result
      leagueLogo
      status
      eventId
      toWin
    }
  }
`;

export type SinglePickProps = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  pick: string;
  unit: number;
  startTime: string;
  result: string;
  createdAt: string;
  leagueLogo: string;
  status: string;
  eventId: string;
  toWin: number;
};

type Props = {
  page: string;
};

export default function PicksList({ page }: Props) {
  const { state, dispatch } = useGlobalState();
  const [slate, setSlate] = React.useState([]);
  const [modalOpen, setOpen] = React.useState<boolean>(false);

  const addGame = (newGame: SinglePickProps) => {
    dispatch({ type: "SET_GAME", payload: newGame });
  };

  const { loading, error, data } = useQuery(GET_PICKS_QUERY);

  useEffect(() => {
    if (!loading && page == "picks") {
      setSlate(
        data.getPicks.filter(
          (pick: SinglePickProps) => pick.createdAt == getDate().dateCheck
        )
      );
    } else if (!loading && page == "update") {
      setSlate(
        data.getPicks.filter(
          (pick: SinglePickProps) => pick.status !== "Complete"
        )
      );
    }
  }, [loading, error, data]);

  useEffect(() => {
    console.log(slate);
  }, [slate]);

  const openModal = (pick: SinglePickProps) => {
    setOpen(true);
    addGame(pick);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col p-4 bg-white text-black pt-4">
      <UpdateModal isOpen={modalOpen} closeModal={closeModal} />
      {page == "update" && <Toaster />}
      <div className="border-t-[1px] border-[#595959] py-1 mx-16"></div>
      <div className="flex justify-center items-center"></div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {slate.length > 0 &&
            slate.map((pick: SinglePickProps) => {
              console.log(pick, page);
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
              if (page == "update") {
                return (
                  <div key={pick.id} onClick={() => openModal(pick)}>
                    <SinglePick {...pick} />
                  </div>
                );
              } else if (page == "picks") {
                return (
                  <div key={pick.id}>
                    <SinglePick {...pick} />
                  </div>
                );
              }
            })}
        </div>
      </div>
      {/* Large view goes here */}
    </div>
  );
}
{
  /* <div className="hidden lg:flex lg:flex-row lg:m-6">
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
            leagueLogo={""}
          />
        </div>
      </div> */
}