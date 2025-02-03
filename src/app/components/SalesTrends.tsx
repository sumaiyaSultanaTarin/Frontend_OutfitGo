"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  const [data, setData] = useState<SalesTrend[]>([
    {
      date: "2025-02-02",
      dailyRevenue: 10000.0,
    },
    {
      date: "2025-02-03",
      dailyRevenue: 15000.0,
    },
    {
        date: "2025-02-04",
        dailyRevenue: 12000.0,
    },
     {
        date: "2025-02-05",
        dailyRevenue: 9000.0,
    },
  ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
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
   
      <div style={{ width: "100%", height: "200px" }}> {/* Adjust height here */}
        <Line data={chartData} options={options} />
      </div>
  );
}
