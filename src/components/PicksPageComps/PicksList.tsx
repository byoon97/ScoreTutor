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
import RightColumn from "../HomeComps/Picks/RightColumn";
import { IoIosArrowDown } from "react-icons/io";

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

enum SortOptions {
  UpcomingGames = "Upcoming Games",
  MostUnitsWagered = "Most Units Wagered",
  MostRecentPicks = "Most Recent Picks",
}

export default function PicksList({ page }: Props) {
  const { state, dispatch } = useGlobalState();
  const [slate, setSlate] = React.useState<SinglePickProps[]>([]);
  const [modalOpen, setOpen] = React.useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("Upcoming Games");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const addGame = (newGame: SinglePickProps) => {
    dispatch({ type: "SET_GAME", payload: newGame });
  };

  const { loading, error, data } = useQuery(GET_PICKS_QUERY);

useEffect(() => {
  if (!loading && page == "picks") {
    setSlate(
      data.getPicks.filter(
        (pick: SinglePickProps) => pick.status !== "Complete"
      )
    );
  } else if (!loading && page == "update") {
    setSlate(
      data.getPicks.filter(
        (pick: SinglePickProps) => pick.status !== "Complete"
      )
    );
  }
}, [data?.getPicks, loading, page]);




  useEffect(() => {
    if (slate.length === 0) return;

    let sortedSlate: SinglePickProps[] = [];

    switch (selectedOption) {
      case SortOptions.UpcomingGames:
        sortedSlate = [...slate].sort(
          (a: SinglePickProps, b: SinglePickProps) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        break;
      case SortOptions.MostUnitsWagered:
        sortedSlate = [...slate].sort(
          (a: SinglePickProps, b: SinglePickProps) => b.unit - a.unit
        );
        break;
      case SortOptions.MostRecentPicks:
        sortedSlate = [...slate].sort(
          (a: SinglePickProps, b: SinglePickProps) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setSlate(sortedSlate);
  }, [slate, selectedOption]);

  const openModal = (pick: SinglePickProps) => {
    setOpen(true);
    addGame(pick);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col p-2 bg-white text-black pt-4">
      <UpdateModal isOpen={modalOpen} closeModal={closeModal} />
      {page == "update" && <Toaster />}
      {/* SORTER */}
      <div className="flex flex-row h-8 ">
        <h4 className="text-black text-sm font-sans font-thin flex items-center justify-center pr-1">
          Sort By :
        </h4>
        <div className="relative flex flex-row space-between w-1/2">
          <div
            className="h-full border-[1px] bg-white w-full flex flex-row items-center justify-between px-2 text-xs font-medium cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="">{selectedOption}</span>
            <div className="border-l-[1px] pl-2 ">
              <IoIosArrowDown size="16px" />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border-[1px] border-gray-300 font-sans text-sm">
              {/* Dropdown options */}
              <div
                className="p-2 cursor-pointer border-b-[1px] px-2 hover:bg-blue-300"
                onClick={() => handleOptionClick("Most Units Wagered")}
              >
                Most Units Wagered
              </div>
              <div
                className="p-2 cursor-pointer border-b-[1px] px-2 hover:bg-blue-300"
                onClick={() => handleOptionClick("Upcoming Games")}
              >
                Upcoming Games
              </div>
              <div
                className="p-2 cursor-pointer px-2 hover:bg-blue-300"
                onClick={() => handleOptionClick("Most Recent Picks")}
              >
                Most Recent Picks
              </div>
            </div>
          )}
        </div>
      </div>
      {/* PICKS LIST */}
      <div className="flex flex-col md:hidden">
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
      <div className="hidden md:flex md:justify-center md:flex-row">
        <div className="flex flex-col w-screen">
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
        <RightColumn />
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