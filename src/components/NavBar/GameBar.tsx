"use client";
import React, { FC, useState, useRef } from "react";
import Dropdown from "./GameBarComps/DropDown";
import GameCarousel from "./GameBarComps/Carousel";
import useSWR from "swr";
import { useUser } from "@auth0/nextjs-auth0/client";

const dropdownOptions = [
  { label: "NBA", imageSrc: "/sportsLogos/NBA.png" },
  { label: "NFL", imageSrc: "/sportsLogos/NFL.png" },
  { label: "MLB", imageSrc: "/sportsLogos/MLB.png" },
  { label: "NHL", imageSrc: "/sportsLogos/NHL.png" },
  { label: "NCAA", imageSrc: "/sportsLogos/NCAA.png" },
];

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

interface GameBarProps {}

const GameBar: React.FC<GameBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [data, setData] = useState();
  const { user } = useUser();

  const {
    data: nbaData,
    error: nbaError,
    isLoading: nbaLoading,
  } = useSWR("/api/NBA", fetcher);

  const {
    data: nflData,
    error: nflError,
    isLoading: nflLoading,
  } = useSWR("/api/NFL", fetcher);

  const {
    data: nhlData,
    error: nhlError,
    isLoading: nhlLoading,
  } = useSWR("/api/NHL", fetcher);

  const {
    data: mlbData,
    error: mlbError,
    isLoading: mlbLoading,
  } = useSWR("/api/MLB", fetcher);

  React.useEffect(() => {
    if (selectedOption.label === "NBA") {
      if (nbaLoading) console.log("...loading nba games");
      else if (nbaError) console.error(nbaError);
      else setData(nbaData);
    }

    if (selectedOption.label === "NFL") {
      if (nflLoading) console.log("...loading nfl games");
      else if (nflError) console.error(nflError);
      else setData(nflData);
    }

    if (selectedOption.label === "NHL") {
      if (nhlLoading) console.log("...loading nhl games");
      else if (nhlError) console.error(nhlError);
      else setData(nhlData);
    }

    // if (selectedOption.label === "MLB") {
    //   if (mlbLoading) console.log("...loading mlb games");
    //   else if (mlbError) console.error(mlbError);
    //   else setData(mlbData);
    // }

    if (user) console.log(user);
  }, [
    selectedOption,
    data,
    nbaLoading,
    nbaError,
    nbaData,
    nflLoading,
    nflError,
    nflData,
    nhlLoading,
    nhlError,
    nhlData,
    mlbLoading,
    mlbError,
    mlbData,
    user,
  ]);

  return (
    <div className="w-full items-center mt-2 h-22 flex flex-row h-24">
      <Dropdown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        DropdownOptions={dropdownOptions}
      />
      {data ? <GameCarousel gameData={data} /> : null}
    </div>
  );
};

export default GameBar;
