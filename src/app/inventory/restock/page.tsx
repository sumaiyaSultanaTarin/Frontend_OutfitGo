"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/axios";
import Dashboard from "@/app/dashboard/page";
import { FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa";
import Layout from "@/app/components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function RestockRequests() {
  const [restockRequests, setRestockRequests] = useState<{id: number, productId: number; requestedQuantity: number; status: string , createdAt : Date}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{id: number, productId: number; requestedQuantity: number; status: string , createdAt : Date} | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const router = useRouter();

  const fetchRestockRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/inventory/restock");
      setRestockRequests(response.data || []);
    } catch (err :any ) {
      setError(err.response?.data?.message || "Failed to fetch restock requests");
      toast.error("Failed to fetch restock requests.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (request: {id: number, productId: number; requestedQuantity: number; status: string , createdAt : Date}) => {
    setSelectedRequest(request);
    setUpdatedStatus(request.status as "Pending" | "Approved" | "Rejected");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const updateRestockStatus = async () => {
    if (!selectedRequest) 
      {
        return;
      }
    if (!confirm("Are you sure you want to update this restock request status?")) {
      return;
    }

    try {
      await api.patch(`/inventory/restock/${selectedRequest.id}`, { status: updatedStatus });
      setRestockRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id ? { ...request, status: updatedStatus } : request
        )
      );
      toast.success("Restock request updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update restock request:");
    }
  };

  useEffect(() => {
    fetchRestockRequests();
  }, []);

  return (
    <Layout>
      <Toaster position="top-right"/>
      <motion.div className="p-8 bg-gray-50 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft /> 
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-teal-600">Restock Requests List</h2>
        {/* <button
          className="px-4 py-2 mb-4 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => router.push("/inventory/restock/create")}
        >
          + Create 
        </button> */}

        {loading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : restockRequests.length === 0 ? (
          <p className="text-center text-gray-500">No restock requests found.</p>
        ) : (
          <motion.div className="overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          >
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-4 border">Product ID</th>
                  <th className="p-4 border">Requested Quantity</th>
                  <th className="p-4 border">Status</th>
                  <th className="p-4 border">Date</th>
                  <th className="p-4 border">Action</th>
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
                    <td className = "p-4 border text-center">
                        <button
                        className="px-3 py-1 bg-green-400 text-white rounded-lg hover:bg-green-600"
                        onClick={() => openModal(request)}
                     >
                        <FaEdit/>
                        </button>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
    {isModalOpen && selectedRequest &&(
        <motion.div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Update Restock Status</h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <p className="text-gray-700 mb-2">
            <strong>Product:</strong> {selectedRequest.productId}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Requested Quantity:</strong> {selectedRequest.requestedQuantity}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Current Status:</strong> {selectedRequest.status}
          </p>

          <label className="block text-gray-700 font-medium mb-2">Update Status:</label>
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value as "Pending" | "Approved" | "Rejected")}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={updateRestockStatus}
            className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Update Status
          </button>
        </div>
        </motion.div>
    )};

      </motion.div>
    </Layout>
  );
}