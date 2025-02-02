"use client";

import { useState } from "react";
import api from "../../utils/axios";

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
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Bulk Upload</h2>
            <label htmlFor="file" className="block text-sm font-medium">Upload File (CSV or XLSX)</label>
            <input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full p-2 border rounded mb-4" />
            <button onClick={handleFileUpload} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Upload</button>
        </div>
    );
}
