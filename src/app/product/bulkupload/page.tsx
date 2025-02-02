"use client";

import { useState } from "react";
import api from "../../utils/axios";
import Dashboard from "@/app/dashboard/page";

export default function BulkUpload() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        try {
            await api.post("/product/bulk-upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Bulk upload successful!");
        } catch (err: any) {
            console.error(err.response?.data?.message || "Failed to upload file");
        }
    };

    return (
        <Dashboard>
        <section className="flex items-center justify-center min-h-[calc(75vh-64px)] bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">
              Bulk Upload
            </h2>
            <div className="space-y-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Upload File (CSV or XLSX)
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleFileUpload}
                className="w-full px-4 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition"
              >
                Upload
              </button>
            </div>
          </div>
        </section>
      </Dashboard>
    );
}
