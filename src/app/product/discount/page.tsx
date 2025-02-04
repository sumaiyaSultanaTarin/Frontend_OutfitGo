"use client";

import { useState } from "react";
import api from "../../utils/axios";
import Layout from "@/app/components/Layout";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ApplyDiscount() {
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState<number | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApplyDiscount = async () => {
    if (!category || !discount || !startDate || !endDate) {
      toast.error("All fields are required.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("Start date must be before the end date.");
      return;
    }

    if (!confirm("Are you sure you want to apply this discount?")) {
      return;
    }

    setLoading(true);

    try {
      await api.post("/product/apply-discount", {
        category,
        discount: Number(discount),
        startDate,
        endDate,
      });

      toast.success("Discount applied successfully!");
      setCategory("");
      setDiscount("");
      setStartDate("");
      setEndDate("");
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to apply discount");
      toast.error(err.response?.data?.message || "Failed to apply discount");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <motion.div
        className=" p-6 flex items-baseline justify-evenly min-h-screen bg-gradient-to-r from-white via-teal-100 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
           <button
            onClick={() => router.back()}
            className="mb-2 px-4 py-2 flex items-center gap-2 text-gray-700 font-semibold rounded-lg hover:bg-teal-00 transition"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-4">Apply Discount</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Enter discount percentage"
                value={discount}
                onChange={(e) =>
                  setDiscount(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
                  required
                />
              </div>
            </div>

            <motion.button
              onClick={handleApplyDiscount}
              disabled={loading}
              className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition disabled:bg-gray-300"
              whileHover={!loading ? undefined  : { scale: 1.03 }}
              whileTap={loading ? undefined : { scale: 0.97 }}
            >
              {loading ? "Applying..." : "Apply Discount"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
