"use client";

import { useState } from "react";
import api from "../../utils/axios";
import Dashboard from "@/app/dashboard/page";
import Layout from "@/app/components/Layout";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ApplyDiscount() {
    const [category, setCategory] = useState("");
    const [discount, setDiscount] = useState<number | "">("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApplyDiscount = async () => {
        if (!category || !discount || !startDate || !endDate) {
            alert("All fields are required.");
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            alert("Start date must be before the end date.");
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

            alert("Discount applied successfully!");
            setCategory("");
            setDiscount("");
            setStartDate("");
            setEndDate("");
        } catch (err: any) {
            console.error(err.response?.data?.message || "Failed to apply discount");
            alert(err.response?.data?.message || "Failed to apply discount");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
        <div className="p-8">
            
            <h2 className="text-xl font-semibold mb-4">Apply Discount</h2>
            <button
                      onClick={() => router.back()}
                      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
                    >
                      <FaArrowLeft /> 
                    </button>
            <div className="space-y-4">
                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required />

                <label htmlFor="discount" className="block text-sm font-medium">Discount (%)</label>
                <input id="discount" type="number" placeholder="Enter discount percentage" value={discount} onChange={(e) => setDiscount(e.target.value ? Number(e.target.value) : "")} className="w-full p-2 border rounded" required />

                <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
                <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded" required />

                <label htmlFor="endDate" className="block text-sm font-medium">End Date</label>
                <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded" required />

                <button onClick={handleApplyDiscount} disabled={loading} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    {loading ? "Applying..." : "Apply Discount"}
                </button>
            </div>
        </div>
        </Layout>
    );
}
