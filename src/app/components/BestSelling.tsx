"use client";
import { useEffect, useState } from "react";
import { getBestSellingProducts } from "../utils/performance";

export default function BestSellingProducts() {
  const [products, setProducts] = useState<{ name: string; revenue: number }[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getBestSellingProducts(5);
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold text-gray-600">Best Selling Products</h3>
      <ul className="mt-4 space-y-2">
        {products.map((product, index) => (
          <li key={index} className="flex justify-between text-gray-800">
            <span>{product.name}</span>
            <span>${product.revenue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
