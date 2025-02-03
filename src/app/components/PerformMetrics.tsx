"use client";
import { useEffect, useState } from "react";
import { getSalesMetrics } from "../utils/performance";
import { FaChartLine } from "react-icons/fa";

export default function PerformenceMetrics() {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalUnitsSold: 0 });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getSalesMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
      <h3 className="text-lg font-bold text-gray-600">Total Revenue</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-800">${metrics.totalRevenue}</span>
        <div className="p-3 bg-blue-200 rounded-full">
          <FaChartLine className="text-blue-600 text-xl" />
        </div>
      </div>
      <p className="text-sm text-green-600 mt-4">1.5% Up from last week</p>
    </div>
  );
}
