/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect } from "react";
import { useTable, Column } from "react-table";
import { gql, useQuery } from "@apollo/client";
import TableComponent from "@/components/TableComponents/Table";

interface Data {
  awayTeam: string;
  homeTeam: string;
  result: string;
  unit: number;
  pick: string;
  net: number;
}

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

  // Render the TableComponent with the fetched data
  return !loading && <TableComponent data={data?.getPicks} />;
};

export default TableContainer;
