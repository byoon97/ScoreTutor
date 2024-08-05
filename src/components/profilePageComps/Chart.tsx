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
  calculateROI,
  getLabelsForYTD,
  getDataForYTD,
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
  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let weekROI: string;
  let monthROI: string;
  let yearROI: string;
  let netWeek: string;
  let netMonth: string;
  let netYear: string;
  let weekProfit: string | number | bigint;
  let monthProfit: string | number | bigint;
  let yearProfit: string | number | bigint;
  let YTDROI: string;
  let recentData = getDataForMostRecent(units);
  let monthlyData = getDataForCurrentMonth(units);
  let yearlyData = getDataForCurrentYear(units);
  if (user) {
    weekProfit = user.unitSize * recentData[recentData.length - 1];
    monthProfit = user.unitSize * monthlyData[monthlyData.length - 1];
    yearProfit = user.unitSize * yearlyData[yearlyData.length - 1];
    const bankroll = user.bankroll;

    weekROI = calculateROI(bankroll, weekProfit).toFixed(2);
    monthROI = calculateROI(bankroll, monthProfit).toFixed(2);
    yearROI = calculateROI(bankroll, yearProfit).toFixed(2);

    netWeek = formatter.format(weekProfit);
    netMonth = formatter.format(monthProfit);
    netYear = formatter.format(yearProfit);
  } else {
    weekProfit = recentData[recentData.length - 1];
    monthProfit = monthlyData[monthlyData.length - 1];
    yearProfit = Number(yearlyData[yearlyData.length - 1]).toFixed(2);
    netYear = netUnits?.getUnitCount[0].netUnits;
    console.log(yearProfit);

    weekROI = calculateROI(100, weekProfit).toFixed(2);
    monthROI = calculateROI(100, monthProfit).toFixed(2);
    yearROI = calculateROI(100, Number(yearProfit)).toFixed(2);
    YTDROI = calculateROI(100, Number(totalUnits)).toFixed(2);
  }

  const getProfitAndROIText = () => {
    console.log("Profits and ROIs:", {
      weekProfit,
      monthProfit,
      yearProfit,
      weekROI,
      monthROI,
      yearROI,
      YTDROI,
    });
    if (user == undefined) {
      switch (labelType) {
        case "mostRecent":
          console.log(weekProfit);
          return `${weekProfit} Units (${weekROI}%)`;
        case "currentMonth":
          return `${monthProfit} Units (${monthROI}%)`;
        case "currentYear":
          return `${yearProfit} Units (${yearROI}%)`;
        case "YTD":
          return `${netYear} Units (${YTDROI}%)`;
        default:
          return "";
      }
    } else {
      switch (labelType) {
        case "mostRecent":
          return `${netWeek} - (${weekROI}%)`;
        case "currentMonth":
          return `${netMonth} - (${monthROI}%)`;
        case "currentYear":
          return `${netYear} - (${yearROI}%)`;
        default:
          return "";
      }
    }
  };

  const profitAndROIText = getProfitAndROIText();

  const getLabels = () => {
    const dataSource = transformedUnits.length ? transformedUnits : units;
    switch (labelType) {
      case "mostRecent":
        return getLabelsForMostRecent(dataSource);
      case "currentMonth":
        return getLabelsForCurrentMonth();
      case "currentYear":
        return getLabelsForCurrentYear();
      case "YTD":
        return getLabelsForYTD(dataSource);
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
      case "YTD":
        return getDataForYTD(dataSource);
      default:
        return [];
    }
  };

  useEffect(() => {
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

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
        gradient.addColorStop(0, "rgba(75, 192, 192, 0.5)");
        gradient.addColorStop(1, "rgba(75, 192, 192, 0)");

        const config: ChartConfiguration = {
          type: "line",
          data: {
            labels: getLabels(),
            datasets: [
              {
                label: user ? "USD " : "Units",
                data: getData(),
                backgroundColor: gradient,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                fill: true, // Ensure the area below the line is filled
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
  }, [labelType, units, transformedUnits, getLabels, getData, user]);

  return (
    <div className="mb-2 bg-[#1D3041] rounded-lg shadow-lg border-[1px] border-gray-500">
      <div className="flex flex-row justify-between text-gray-200 pt-4 px-6">
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
              ) + " USD"}{" "}
            {user == undefined && totalUnits + " Units"}
          </div>

          <div className="text-gray-300 font-thin text-[15px] w-full">
            {profitAndROIText && <div>{profitAndROIText}</div>}
          </div>
        </div>

        <div className="flex flex-row h-full text-gray-200">
          <button
            onClick={() => setLabelType("mostRecent")}
            className={`mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] border-gray-500 ${
              labelType == "mostRecent" && "bg-[#3367AD]"
            }`}
          >
            1W
          </button>
          <button
            onClick={() => setLabelType("currentMonth")}
            className={`mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] border-gray-500 ${
              labelType == "currentMonth" && "bg-[#3367AD]"
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setLabelType("currentYear")}
            className={`mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] border-gray-500 ${
              labelType == "currentYear" && "bg-[#3367AD]"
            }`}
          >
            1Y
          </button>
          <button
            onClick={() => setLabelType("YTD")}
            className={`mr-2 px-4 py-2 font-sans text-xs rounded-lg border-[1px] border-gray-500 ${
              labelType == "YTD" && "bg-[#3367AD]"
            }`}
          >
            YTD
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

