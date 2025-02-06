"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFileCsv, FaFilePdf, FaBox, FaWarehouse, FaExclamationTriangle, FaCartPlus } from "react-icons/fa";
import api from "@/app/utils/axios";
import Layout from "@/app/components/Layout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function InventoryDashboard() {
    interface StockActivity {
        id: number;
        type: "inbound" | "outbound";
        quantity: number;
        notes?: string;
        createdAt: string;
        product: {
          id: number;
        };
      }
      
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalStockValue: 0,
    lowStockItems: 0,
  });
  const [stockActivity, setStockActivity] = useState<StockActivity[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const metricsResponse = await api.get("/inventory/metrics");
      setMetrics(metricsResponse.data);

      const stockResponse = await api.get("/inventory/stock-movements?limit=5"); // Fetch recent 5 entries
      setStockActivity(stockResponse.data.map((activity :any) => ({
        id: activity.id,
        type: activity.type,
        quantity: activity.quantity,
        notes: activity.notes || "N/A",
        createdAt: activity.createdAt,
        product: { id: activity.product?.id || null }
      })));
    } catch (error) {
      toast.error("Error fetching dashboard data:");
    }
  };

  const exportCSV = async () => {
    try {
      const response = await api.get("/inventory/export/csv", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory-report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error downloading CSV file:");
    }
  };
  
  const exportPDF = async () => {
    try {
      const response = await api.get("/inventory/export/pdf", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory-report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
       toast.error("Error downloading PDF file:");
    }
  };
  

  const handleRowClick = (productId : number | null) => {
    router.push(`/inventory/stockActivity?productId=${productId}`);
  };

  const handleRestockClick = () => {
    router.push("/inventory/restock");
  };

  return (
    <Layout>
      <motion.div className="p-6 bg-gray-50 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      >
      <motion.div className="flex justify-between items-center mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-teal-500 mb-4">
          Welcome to Inventory 
        </h2>
        {/* Restock Button */}
        
        <button
            onClick={handleRestockClick}
            className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
            <FaCartPlus className="w-5 h-5" />
            Restock
        </button>
        </motion.div>

        {/* Metrics Section */}
        <motion.div className="grid grid-cols-4 gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        >
          {/* Total Products */}
          <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-500">Total Products</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">
                {metrics.totalProducts}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-200 rounded-full">
                <FaBox className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">1.3% Up from past week</p>
          </div>

          {/* Total Stocks */}
          <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-500">Total Stocks Value</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">
                {metrics.totalStockValue}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-full">
                <FaWarehouse className="text-green-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-4">4.3% Down from yesterday</p>
          </div>

          {/* Low Stock Items */}
          <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-500">Low Stock Items</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">
                {metrics.lowStockItems}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-red-200 rounded-full">
                <FaExclamationTriangle className="text-red-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">1.8% Up from yesterday</p>
          </div>

          {/* Download Options */}
          <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-2xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-500">Download Files</h3>
            <div className="flex gap-4 mt-">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaFileCsv className="w-5 h-5" />
                CSV
              </button>
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaFilePdf className="w-5 h-5" />
                PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stock Activity Table */}
      
         <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Stock Activity
        </h3>
        <div className="overflow-x-auto border border-gray-300 shadow-md rounded-lg">
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-4 border">Product ID</th>
                <th className="p-4 border">Type</th>
                <th className="p-4 border">Quantity</th>
                <th className="p-4 border">Notes</th>
                <th className="p-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {stockActivity.map((activity, index) => (
                <motion.tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(activity.product?.id)}>
                  <td className="p-4 border text-center">{activity.product?.id || "N/A"}</td>
                  <td className="p-4 border text-center">{activity.type}</td>
                  <td className="p-4 border text-center">{activity.quantity}</td>
                  <td className="p-4 border text-center">{activity.notes || "N/A"}</td>
                  <td className="p-4 border text-center">{new Date(activity.createdAt).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      
      </motion.div>
    </Layout>
  );
}
