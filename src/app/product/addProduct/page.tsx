"use client";

import { FormEvent, useState } from "react";
import api from "../../utils/axios";
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
            router.push("/productList");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create Product");
        }
    };

    return (
        <section className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-3xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
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
                                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")}
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
                    <div>
                        <h2 className="text-lg font-semibold mt-4">Variants</h2>
                        {variants.map((variant, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Variant Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter variant name"
                                        value={variant.variantName}
                                        onChange={(e) => handleVariantChange(index, "variantName", e.target.value)}
                                        required
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Variant Value
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter variant value"
                                        value={variant.variantValue}
                                        onChange={(e) => handleVariantChange(index, "variantValue", e.target.value)}
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
                                        placeholder="Enter variant stock level"
                                        value={variant.stockLevel}
                                        onChange={(e) => handleVariantChange(index, "stockLevel", e.target.value)}
                                        required
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
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
    );
}
