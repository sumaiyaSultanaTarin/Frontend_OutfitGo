"use client";
import Dashboard from "@/app/dashboard/page";
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit,
  FiSearch,
  FiTag,
  FiTrash,
  FiUpload,
} from "react-icons/fi";

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
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchAllProducts(searchQuery, 1);
  };

  const handlePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setPage(newPage);
    fetchAllProducts(searchQuery, newPage);
  };

  const handleDownloadProducts = async() => {
    try{
      let allProducts: Product[] =[];
      let page =1;
      let totalPages = 1;

      while(page <= totalPages)
      {
        const response = await api.get(`/product/all?page=${page}`); 
        const fetchedProducts: Product[] = response.data.products || [];
        if(fetchedProducts.length === 0) break;
        allProducts = [...allProducts, ...fetchedProducts];
        totalPages = response.data.totalPages ||1;
        page++;
      }
  
    if (allProducts.length === 0) {
      alert("No products available to download.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8," +
      "ID,Name,Category,Price,Stock Level,Image URL\n" +
      allProducts.map((product :Product) => {
        return `${product.id},${product.name},${product.category},${product.price},${product.stockLevel},${product.imageUrl || "N/A"}`;
      }).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "product_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }catch(err)
    {
      alert("Failed to download product list.");
    }
  };
  


  const deleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/product/delete/${id}`);
        alert("Product deleted successfully!");
        fetchAllProducts();
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to delete the product");
      }
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Dashboard>
    <div className="overflow-x-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Products List
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg pl-10 w-64"
          />
          <button
            onClick={handleSearch}
            className="absolute left-2 top-2 text-gray-500"
          >
            <FiSearch size={22} />
          </button>
        </div>
        <button
          onClick={() => router.push("/product/addProduct")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Create
        </button>
        <button
            onClick={() => router.push("/product/discount")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2 hover:bg-yellow-600"
          >
            <FiTag /> Discount
          </button>
          <button
            onClick={() => router.push("/product/bulkupload")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FiUpload /> Bulk Upload
          </button>
          <button
            onClick={handleDownloadProducts}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600"
          >
            <FiDownload /> Template
          </button>


      </div>

      {loading ? (
        <p className="text-center text-blue-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border">Product ID</th>
                <th className="p-4 border">Image</th>
                <th className="p-4 border">Product Name</th>
                <th className="p-4 border">Category</th>
                <th className="p-4 border">Price</th>
                <th className="p-4 border">Stock Level</th>
                <th className="p-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 border">{product.id}</td>
                  <td className="p-4 border text-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border">{product.name}</td>
                  <td className="p-4 border">{product.category}</td>
                  <td className="p-4 border">
                    ${product.discountedPrice || product.price}
                  </td>
                  <td className="p-4 border">{product.stockLevel}</td>
                  <td className="p-4 border text-center">
                    <button
                      onClick={() =>
                        router.push(`/product/update/${product.id}`)
                      }
                      className="text-blue-500 hover:text-blue-700 mr-2"
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
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 mr-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 ml-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
    </Dashboard>
  );
}
