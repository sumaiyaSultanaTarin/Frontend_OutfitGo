"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import api from "../../../utils/axios";
import Dashboard from "@/app/dashboard/page";

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
        <Dashboard>
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                <input id="name" type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />

                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <input id="description" type="text" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />

                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <input id="price" type="number" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")} className="w-full p-2 border rounded" required />

                <label htmlFor="stockLevel" className="block text-sm font-medium">Stock Level</label>
                <input id="stockLevel" type="number" placeholder="Enter stock level" value={stockLevel} onChange={(e) => setStockLevel(e.target.value)} className="w-full p-2 border rounded" required />

                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required />

                <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
                <input id="imageUrl" type="text" placeholder="Enter image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded" />

                <label htmlFor="vendorId" className="block text-sm font-medium">Vendor ID</label>
                <input id="vendorId" type="number" placeholder="Enter vendor ID" value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full p-2 border rounded" required />

                {/* Variants Section */}
                <h2 className="text-lg font-semibold mt-4">Variants</h2>
                {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4 border p-4 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium">Variant Name</label>
                            <input
                                type="text"
                                placeholder="Enter variant name"
                                value={variant.variantName}
                                onChange={(e) => handleVariantChange(index, "variantName", e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Variant Value</label>
                            <input
                                type="text"
                                placeholder="Enter variant value"
                                value={variant.variantValue}
                                onChange={(e) => handleVariantChange(index, "variantValue", e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Stock Level</label>
                            <input
                                type="number"
                                placeholder="Enter stock level"
                                value={variant.stockLevel}
                                onChange={(e) => handleVariantChange(index, "stockLevel", e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addVariant} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    + Add Variant
                </button>

                <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Update
                </button>
            </form>
        </div>
        </Dashboard>
    );
}
