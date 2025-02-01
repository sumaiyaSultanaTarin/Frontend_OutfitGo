"use client";

import AuthGuard from "./components/AuthGuard";

const Dashboard = () => {
  return (
    <AuthGuard>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </div>
    </AuthGuard>
  );
};
export default Dashboard;