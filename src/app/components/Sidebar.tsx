"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaBars,
  FaCube,
  FaChartPie,
  FaBox,
  FaLayerGroup,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Products", icon: <FaCube />, path: "/product/productList" },
    { name: "Inventory", icon: <FaChartPie />, path: "/inventory/restock" },
    { name: "Growth", icon: <FaBox />, path: "/growth" },
    { name: "Order Lists", icon: <FaLayerGroup />, path: "/orders" },
  ];

  

  return (
    <div
      className={`flex flex-col bg-teal-900 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } max-h-screen transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && <h1 className="text-xl font-bold">Outfit Go</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-4"
              } px-4 py-2 rounded-md transition-colors duration-200 ${
                pathname === item.path ? "bg-teal-700" : "hover:bg-teal-700"
              } focus:outline-none`}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Options */}
      <div className="mt-auto flex flex-col space-y-2 px-4 py-4">
        <button className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-4"
          } px-4 py-2 rounded-md transition-colors duration-200 hover:bg-teal-700 focus:outline-none`}>
          <FaCog className="text-xl" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-4"
          } px-4 py-2 rounded-md transition-colors duration-200 hover:bg-teal-700 focus:outline-none`}>
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );
}
