/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TableComponent from "@/components/TableComponents/Table";
import MyChart from "@/components/profilePageComps/Chart";
import { calculateWinPercentage } from "@/util/historyUtil";
import Calendar from "@/components/historyComponents/Calendar";

const GET_PICKS_QUERY = gql`
  query GetPicks {
    getPicks {
      startTime
      homeTeam
      awayTeam
      pick
      unit
      result
      net
    }
  }
`;

const GET_DAILY_UNITS = gql`
  query GetDailyUnits {
    getDailyUnits {
      date
      netUnits
    }
  }
`;

const GET_TOTAL_UNITS = gql`
  query GetUnitCount {
    getUnitCount {
      netUnits
    }
  }
`;

const TableContainer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PICKS_QUERY);
  const {
    loading: unitLoad,
    error: unitErr,
    data: units,
  } = useQuery(GET_DAILY_UNITS);
  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);

  const [table, setTable] = React.useState<string>("table");

  // useEffect(() => {
  //   !totalLoad && console.log(netUnits);
  // }, [totalLoad]);

  // Render the TableComponent with the fetched data
  return (
    <div className="bg-white p-2 xl:px-40">
      <h1 className="bg-white text-black text-center p-4 font-mono">
        Pick History
      </h1>
      <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div>
      <div className="%holder text-black text-sm flex flex-row justify-evenly border-[1px] border-black p-2 mb-2 shadow-lg">
        <div className="">
          <div>
            Net Units:{" "}
            {!totalLoad && netUnits.getUnitCount[0].netUnits.toFixed(2)}
          </div>
          <div>
            Win Rate: {!loading && calculateWinPercentage(data.getPicks)}
          </div>
          <div>
            ROI:{" "}
            {!totalLoad &&
              ((netUnits.getUnitCount[0].netUnits / 50) * 100).toFixed(2)}
            %
          </div>
        </div>
        <div className="border-r-[1px]"></div>
        {/* create util function for week and month */}
        <div>
          <div>This Week: </div>
          <div>This Month: </div>
        </div>
      </div>
      <div className="flex flex-row my-6 rounded-lg text-[10px] justify-center align-center font-thin h-6 w-full">
        <div
          onClick={() => setTable("table")}
          className={`flex items-center justify-center w-full h-full rounded-l-lg cursor-pointer ${
            table === "table" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Pick History
        </div>
        <div
          onClick={() => setTable("lineGraph")}
          className={`cursor-pointer flex items-center justify-center w-full h-full border-r-[1px] border-gray-200 ${
            table === "lineGraph" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Unit History
        </div>
        <div
          onClick={() => setTable("calendar")}
          className={`cursor-pointer flex items-center justify-center w-full h-full rounded-r-lg ${
            table === "calendar" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Calendar
        </div>
      </div>
      {!loading && table == "table" && <TableComponent data={data?.getPicks} />}
      {table == "lineGraph" && !unitLoad && (
        <MyChart
          units={units.getDailyUnits}
          user={null}
          totalUnits={netUnits.getUnitCount[0].netUnits}
        />
      )}
      {!unitLoad && table === "calendar" && (
        <Calendar dailyUnits={units.getDailyUnits} user={null} />
      )}
    </div>
  );
};

export default TableContainer;
