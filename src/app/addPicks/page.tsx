/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { convertToEST, extractDateTime } from "@/functions/getDate";
import Lines from "@/components/addPicksComponents/Lines";

const header =
  "border-[1px] border-[#4C4C4C] rounded-lg text-[12px] w-1/2 text-center mx-2";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

type Sports = "NBA" | "MLB" | "NHL" | "NFL";

const Form: React.FC = () => {
  const [selectedSport, setSelectedSport] = React.useState<Sports | null>(
    "MLB"
  );
  const [data, setData] = React.useState<any>();
  const [betSlip, setBetSlip] = React.useState([]);

  const {
    data: nbaData,
    error: nbaError,
    isLoading: nbaLoading,
  } = useSWR("/api/NBA", fetcher);

  // const {
  //   data: nflData,
  //   error: nflError,
  //   isLoading: nflLoading,
  // } = useSWR("/api/NFL", fetcher);

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
    if (selectedSport === "NBA") {
      if (nbaLoading) console.log("...loading nba games");
      else if (nbaError) console.error(nbaError);
      else setData(nbaData);
    }

    // if (selectedSport === "NFL") {
    //   if (nflLoading) console.log("...loading nfl games");
    //   else if (nflError) console.error(nflError);
    //   else setData(nflData);
    // }

    if (selectedSport === "NHL") {
      if (nhlLoading) console.log("...loading nhl games");
      else if (nhlError) console.error(nhlError);
      else setData(nhlData);
    }

    if (selectedSport === "MLB") {
      if (mlbLoading) console.log("...loading mlb games");
      else if (mlbError) console.error(mlbError);
      else setData(mlbData);
    }

    console.log(data);
  }, [
    selectedSport,
    data,
    nbaLoading,
    nbaError,
    nbaData,
    // nflLoading,
    // nflError,
    // nflData,
    nhlLoading,
    nhlError,
    nhlData,
    mlbLoading,
    mlbError,
    mlbData,
  ]);

  return (
    <div>
      <h1 className="text-center my-2">Add Picks</h1>
      {/* select league */}
      <div className="flex flex-row justify-evenly m-4">
        <div className={header} onClick={() => setSelectedSport("NBA")}>
          NBA
        </div>
        <div className={header} onClick={() => setSelectedSport("MLB")}>
          MLB
        </div>
        <div className={header} onClick={() => setSelectedSport("NFL")}>
          NFL
        </div>
        <div className={header} onClick={() => setSelectedSport("NHL")}>
          NHL
        </div>
      </div>

      {/* games container */}
      <div className="h-full">
        <div className="flex flex-col w-full table-fixed border-separate border-spacing-0 p-2 bg-[#121212]">
          {/* games header */}
          <div className="flex justify-around cursor-default text-[#c5c5c5] text-xs font-semibold text-center">
            <p className="w-full">TODAY</p>
            <p className="w-full">SPREAD</p>
            <p className="w-full">TOTAL</p>
            <p className="w-full">MONEYLINE</p>
          </div>
          {/* actual games */}
          {data &&
            data.map((event: any, idx: number) => {
              let time = event.schedule.event_name;
              time = extractDateTime(time);
              time = convertToEST(time);
              return <Lines key={idx} time={time} event={event} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Form;
