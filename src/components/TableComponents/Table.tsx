"use client";
import React, { useMemo, useState } from "react";
import {
  useTable,
  Column,
  useSortBy,
  TableInstance,
  HeaderGroup,
  CellProps,
} from "react-table";

interface Data {
  startTime: string;
  awayTeam: string;
  homeTeam: string;
  result: string;
  unit: number;
  pick: string;
  net: number;
}

const columns: Column<Data>[] = [
  {
    Header: "Date",
    accessor: "startTime",
    Cell: ({ value }: CellProps<Data>) => value.split(" ")[0], // Display only the date part
  },
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

// Function to sort the data based on the date part of startTime
const sortDataByDate = (data: Data[]): Data[] => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.startTime.split(" ")[0]);
    const dateB = new Date(b.startTime.split(" ")[0]);
    return dateA.getTime() - dateB.getTime();
  });
};

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.pick.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Sort the filtered data by date
  const sortedData = useMemo(
    () => sortDataByDate(filteredData),
    [filteredData]
  );

  const tableInstance = useTable<Data>(
    {
      columns,
      data: sortedData,
    },
    useSortBy
  ) as TableInstance<Data>;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Pick"
        className="mb-4 p-2 border-[1px] border-black text-black"
      />
      <table
        {...getTableProps()}
        className="table-auto border-collapse border border-gray-400 w-full bg-white text-black"
      >
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Data>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => {
                const columnInstance = column as any; // Cast to any to access sorting props
                return (
                  <th
                    {...columnInstance.getHeaderProps(
                      columnInstance.getSortByToggleProps()
                    )}
                    key={columnInstance.id}
                    className="border border-gray-300 px-4 py-2 text-sm"
                  >
                    {columnInstance.render("Header")}
                    {/* Add a sort indicator */}
                    <span>
                      {columnInstance.isSorted
                        ? columnInstance.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                );
              })}
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
                    className="border border-gray-300 px-4 py-2 text-sm"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

