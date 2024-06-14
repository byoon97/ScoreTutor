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

type ChartProps = {
  units: UnitData[];
  user: UserProps | null;
};

const LabelBtn =
  "text-black mr-2 p-2 bg-[#DCF2F2] font-mono text-xs rounded-sm shadow-lg";

const MyChart: React.FC<ChartProps> = ({ units, user }) => {
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
                label: user ? "$" : "Units",
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
            plugins: {
              title: {
                display: true,
                text: "Bankroll",
              },
            },
            scales: {
              y: {
                max: user ? Math.round((user?.bankroll * 2) / 1000) * 1000 : 20,
                min: user ? -500 : -20,
                ticks: {
                  stepSize: user ? user?.unitSize * 2.5 : 2,
                  autoSkip: false,
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
    <div>
      <div className="mb-4 m-4">
        <button onClick={() => setLabelType("mostRecent")} className={LabelBtn}>
          1W
        </button>
        <button
          onClick={() => setLabelType("currentMonth")}
          className={LabelBtn}
        >
          1M
        </button>
        <button
          onClick={() => setLabelType("currentYear")}
          className={LabelBtn}
        >
          1Y
        </button>
      </div>
      <div className="relative sm:h-[500px] h-[500px]">
        <canvas
          ref={chartRef}
          className="bg-white shadow-lg rounded-lg w-full h-full"
        />
      </div>
    </div>
  );
};

export default MyChart;
