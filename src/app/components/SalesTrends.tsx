"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // For the X-axis
  LinearScale,   // For the Y-axis
  PointElement,  // For points on the line
  LineElement,   // For the line itself
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesTrends() {
  interface SalesTrend {
    date: string;
    dailyRevenue: number;
  }

  const [data, setData] = useState(
    [
        {
            "date": "2025-02-02",
            "dailyRevenue": "10000.00"
        }
    ]);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Sales Trends (Daily Revenue)",
          },
        },
      };

  const chartData = {
    labels: data.map((d) => d?.date), 
    datasets: [
      {
        label: "Revenue",
        data: data.map((d) => d?.dailyRevenue || 0),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold text-gray-600">Sales Trends</h3>
      <Line data={chartData} options={options}/>
    </div>
  );
}
