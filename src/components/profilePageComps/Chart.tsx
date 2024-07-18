"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { UserProps } from "@/types";
import {
  getLabelsForMostRecent,
  getLabelsForCurrentMonth,
  getLabelsForCurrentYear,
  getDataForMostRecent,
  getDataForCurrentMonth,
  getDataForCurrentYear,
  UnitData,
} from "../../util/chartUtil"; // Adjust the import path as necessary
import { gql, useQuery } from "@apollo/client";

type ChartProps = {
  units: UnitData[];
  user: UserProps | null;
  totalUnits: number | null;
};

const GET_TOTAL_UNITS = gql`
  query GetUnitCount {
    getUnitCount {
      netUnits
    }
  }
`;

const LabelBtn =
  "text-black mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px]";

const MyChart: React.FC<ChartProps> = ({ units, user, totalUnits }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [labelType, setLabelType] = useState("mostRecent");
  const [transformedUnits, setTransformedUnits] = useState<UnitData[]>(() =>
    user
      ? units.map((unit) => ({
          ...unit,
          netUnits: unit.netUnits * user.unitSize,
        }))
      : units
  );

  let weekROI;
  let monthROI;
  let yearROI;
  let netWeek;
  let netMonth;
  let netYear;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (user) {
    weekROI = (
      ((user?.unitSize *
        Number(getDataForMostRecent(units)[units.length - 1])) /
        user?.bankroll) *
      100
    ).toFixed(2);

    monthROI = (
      ((user?.unitSize *
        Number(getDataForCurrentMonth(units)[units.length - 1])) /
        user?.bankroll) *
      100
    ).toFixed(2);

    yearROI = (
      ((user?.unitSize *
        Number(getDataForCurrentYear(units)[units.length - 1])) /
        user?.bankroll) *
      100
    ).toFixed(2);

    netWeek = formatter.format(
      user?.unitSize * Number(getDataForMostRecent(units)[units.length - 1])
    );
    netMonth = formatter.format(
      user?.unitSize * Number(getDataForCurrentMonth(units)[units.length - 1])
    );
    netYear = formatter.format(
      user?.unitSize * Number(getDataForCurrentYear(units)[units.length - 1])
    );
  }

  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);

  const getLabels = () => {
    const dataSource = transformedUnits.length ? transformedUnits : units;
    switch (labelType) {
      case "mostRecent":
        return getLabelsForMostRecent(dataSource);
      case "currentMonth":
        return getLabelsForCurrentMonth();
      case "currentYear":
        return getLabelsForCurrentYear();
      default:
        return [];
    }
  };

  const getData = () => {
    const dataSource = transformedUnits.length ? transformedUnits : units;
    switch (labelType) {
      case "mostRecent":
        return getDataForMostRecent(dataSource);
      case "currentMonth":
        return getDataForCurrentMonth(dataSource);
      case "currentYear":
        return getDataForCurrentYear(dataSource);
      default:
        return [];
    }
  };

  useEffect(() => {
    console.log(getDataForMostRecent(units));
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext("2d");
      const dataSource = transformedUnits.length ? transformedUnits : units;
      if (ctx) {
        // Register all necessary components
        Chart.register(...registerables);
        const screenWidth = window.innerWidth;
        const maxTicksLimit = screenWidth < 640 ? 16 : 10;

        // Adjust canvas resolution for high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.scale(dpr, dpr);

        const config: ChartConfiguration = {
          type: "line",
          data: {
            labels: getLabels(),
            datasets: [
              {
                label: user ? "USD " : "Units",
                data: getData(),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            layout: {
              padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20,
              },
            },
            responsive: true,
            maintainAspectRatio: false, // Set to false to manually control height
            scales: {
              y: {
                grid: {
                  display: false,
                },
                max: user
                  ? Math.round((user?.bankroll * 2.5) / 1000) * 1000 - 1000
                  : totalUnits !== null
                  ? Math.round((totalUnits * 2) / 10) * 10
                  : 50,
                min: 0,
                ticks: {
                  stepSize: user ? user?.unitSize * 5 : 5,
                  autoSkip: true,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          },
        };

        // If there's an existing chart instance, destroy it before creating a new one
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create new Chart instance and save it to the ref
        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labelType, units]);

  return (
    <div className="mb-2">
      <div className="flex flex-row justify-between text-black pt-4 px-6">
        <div className="flex flex-col">
          <div className="font-bold text-[20px]">
            {user &&
              !totalLoad &&
              formatter.format(
                user?.unitSize *
                  units.reduce(
                    (partialSum, unit) => partialSum + unit.netUnits,
                    0
                  )
              )}{" "}
            USD
          </div>
          <div className="text-gray-500 font-thin text-[15px]">
            {user && labelType === "mostRecent" && (
              <div>
                {typeof netWeek !== "number"
                  ? 0 + "USD"
                  : netWeek + "USD" + weekROI + "%"}
              </div>
            )}

            {user && labelType === "currentMonth" && (
              <div>
                {typeof netMonth !== "number"
                  ? 0 + "USD"
                  : netMonth + "USD" + monthROI + "%"}
              </div>
            )}

            {user && labelType === "currentYear" && (
              <div>
                {typeof netYear !== "number"
                  ? 0 + "USD"
                  : netYear + "USD" + yearROI + "%"}
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => setLabelType("mostRecent")}
            className={`text-black mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] ${
              labelType == "mostRecent" && "bg-[#DCF2F2]"
            }`}
          >
            1W
          </button>
          <button
            onClick={() => setLabelType("currentMonth")}
            className={`text-black mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] ${
              labelType == "currentMonth" && "bg-[#DCF2F2]"
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setLabelType("currentYear")}
            className={`text-black mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] ${
              labelType == "currentYear" && "bg-[#DCF2F2]"
            }`}
          >
            1Y
          </button>
        </div>
      </div>
      <div className="relative sm:h-[500px] h-[500px]">
        <canvas ref={chartRef} className=" w-full h-full font-sans" />
      </div>
    </div>
  );
};

export default MyChart;

