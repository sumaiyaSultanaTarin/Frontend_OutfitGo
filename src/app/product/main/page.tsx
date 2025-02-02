"use client"
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
   
    const fetchAllProducts = async() =>
    {
        try{
            const response = await api.get("/product/all");
            console.log(response);
            setProducts(response.data);
        }
        catch(err: any)
        {
          setError( err.response?.data?.message ||'Failed to fetch products');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    });

    return(
        <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Product List</h2>
        {loading ? (
          <p className="text-center mt-4 text-blue-600">Loading products...</p>
        ) : error ? (
          <p className="text-center mt-4 text-red-600">{error}</p>
        ) : (
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock Level</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{product.imageUrl}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.stockLevel}</td>
                  <td></td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );

}