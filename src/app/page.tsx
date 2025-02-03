export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Outfit GO</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Products</a></li>
            <li><a href="#" className="text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact</a></li>
          </ul>
          <a href="/auth/login" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Login</a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h2 className="text-4xl font-bold">Welcome to Outfit GO</h2>
        <p className="mt-4 text-lg">Your ultimate destination for stylish and trendy outfits.</p>
        <a href="#" className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-lg shadow-md hover:bg-gray-200">Shop Now</a>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 bg-white shadow-md mt-10">
        <p>&copy; 2025 Outfit GO. All rights reserved.</p>
      </footer>
    </div>
  );
}



























































// // import React from 'react'


// // interface Raw{
// //   id : number;
// //   name : number;

// // }

// // const componentName = async () => {
// //   const token = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0YXJpbkBnbWFpbC5jb20iLCJpYXQiOjE3MzYyNjI0NjcsImV4cCI6MTczNjI2NjA2N30.SMHLyVfuCn8ZLl1klzYdJtZALmbB6xhxCpMdKWGsP_Y"
// //   const response = await fetch('http://localhost:3000/product/view/5', {
// //     method: 'GET',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       'Authorization': token
// //     }
// //   });
// //   // console.log('response', response);
  
// //   const data = await response.json();
// //   // console.log('data', data);
  
// //   return (
// //     <div>
// //       <h1>Metrics</h1>
// //       <ul>
// //         {Object.entries(data).map(([key, value]) => (
// //           <li key={key}>
// //             {key}: {JSON.stringify(value)}
// //           </li>
// //         ))}
// //       </ul>
// //       </div>

// //   );
   
// // }

// // export default componentName;




















// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
