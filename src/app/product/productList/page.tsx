"use client";
import Layout from "@/app/components/Layout";
import Dashboard from "@/app/dashboard/page";
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiAtSign,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash,
  FiUnlock,
  FiUpload,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Product() {
  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    discountedPrice?: number;
    stockLevel: number;
    imageUrl?: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchAllProducts = async (query = "", pageNum = 1) => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await api.get(
          `/product/searchName?name=${query}&page=${pageNum}`
        );
      } else {
        response = await api.get(`/product/all?page=${pageNum}`);
      }
      console.log(response);
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err: any) {
      setProducts([]);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAllProducts(searchQuery, 1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handlePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setPage(newPage);
    fetchAllProducts(searchQuery, newPage);
  };

  const handleDownloadProducts = async () => {
    try {
      let allProducts: Product[] = [];
      let page = 1;
      let totalPages = 1;
      toast.success("Downloading products...");

      while (page <= totalPages) {
        const response = await api.get(`/product/all?page=${page}`);
        const fetchedProducts: Product[] = response.data.products || [];
        if (fetchedProducts.length === 0) break;
        allProducts = [...allProducts, ...fetchedProducts];
        totalPages = response.data.totalPages || 1;
        page++;
      }

      if (allProducts.length === 0) {
        alert("No products available to download.");
        return;
      }

      let csvContent =
        "data:text/csv;charset=utf-8," +
        "ID,Name,Category,Price,Stock Level,Image URL\n" +
        allProducts
          .map((product: Product) => {
            return `${product.id},${product.name},${product.category},${
              product.price
            },${product.stockLevel},${product.imageUrl || "N/A"}`;
          })
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "product_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to download product list.");
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/product/delete/${id}`);
        toast.success("Product deleted successfully!");
        fetchAllProducts();
      } catch (err) {
        toast.error("Failed to delete the product");
      }
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className=" bg-gray-100 min-h-screen flex flex-co items-center ">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-7xl p-6 relative">
          {/* <div className="flex flex-wrap items-center justify-between mb-6"> */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 1}}
            transition={{ duration: 2 }}
            className="flex items-center justify-between mb-4 z-10"
          >
            <h2 className="text-2xl font-semibold text-teal-700">
              Products List
            </h2>
            < div className="flex items-center gap-3">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border p-3 rounded-full pl-10 text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
                {/* <button onClick={handleSearch} className="absolute left-3 top-3 text-gray-500"> */}
                <FiSearch
                  className="absolute left-3 top-3 text-gray-500 hover:text-gray-700"
                  size={20}
                />
              </div>
            
             <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={() => router.push("/product/addProduct")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <FiPlus/>
            </button>
            <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm py-1 px-2 rounded-md">
              Create
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={() => router.push("/product/discount")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition"
            >
              <FiTag />
            </button>
            <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm py-1 px-2 rounded-md">
              Discount
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={() => router.push("/product/bulkupload")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
            >
              <FiUpload />
            </button>
            <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm py-1 px-2 rounded-md">
              Bulk Upload
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={handleDownloadProducts}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
            >
              <FiDownload />
            </button>
            <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm py-1 px-2 rounded-md">
              Download
            </span>
          </motion.div>
        </div>
      </motion.div>
     <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
      {loading ? (
        <p className="text-center text-blue-600 font-semibold">
          Loading products...
        </p>
      ) :  (
        <div className="overflow-hidden rounded-lg shadow relative">
          <div className="absolute insert-y-0 left-0 w-4 bg-grey-200"></div>
          <table className="w-full border border-gray-300 rounded-lg text-sm">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-4 border">ProductID</th>
                <th className="p-4 border">Image</th>
                <th className="p-4 border">ProductName</th>
                <th className="p-4 border">Category</th>
                <th className="p-4 border">Price</th>
                <th className="p-4 border">Stock Level</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-2 border text-center">{product.id}</td>
                  <td className="p-2 border text-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2 border text-center">{product.name}</td>
                  <td className="p-2 border text-center">{product.category}</td>
                  <td className="p-2 border text-center">
                    ${product.discountedPrice || product.price}
                  </td>
                  <td className="p-2 border text-center">
                    {product.stockLevel}
                  </td>
                  <td className="p-2 border text-center flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        router.push(`/product/update/${product.id}`)
                      }
                      className="text-blue-500 hover:text-blue-700 mr-2 "
                      title="Edit"
                      
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700" 
                      title="Delete"
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end items-center mt-6">
        <button
          onClick={() => handlePage(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          <FiChevronLeft />
        </button>
        <span className="px-2 py-2 text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePage(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          <FiChevronRight />
        </button>
      </div>
      </motion.div>
      </div>
      </div>
    </Layout>
  );
}
