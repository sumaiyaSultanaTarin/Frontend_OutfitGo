"use client";

import { useState } from "react";
import api from "../../utils/axios";
import Layout from "@/app/components/Layout";
import { FaArrowLeft, FaUpload, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    if (!confirm("Are you sure you want to upload this file?")) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/product/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Bulk upload successful!");
      setFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to upload file.");
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <motion.section
        className="flex items-center justify-center min-h-[75vh] bg-gray-50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FaArrowLeft />
          </button>

          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Bulk Upload
          </h2>

          <div className="space-y-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload File (CSV or XLSX)
            </label>
            <div className="relative flex items-center border rounded-lg p-3 bg-gray-100">
              <FaFileAlt className="text-gray-500 mr-2" />
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              <span className="text-gray-600 text-sm">{file ? file.name : "No file chosen"}</span>
            </div>

            <motion.button
              onClick={handleFileUpload}
              className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUpload /> Upload
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </Layout>
  );
}
