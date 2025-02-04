"use client";
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
  
    const handleRegister = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if(!email || !password || !confirmPassword)
      {
        alert("All field are required!");
        return;
      }
      try {
        const response = await api.post("/auth/register", { email, password, confirmPassword });
        console.log(response.data); 
        alert("Registration Successful!");
        router.push("/auth/login"); 
      } catch (err : any) {
        setError(err.response?.data?.message || "Registration failed");
      }
    };
  
    return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Create an Account</h1>
          <p className="text-gray-500">Join us today!</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
              required
           />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/auth/login" className="ml-1 text-sm text-blue-500 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </section>
  );
  }