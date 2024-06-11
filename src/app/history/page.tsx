/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TableComponent from "@/components/TableComponents/Table";
import MyChart from "@/components/profilePageComps/Chart";

const GET_PICKS_QUERY = gql`
  query GetPicks {
    getPicks {
      homeTeam
      awayTeam
      pick
      unit
      result
      net
    }
  }
`;

const TableContainer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PICKS_QUERY);
  const [table, setTable] = React.useState<string>("table");

  // Render the TableComponent with the fetched data
  return (
    <div className="bg-white p-2 xl:px-40">
      <h1 className="bg-white text-black text-center p-4 font-mono">
        Pick History
      </h1>
      <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div>
      <div className="%holder text-black text-sm flex flex-row justify-evenly border-[1px] border-black p-2 mb-2 shadow-lg">
        <div className="">
          <div>Net Units: </div>
          <div>Win Rate: </div>
          <div>ROI: </div>
        </div>
        <div className="border-r-[1px]"></div>
        <div>
          <div>This Week: </div>
          <div>This Month: </div>
          <div>Free Picks WR: </div>
        </div>
      </div>
      <div className="flex flex-row my-6 rounded-lg text-[10px] justify-center align-center font-thin h-6 w-full">
        <div
          onClick={() => setTable("table")}
          className={`flex items-center justify-center w-full h-full rounded-l-lg ${
            table === "table" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Spreadsheet
        </div>
        <div
          onClick={() => setTable("lineGraph")}
          className={`flex items-center justify-center w-full h-full border-x-[1px] border-white ${
            table === "lineGrasph" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Line Graph
        </div>
        <div
          onClick={() => setTable("barGraph")}
          className={`flex items-center justify-center w-full h-full rounded-r-lg ${
            table === "barGraph" ? "bg-[#3367AD]" : "bg-[#2C3140]"
          }`}
        >
          Bar Graph
        </div>
      </div>
      {!loading && table == "table" && <TableComponent data={data?.getPicks} />}
      {!loading && table == "lineGraph" && <MyChart />}
    </div>
  );
};

export default TableContainer;
