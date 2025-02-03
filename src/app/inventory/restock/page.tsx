"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/axios";
import Dashboard from "@/app/dashboard/page";
import { FaArrowLeft } from "react-icons/fa";

export default function RestockRequests() {
  const [restockRequests, setRestockRequests] = useState<{ productId: number; requestedQuantity: number; status: string , createdAt : Date}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Fetch Restock Requests
  const fetchRestockRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/inventory/restock");
      setRestockRequests(response.data || []);
    } catch (err :any ) {
      setError(err.response?.data?.message || "Failed to fetch restock requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestockRequests();
  }, []);

  return (
    <Dashboard>
      <div className="p-8 bg-gray-50 rounded-lg shadow-md">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft /> 
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Restock Requests</h2>
        <button
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/inventory/restock/create")}
        >
          + Create New Request
        </button>

        {loading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : restockRequests.length === 0 ? (
          <p className="text-center text-gray-500">No restock requests found.</p>
        ) : (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-4 border">Product ID</th>
                  <th className="p-4 border">Requested Quantity</th>
                  <th className="p-4 border">Status</th>
                  <th className="p-4 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {restockRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border text-center">{request.productId}</td>
                    <td className="p-4 border text-center">{request.requestedQuantity}</td>
                    <td className="p-4 border text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${
                          request.status === "Approved"
                            ? "bg-green-500"
                            : request.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4 border text-center">{new Date(request.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Dashboard>
  );
}
