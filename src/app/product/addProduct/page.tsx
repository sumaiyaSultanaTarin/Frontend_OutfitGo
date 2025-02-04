"use client";

import { FormEvent, useState } from "react";
import api from "../../utils/axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import Layout from "@/app/components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { FiTrash, FiTrash2, FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Product() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stockLevel, setStockLevel] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [vendorId, setVendorId] = useState("");
  const [variants, setVariants] = useState([
    {
      variantName: "",
      variantValue: "",
      stockLevel: "",
    },
  ]);

  const router = useRouter();
  const [error, setError] = useState(null);

  const handleVariantChange = (index: number, key: string, value: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [key]: value };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { variantName: "", variantValue: "", stockLevel: "" },
    ]);
  };

  const removeVariant = (index: number) => {
    if (confirm("Are you sure you want to remove this variant?")) {
      const updatedVariants = variants.filter((_, i) => i !== index);
      setVariants(updatedVariants);
      toast.success("Variant removed successfully.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (confirm("Are you sure you want to remove the image?")) {
      setImageUrl(null);
      setImagePreview(null);
      toast.success("Image removed successfully.");
    }
  };

  const submitProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !price ||
      price <= 0 ||
      !stockLevel ||
      !category ||
      !vendorId
    ) {
      toast.error("All fields are Required!");
      return;
    }
    try {
      const response = await api.post("/product/create", {
        name,
        description,
        price: price.toString(),
        stockLevel: parseInt(stockLevel, 10),
        category,
        imageUrl,
        vendorId: parseInt(vendorId, 10),
        variants,
      });

      console.log(response.data);
      toast.success("Product added Successfully!");
      router.push("/product/productList");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create Product");
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      router.push("/product/productList");
    }
  };


  return (
    <Layout>
      <Toaster position="top-right" />
      <motion.section className="bg-gray-200 flex items-center justify-center min-h-screen p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      >
        <motion.div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-8xl p-6"
         initial={{ y: -50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => router.back()}
            className="mb-2 px-4 py-2 flex items-center gap-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            <FaArrowLeft />
          </button>
          <h4 className="text-2xl font-bold text-center text-teal-600 mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
          >Add New Product</h4>
          <div className="flex flex-col items-center mb-4">
            <motion.div className="relative w-20 h-20 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </motion.div>
            <div className="flex gap-2 mt-4">
              <motion.label
                htmlFor="imageUpload"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 flex items-center gap-1"
                title="Upload Image"
                whileHover={{ scale: 1.1 }}
              >
                <FiUpload/>
              </motion.label>
              {imagePreview && (
                <motion.button
                  onClick={removeImage}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                  title="Remove Image"
                  whileHover={{ scale: 1.1 }}

                >
                  <FiTrash/>
                </motion.button>
              )}
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <form onSubmit={submitProduct} className="space-y-6">
            <motion.div className="grid grid-cols-2 gap-6"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, staggerChildren: 0.1 }}
           >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Stock Level
                </label>
                <input
                  type="number"
                  placeholder="Enter stock level"
                  value={stockLevel}
                  onChange={(e) => setStockLevel(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value ? parseFloat(e.target.value) : "")
                  }
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Vendor ID
                </label>
                <input
                  type="number"
                  placeholder="Enter vendor ID"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Variants Section */}
            <div className="mt-6">
              <h6 className="text-lg font-medium text-gray-700 mb-2">Variants</h6>
              {variants.map((variant, index) => (
                <motion.div key={index} className="flex gap-4 items-center mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <input
                    type="text"
                    placeholder="Variant Name"
                    value={variant.variantName}
                    onChange={(e) =>
                      handleVariantChange(index, "variantName", e.target.value)
                    }
                    className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Variant Value"
                    value={variant.variantValue}
                    onChange={(e) =>
                      handleVariantChange(index, "variantValue", e.target.value)
                    }
                    className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Stock Level"
                    value={variant.stockLevel}
                    onChange={(e) =>
                      handleVariantChange(index, "stockLevel", e.target.value)
                    }
                    className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" 
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                  {index === variants.length - 1 && (
                    <button
                      type="button"
                      onClick={addVariant}
                      className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                      title="Add"
                    >
                      <FaPlus />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div className="flex justify-center gap-4 mt-6"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
            >
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.section>
    </Layout>
  );
}
