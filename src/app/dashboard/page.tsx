"use client"
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/Navbar";

export default function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <NavigationBar />
        <div className="flex-1 bg-gray-100 p-6">{children}</div>
      </div>
    </div>
  );
}