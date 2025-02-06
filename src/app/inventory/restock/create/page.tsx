"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Dashboard from "@/app/dashboard/page";
import api from "@/app/utils/axios";
import Layout from "@/app/components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function CreateRestockRequest() {
  const [productId, setProductId] = useState("");
  const [requestedQuantity, setRequestedQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!confirm("Are you sure you want to create this restock request?")) {
      setLoading(false);
      return;
    }

    try {
      await api.post("/inventory/restock", {
        productId: Number(productId),
        requestedQuantity: Number(requestedQuantity),
      });
      toast.success("Restock request created successfully!");
      router.push("/inventory/restock");
    } catch (err : any) {
      setError(err.response?.data?.message || "Failed to create restock request");
      toast.error("Failed to Create restock request")
    } finally {;
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6 border border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Create Restock Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Requested Quantity
              </label>
              <input
                type="number"
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
          </motion.div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </Layout>
  );
}
