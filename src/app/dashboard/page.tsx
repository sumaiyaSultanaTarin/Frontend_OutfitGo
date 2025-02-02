"use client"
import React from "react";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content Area */}
      
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavigationBar />

        {/* Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold text-gray-700">Welcome to the Dashboard</h1>
          <p className="text-gray-600 mt-4">This is your main content area. Add widgets, tables, or other components here.</p>
        </div>
      </div>
    </div>
  );
}
