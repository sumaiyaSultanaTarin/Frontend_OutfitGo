"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaChartLine, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import SalesTrends from "../components/SalesTrends";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalUnitsSold: 0 });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("/api/metrics");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-teal-600">
          Welcome, Sumaiya Sultana Train!
        </h1>

        {/* Metrics Section */}
        <div className="grid grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between">
            <h3 className="text-md font-semibold text-gray-500">Total Revenue</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-gray-800">
                ${metrics.totalRevenue}
              </span>
              <div className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">
                <FaDollarSign className="text-blue-600 w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">2.5% Up from last week</p>
          </div>

          {/* Total Orders */}
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between">
            <h3 className="text-md font-semibold text-gray-500">Total Orders</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-gray-800">10,293</span>
              <div className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-full">
                <FaShoppingCart className="text-green-600 w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">1.3% Up from last week</p>
          </div>

          {/* Total Units Sold */}
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between">
            <h3 className="text-md font-semibold text-gray-500">Total Units Sold</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-gray-800">
                {metrics.totalUnitsSold}
              </span>
              <div className="w-8 h-8 flex items-center justify-center bg-yellow-200 rounded-full">
                <FaBox className="text-yellow-600 w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">1.8% Up from last week</p>
          </div>

          {/* Sales Trends Card */}
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-gray-500">Revenue</h3>
              <button className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition">
                December
              </button>
            </div>
            <div className="w-full h-[150px]">
              <SalesTrends />
            </div>
          </div>
        </div>

        {/* Order Activity Table */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold text-gray-600 mb-4">Order Activity</h3>
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date - Time</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">T-Shirt</td>
                <td className="border px-4 py-2">01</td>
                <td className="border px-4 py-2">12.12.2024 - 12:53 PM</td>
                <td className="border px-4 py-2">$34,295</td>
                <td className="border px-4 py-2 text-green-600 font-bold">
                  Delivered
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Shoes</td>
                <td className="border px-4 py-2">02</td>
                <td className="border px-4 py-2">13.12.2024 - 11:15 AM</td>
                <td className="border px-4 py-2">$12,400</td>
                <td className="border px-4 py-2 text-yellow-600 font-bold">
                  Pending
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
