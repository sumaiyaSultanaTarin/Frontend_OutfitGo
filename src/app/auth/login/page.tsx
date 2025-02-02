"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/utils/auth";

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
      alert("Login Successful!");

      router.push("/dashboard");
    }
    catch (error : any) {
      setError(error.response?.data?.message || "Invalid email or password");
  };
    
   
  };


//     return (
//       <form onSubmit={handleLogin} className="p-4 bg-gray-100">
//         <div>
//        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//         <input 
//         type="email" 
//         placeholder="Enter your Email"
//         onChange={(e) => setEmail(e.target.value)} 
//         className="block mb-2 p-2 border" 
//         required
//         />
//         </div>
//         <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//         <input 
//         type="password" 
//         placeholder="Enter your Password" 
//         onChange={(e) => setPassword(e.target.value)}
//         className="block mb-2 p-2 border" 
//         required
//         />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
//       </form>
//     );
//   }
  

// //   const handleLogin = async (e: { preventDefault: () => void; }) => {
// //     e.preventDefault();
// //     try {
// //       const response = await login(email, password);
// //       localStorage.setItem("token", response.accessToken);
// //       router.push("/dashboard");
// //     }
// //     catch (error : any) {
// //       setError(error.response?.data?.message || "Invalid email or password");
// //   };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">OutfitGo</h1>
          <p className="text-gray-400">Login to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 rounded text-blue-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-500">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-400"> OR </div>

        {/*Google Login*/}
         <div className="flex flex-col space-y-4">
          <button className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg shadow hover:bg-gray-200 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
        </div>


        <div className=" mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/auth/register" className="text-sm text-blue-500">Sign up</a>
        </div>
      </div>
    </div>
  );
}



