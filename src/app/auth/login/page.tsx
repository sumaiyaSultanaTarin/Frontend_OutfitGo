"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/utils/auth";
import toast from "react-hot-toast";

export default function Login (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.accessToken);
      toast.success("Login Successful!");

      router.push("/dashboard");
    }
    catch (error : any) {
      setError(error.response?.data?.message || "Invalid email or password");
  };
    
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">OutfitGo</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 rounded text-blue-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/auth/register" className="ml-1 text-sm text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}



