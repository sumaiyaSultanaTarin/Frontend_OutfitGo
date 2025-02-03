"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaChartLine, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { getSalesMetrics } from "../utils/performance";

export default function Dashboard() {
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
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-teal-600">
          Welcome, Sumaiya Sultana Train!
        </h1>

        {/* Metrics Section */}
        <div className="grid grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div
            className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow"
            style={{ width: "262px", height: "161px" }}
          >
            <h3 className="text-lg font-bold text-gray-500">Total Revenue</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">
                ${metrics.totalRevenue}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full">
                <FaDollarSign className="text-blue-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">2.5% Up from last week</p>
          </div>

          {/* Total Orders */}
          <div
            className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow"
            style={{ width: "262px", height: "161px" }}
          >
            <h3 className="text-lg font-bold text-gray-500">Total Orders</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">10,293</span>
              <div className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-full">
                <FaShoppingCart className="text-green-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">1.3% Up from last week</p>
          </div>

          {/* Total Units Sold */}
          <div
            className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow"
            style={{ width: "262px", height: "161px" }}
          >
            <h3 className="text-lg font-bold text-gray-500">Total Units Sold</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">
                {metrics.totalUnitsSold}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-200 rounded-full">
                <FaBox className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">1.8% Up from last week</p>
          </div>

          {/* Monthly Revenue */}
          <div
            className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow"
            style={{ width: "262px", height: "161px" }}
          >
            <h3 className="text-lg font-bold text-gray-500">Monthly Revenue</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">$200,0</span>
              <div className="w-10 h-10 flex items-center justify-center bg-red-200 rounded-full">
                <FaChartLine className="text-red-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-4">3% Down from previous</p>
          </div>
        </div>

        {/* Sales Trends Section */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold text-gray-600 mb-4">Sales Trends</h3>
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
