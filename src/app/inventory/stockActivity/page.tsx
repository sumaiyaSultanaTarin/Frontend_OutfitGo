"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaFilter, FaArrowLeft, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Dashboard from "@/app/dashboard/page";
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";

export default function StockActivity() {
  interface StockMovement {
    id: number;
    product?: { id: number };
    type: string;
    quantity: number;
    notes: string;
    createdAt: string;
  }
  
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    productId: "",
    type: "",
    startDate: "",
    endDate: "",
  });
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMovement, setNewMovement] = useState({
    productId: "",
    type: "",
    quantity: "",
    notes: "",
  });
  

  // Fetch stock movements
  const fetchStockMovements = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
      };
      const response = await api.get("/inventory/stock-movements", { params });
      setStockMovements(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stock movements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockMovements();
  }, [filters]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitNewMovement = async () => {
    try {
      await api.post("/inventory/log", {
        productId: Number(newMovement.productId),
        type: newMovement.type,
        quantity: Number(newMovement.quantity),
        notes: newMovement.notes,
      });
      alert("Stock movement logged successfully!");
      setNewMovement({ productId: "", type: "", quantity: "", notes: "" });
      setIsModalOpen(false);
      fetchStockMovements();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to log stock movement");
    }
  };

 

     // Delete stock movement
   const deleteStockMovement = async (id: number) => {
    try {
      await api.delete(`/inventory/stock-movements/${id}`);
      setStockMovements((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete stock movement:", err);
    }
  };


  return (
    <Dashboard>
      <div className="p-8 bg-gray-50 rounded-lg shadow-md">
         <button
                  onClick={() => router.back()}
                  className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <FaArrowLeft /> 
                </button>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-teal-600">
            Stock Activity
          </h2>
          <button 
          onClick = {() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <FaPlus />
            Log
          </button>
        </div>

        {/* Filters */}
        <div className="flex text-stone-400 gap-4 mb-4">
          <input
            type="number"
            name="productId"
            placeholder="Product ID"
            value={filters.productId}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-1/4"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-1/4"
          >
            <option value="">Types</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-1/4"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-1/4"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : stockMovements.length === 0 ? (
          <p className="text-center text-gray-500">No stock movements found.</p>
        ) : (
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-4 border">Product ID</th>
                <th className="p-4 border">Type</th>
                <th className="p-4 border">Quantity</th>
                <th className="p-4 border">Notes</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((movement: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border text-center">{movement.product?.id}</td>
                  <td
                    className={`p-4 border text-center ${
                      movement.type === "inbound"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {movement.type}
                  </td>
                  <td className="p-4 border text-center">{movement.quantity}</td>
                  <td className="p-4 border text-center">{movement.notes}</td>
                  <td className="p-4 border text-center">
                    {new Date(movement.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border text-center">
                    <button
                    onClick={() => deleteStockMovement(movement.id)} 
                    className="px-3 py-1 bg- bg-red-500 text-white rounded-lg hover:bg-red-600 mx-1"
                    >
                    <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

         {/* Modal for Logging Stock Movement */}
         {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Log Stock Movement</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="number"
                  name="productId"
                  placeholder="Product ID"
                  value={newMovement.productId}
                  onChange={handleModalInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="type"
                  value={newMovement.type}
                  onChange={handleModalInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={newMovement.quantity}
                  onChange={handleModalInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="notes"
                  placeholder="Notes (Optional)"
                  value={newMovement.notes}
                  onChange={handleModalInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  onClick={submitNewMovement}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
         )}
      </div>
    </Dashboard>
  );
}
