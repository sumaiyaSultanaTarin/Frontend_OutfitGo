"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaChartLine, FaBox, FaShoppingCart, FaDollarSign, FaStar } from "react-icons/fa";
import SalesTrends from "../components/SalesTrends";
import { getBestSellingProducts, getSalesMetrics } from "../utils/performance";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalUnitsSold: 0 });
  const [bestSellingProducts, setBestSellingProducts] = useState<{ name: string; revenue: number }[]>([]);


  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getSalesMetrics();
        setMetrics(data);
      } catch (error) {
        toast.error("Error fetching metrics:");
      }
    }

    async function fetchBestSellingProducts() {
      try {
        const data = await getBestSellingProducts(5);
        setBestSellingProducts(data);
      } catch (error) {
        toast.error("Error fetching best-selling products:");
      }
    }

    fetchMetrics();
    fetchBestSellingProducts();
  }, []);
 

  return (
    <Layout>
     <motion.div className="space-y-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1 , y:0}} transition={{ duration: 0.5 }}>
        <h1 className="text 3xl font-bold text-teal-600">Welcome, Sumaiya Sultana Train!</h1>

        <motion.div className="grid grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          {[{
            title: "Total Revenue", value: `$${metrics.totalRevenue}`, icon: FaDollarSign, color: "blue"
          }, {
            title: "Total Orders", value: "10,293", icon: FaShoppingCart, color: "green"
          }, {
            title: "Total Units Sold", value: metrics.totalUnitsSold, icon: FaBox, color: "yellow"
          }, {
            title: "Best Selling Product", value: bestSellingProducts[0]?.name || "N/A", icon: FaStar, color: "purple"
          }].map(({ title, value, icon: Icon, color }, index) => (
            <motion.div
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-md font-semibold text-gray-500">{title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-bold text-gray-800">{value}</span>
                <div className={`w-10 h-10 flex items-center justify-center bg-${color}-200 rounded-full`}>
                  <Icon className={`text-${color}-600 w-6 h-6`} />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">Up from last week</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sales Trends Card */}
        <motion.div className="p-4 bg-white shadow-lg rounded-lg flex flex-col" whileHover={{ scale: 1.02 }}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold text-gray-500">Revenue</h3>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition">
              February
            </button>
          </div>
          <div className="w-full h-[150px]">
            <SalesTrends />
          </div>
        </motion.div>

        {/* Order Activity Table */}
        <motion.div className="p-6 bg-white shadow-lg rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-bold text-gray-600 mb-4">Order Activity</h3>
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date - Time</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[{
                product: "T-Shirt", orderId: "01", date: "12.12.2024 - 12:53 PM", amount: "$34,295", status: "Delivered", color: "green"
              }, {
                product: "Shoes", orderId: "02", date: "13.12.2024 - 11:15 AM", amount: "$12,400", status: "Pending", color: "yellow"
              }].map(({ product, orderId, date, amount, status, color }, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{product}</td>
                  <td className="border px-4 py-2">{orderId}</td>
                  <td className="border px-4 py-2">{date}</td>
                  <td className="border px-4 py-2">{amount}</td>
                  <td className={`border px-4 py-2 text-${color}-600 font-bold`}>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
