import { Button } from "@mui/material";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Custom plugin to add numbers on each doughnut segment
const customDoughnutLabel = {
  id: "customDoughnutLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;

    chart.data.datasets[0].data.forEach((value, index) => {
      const meta = chart.getDatasetMeta(0).data[index];
      const midAngle = (meta.startAngle + meta.endAngle) / 2;
      const radius =
        chart.innerRadius + (chart.outerRadius - chart.innerRadius) / 2;

      const x = meta.x + Math.cos(midAngle) * radius;
      const y = meta.y + Math.sin(midAngle) * radius;

      ctx.save();
      ctx.fillStyle = "#fff"; // Text color
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value, x, y); // Draw the text
      ctx.restore();
    });
  },
};

const CircularChart = () => {
  // Data for the chart
  const data = {
    labels: ["Green", "Yellow", "Black"],
    datasets: [
      {
        label: "Dataset 1",
        data: [40, 35, 25], // Data values
        backgroundColor: ["#022213", "#ADDE33", "#000000"], // Segment colors
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    cutout: "60%", // Inner cutout percentage for the doughnut
  };

  return (
    <div className="w-72 mx-auto p-4 bg-gray-100 rounded-md shadow-lg">
      <Doughnut data={data} options={options} plugins={[customDoughnutLabel]} />
    </div>
  );
};

function RightOverview() {
  return (
    <div className="border-2 p-4 rounded-lg">
      <div className="flex flex-col items-center justify-between">
        <h1 className="font-medium text-xl">Total View Performance</h1>

        <div className="mt-5">
          <CircularChart />
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex items-center gap-1">
            <span className="bg-[#103524] w-3 h-3" />
            <p className="text-sm">Requests</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-[#adde33] w-3 h-3" />
            <p className="text-sm">Completed</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-black w-3 h-3" />
            <p className="text-sm">Percentage</p>
          </div>
        </div>

        <p className="text-black/40 font-medium text-wrap w-[80%] text-center mt-5 mb-5">
          here are some tips on how to improve your score
        </p>

        <Button
          variant="outlined"
          sx={{
            borderColor: "#022213",
            color: "#022213",
            "&:hover": {
              borderColor: "#022213",
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Guide Views
        </Button>
      </div>

      <div></div>
    </div>
  );
}

export default RightOverview;
