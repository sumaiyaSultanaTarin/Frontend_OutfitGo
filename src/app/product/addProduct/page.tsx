"use client";

import { FormEvent, useState } from "react";
import api from "../../utils/axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import Layout from "@/app/components/Layout";

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
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(file);
      setImagePreview(URL.createObjectURL(file));
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
      alert("All fields are Required!");
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
      alert("Product added Successfully!");
      router.push("/product/productList");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create Product");
    }
  };

  return (
    <Layout>
      <section className="bg-gray-100 flex items-center justify-center min-h-screen p-2">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-10 border border-gray-200">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 flex items-center gap-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add New Product</h2>
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>
            <label
              htmlFor="imageUpload"
              className="mt-4 px-2 py-2 bg-blue-400 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Upload Image
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <form onSubmit={submitProduct} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
            </div>

            {/* Variants Section */}
 <div className="mt-6">
 <h6 className="text-lg font-medium text-gray-700 mb-2">Variants</h6>

  {variants.map((variant, index) => (
    <div key={index} className="flex gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Variant Name"
        value={variant.variantName}
        onChange={(e) => handleVariantChange(index, "variantName", e.target.value)}
        className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Variant Value"
        value={variant.variantValue}
        onChange={(e) => handleVariantChange(index, "variantValue", e.target.value)}
        className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Stock Level"
        value={variant.stockLevel}
        onChange={(e) => handleVariantChange(index, "stockLevel", e.target.value)}
        className="w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
        <button
          type="button"
          onClick={() => removeVariant(index)}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <FaTrash/>
        </button>
        {index === variants.length - 1 && (
          <button
            type="button"
            onClick={addVariant}
            className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <FaPlus/>
          </button>
        )}
    </div>
  ))}
</div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => router.push("./productList")}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
