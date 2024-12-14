import {
  Dot,
  ChevronRight,
  Ellipsis,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Box,
  Car,
} from "lucide-react";
import { Button } from "@mui/material";
import { transactionData } from "../constants";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

// Register required components for Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);
const BarChart = () => {
  // Data for the chart
  const data = {
    labels: ["Group 1", "Group 2", "Group 3", "Group 4"], // Labels for the groups
    datasets: [
      {
        label: "Dataset 1",
        data: [50, 70, 90, 60],
        backgroundColor: "#022213", // Dark green color
        barThickness: 10, // Small bar width
      },
      {
        label: "Dataset 2",
        data: [80, 40, 70, 100],
        backgroundColor: "#ADDE33", // Lime green color
        barThickness: 10,
      },
    ],
  };

  // Options for customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis labels and gridlines
        grouped: true, // Enable grouping for side-by-side bars
      },
      y: {
        display: false, // Hide y-axis labels and gridlines
      },
    },
  };

  return (
    <div className="w-96 mx-auto p-4 bg-gray-100 rounded-md shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

function LeftOverview() {
  return (
    <div className="border-2 p-4 rounded-lg">
      {/* upper section */}
      <div>
        <div className="flex items-center justify-between gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold ">Overview</h1>
            <p className="text-sm text-black/80">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </div>
          <div>calendar</div>
        </div>

        <div className="flex items-center justify-between gap-5 mt-5">
          <div className="flex flex-col items-start justify-between gap-2 bg-[#022213] p-5 rounded-2xl text-wrap w-[33%]">
            <div className="flex items-center justify-center">
              <Dot className="text-red-500" />
              <h1 className="text-xl font-semibold text-white">update</h1>
            </div>

            <div>
              <p className="text-white/30">From Feb 9</p>
              <p className="text-xl font- text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </p>
            </div>

            <Button
              variant="text"
              sx={{
                color: "#bfbaba", // Text color
                fontSize: "16px", // Font size
                textTransform: "capitalize", // Avoid all-uppercase text
                display: "flex", // Align content
                alignItems: "center",
                gap: "4px", // Add spacing between text and icon
                "&:hover": {
                  color: "#fff", // Slightly darker color on hover
                },
              }}
            >
              See Statistics{" "}
              <span>
                <ChevronRight />
              </span>
            </Button>
          </div>

          <div className="flex flex-col items-start justify-between gap-2  p-5 rounded-2xl text-wrap w-[33%] h-48 border-2 ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-black/80">Net Income</h1>
              <div>
                <Ellipsis />
              </div>
            </div>
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute -top-2 -left-2">
                <DollarSign />
              </div>
              <p className="font-semibold text-3xl pl-3">199,000</p>
            </div>
            <div>
              <p className="flex gap-1">
                {" "}
                <span className="text-[#3eff34] font-medium flex">
                  <TrendingUp />
                  +35%
                </span>{" "}
                from last month
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-2  p-5 rounded-2xl text-wrap w-[33%] h-48 border-2 ">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-black/80">Total Return</h1>
              <div>
                <Ellipsis />
              </div>
            </div>
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute -top-2 -left-2">
                <DollarSign />
              </div>
              <p className="font-semibold text-3xl pl-3">35,000</p>
            </div>
            <div>
              <p className="flex gap-1">
                {" "}
                <span className="text-red-500 font-medium flex">
                  <TrendingDown />
                  -20%
                </span>{" "}
                from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* lower section */}
      <div className="flex justify-between mt-5 gap-5">
        <div className="flex flex-col w-[50%] border-2 p-4 rounded-lg">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-semibold text-lg">Transaction</h1>
            <Ellipsis />
          </div>

          <div className="mt-2">
            {transactionData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 mt-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#022213] font-medium flex bg-black/10 rounded-full p-1 text-center">
                    <Car />
                  </span>
                  <div className=" flex flex-col">
                    <p className="font-medium ">{item.name}</p>
                    <p className="text-black/60">{item.date}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p
                    className={`flex gap-1 ${
                      item.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </p>
                  <p>{item.plate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-[50%] border-2 p-4 rounded-lg gap-10">
          <div className="flex items-center justify-between pl-3 pr-3">
            <h1 className="text-xl font-semibold">Revenue</h1>

            <div className="flex gap-2">
              <p className="text-black/60 flex gap-1">
                <span className="text-[#022213] font-medium flex">
                  <Box />
                </span>
                Income
              </p>
              <p className="text-black/60 flex gap-1">
                <span className="text-[#adde33] font-medium flex">
                  <Box />
                </span>
                Expenses
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex">
              <div>
                <p className="font-semibold text-3xl pl-3">$199,000</p>
              </div>
              <p className="flex gap-1 items-end">
                {" "}
                <span className="text-[#3eff34] font-medium flex">
                  <TrendingUp />
                  +35%
                </span>{" "}
                from last month
              </p>
            </div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftOverview;
