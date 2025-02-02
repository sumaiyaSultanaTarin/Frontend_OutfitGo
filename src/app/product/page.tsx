"use client";

import { FormEvent, useState } from "react";
import api from "../utils/axios";
import { useRouter } from "next/navigation";

export default function Product() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stockLevel, setStockLevel] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [variants, setVariants] = useState([{
        variantName: "",
        variantValue: "",
        stockLevel: "",
    }]);
    const router = useRouter();
    const [error, setError] = useState(null);
 
    const handleVariantChange = (index: number, key: string, value: string) => {
        const updatedVariants = [...variants];
        updatedVariants[index] = { ...updatedVariants[index], [key]: value };
        setVariants(updatedVariants);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setPrice(""); // Allow clearing the input
        } else {
            setPrice(parseFloat(parseFloat(value).toFixed(2))); // Ensure valid decimal format
        }
    };

    const submitProduct = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !price || price<=0 || !stockLevel || !category || !vendorId) {
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
                variants
            });
            console.log(response.data);
            alert("Product added Successfully!");
            router.push("./main");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create Product");
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Add a New Product
                        </h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={submitProduct} className="space-y-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <span className="material-icons">camera</span>
                                </div>
                                <label className="text-blue-500 mt-2 cursor-pointer">
                                    Upload Image
                                    <input
                                        type="text"
                                        placeholder="Enter Image URL"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Stock Level
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter stock level"
                                        value={stockLevel}
                                        onChange={(e) => setStockLevel(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter product price"
                                        value={price}
                                        onChange={handlePriceChange}
                                        step="0.01"
                                        min="0"
                                        required
                                        className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                    />
                                </div>
                                <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Vendor ID
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter vendor ID"
                                    value={vendorId}
                                    onChange={(e) => setVendorId(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                />
                            </div>

                            </div>

                            {/* Variants Section */}
                            <div>
                                <h2 className="text-lg font-semibold mt-2">Variants</h2>
                                {variants.map((variant, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-6 border-b pb-4 mb-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Variant Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter variant name"
                                                value={variant.variantName}
                                                onChange={(e) => handleVariantChange(index, "variantName", e.target.value)}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Variant Value
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter variant value"
                                                value={variant.variantValue}
                                                onChange={(e) => handleVariantChange(index, "variantValue", e.target.value)}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Variant Stock Level
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter variant stock level"
                                                value={variant.stockLevel}
                                                onChange={(e) => handleVariantChange(index, "stockLevel", e.target.value)}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-primary-600"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Add Product
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push("./main")}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
