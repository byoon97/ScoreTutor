"use client";
import React from "react";
import { useTable, Column } from "react-table";

interface Data {
  awayTeam: string;
  homeTeam: string;
  result: string;
  unit: number;
  pick: string;
  net: number;
}

const columns: Column<Data>[] = [
  {
    Header: "Away Team",
    accessor: "awayTeam",
  },
  {
    Header: "Home Team",
    accessor: "homeTeam",
  },
  {
    Header: "Pick",
    accessor: "pick",
  },
  {
    Header: "Units Wagered",
    accessor: "unit",
  },
  {
    Header: "Result",
    accessor: "result",
  },
  {
    Header: "Return",
    accessor: "net",
  },
];

interface TableComponentProps {
  data: Data[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const tableInstance = useTable<Data>({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table
      {...getTableProps()}
      className="table-auto border-collapse border border-gray-400 w-full bg-white text-black"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="border border-gray-300 px-4 py-2"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
