"use client";
import React from "react";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import NavigationBar from "./Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <NavigationBar />

          <div className="flex-1 bg-gray-100 p-6">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
