"use client";
import React, { useMemo, useState } from "react";
import {
  useTable,
  Column,
  useSortBy,
  TableInstance,
  HeaderGroup,
  CellProps,
  usePagination,
  TableState,
  UsePaginationInstanceProps,
  UsePaginationState,
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
      data: sortedData.reverse(),
      initialState: { pageSize: 10 } as Partial<TableState<Data>>, // Correctly set the initial page size
    },
    useSortBy,
    usePagination
  ) as TableInstance<Data> &
    UsePaginationInstanceProps<Data> & { state: UsePaginationState<Data> };

  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <div className="text-black">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Pick"
        className="mb-4 p-2 border-[1px] border-black text-black font-sans text-sm"
      />
      <span className="text-xs font-sans mx-6">
        Click the Table Headers to Sort
      </span>
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
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <div className="pagination p-3 font-sans text-xs items-center justify-center">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

