import { FC, useRef, useEffect } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

const MyChart: FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext("2d");

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
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                label: "Units",
                data: [12, 19, 3, 5, 2, 3],
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
                text: "Your Bankroll",
              },
            },
            scales: {
              y: {
                max: 20,
                min: -10,
                ticks: {
                  stepSize: 2,
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
  }, []);

  return (
    <div className="relative sm:h-[500px] h-[500px]">
      <canvas
        ref={chartRef}
        className="bg-white shadow-lg rounded-lg w-full h-full"
      />
    </div>
  );
};

export default MyChart;
