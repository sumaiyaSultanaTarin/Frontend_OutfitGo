"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import api from "../../../utils/axios";
import Layout from "@/app/components/Layout";
import { FaArrowLeft } from "react-icons/fa";

export default function UpdateProduct() {
    const router = useRouter();
    const { id } = useParams();
    const productId = Array.isArray(id) ? id[0] : id; 

    
    // Product state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stockLevel, setStockLevel] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [variants, setVariants] = useState([{ variantName: "", variantValue: "", stockLevel: "" }]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/product/view/${id}`);
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStockLevel(response.data.stockLevel);
                setCategory(response.data.category);
                setImageUrl(response.data.imageUrl);
                setVendorId(response.data.vendorId);
                setVariants(response.data.variants?.map((variant: { variantName: any; variantValue: any; stockLevel: any; }) => ({
                    variantName: variant.variantName || "",
                    variantValue: variant.variantValue || "",
                    stockLevel: variant.stockLevel || "",
                })) || []);
                
            } catch (err: any) {
                console.error(err.response?.data?.message || "Failed to fetch product");
            }
        };
        fetchProduct();
    }, [id]);

    // Function to handle variant changes
    const handleVariantChange = (index: number, key: string, value: string) => {
        setVariants(prevVariants =>
            prevVariants.map((variant, i) =>
                i === index ? { ...variant, [key]: value } : variant
            )
        );
    };
    

    // Function to add a new variant
    const addVariant = () => {
        setVariants([...variants, { variantName: "", variantValue: "", stockLevel: "" }]);
    };

    // Function to remove a variant
    const removeVariant = (index: number) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/product/update/${id}`, {
                name, description, price, stockLevel, category, imageUrl, vendorId, variants,
            });
            alert("Product updated successfully!");
            router.push("/product/productList");
        } catch (err: any) {
            console.error(err.response?.data?.message || "Failed to update product");
        }
    };

return (

    <Layout>
          <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 border border-gray-200">
              
              {/* Header */}
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Update Product</h2>
              <button
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 flex items-center gap-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
               >
                <FaArrowLeft />
                </button>
      
              {/* Product Form */}
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Grid Layout for Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Product Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
      
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      id="description"
                      type="text"
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
      
                  {/* Price */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      id="price"
                      type="number"
                      placeholder="Enter product price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
      
                  {/* Stock Level */}
                  <div>
                    <label htmlFor="stockLevel" className="block text-sm font-medium text-gray-700">Stock Level</label>
                    <input
                      id="stockLevel"
                      type="number"
                      placeholder="Enter stock level"
                      value={stockLevel}
                      onChange={(e) => setStockLevel(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
      
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      id="category"
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
      
                  {/* Image URL */}
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      id="imageUrl"
                      type="text"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
      
                  {/* Vendor ID */}
                  <div>
                    <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">Vendor ID</label>
                    <input
                      id="vendorId"
                      type="number"
                      placeholder="Enter vendor ID"
                      value={vendorId}
                      onChange={(e) => setVendorId(e.target.value)}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
      
                {/* Variants Section */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">Variants</h2>
      
                  {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border p-4 rounded-lg shadow-sm bg-gray-50">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Variant Name</label>
                        <input
                          type="text"
                          placeholder="Enter variant name"
                          value={variant.variantName}
                          onChange={(e) => handleVariantChange(index, "variantName", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Variant Value</label>
                        <input
                          type="text"
                          placeholder="Enter variant value"
                          value={variant.variantValue}
                          onChange={(e) => handleVariantChange(index, "variantValue", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Stock Level</label>
                        <input
                          type="number"
                          placeholder="Enter stock level"
                          value={variant.stockLevel}
                          onChange={(e) => handleVariantChange(index, "stockLevel", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
      
                {/* Add Variant Button */}
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  + Add Variant
                </button>
      
                {/* Form Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Layout>
    );
      
}
