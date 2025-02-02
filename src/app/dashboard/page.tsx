"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar  from '../components/SidebarNavbar';
import {Navbar} from '../components/SidebarNavbar';
import api from '../utils/axios';
import AuthGuard from '../components/AuthGuard';


interface MetricsResponse {
  totalOrders: number;
  totalUnitsSold: number;
  totalPending: number;
  monthlyRevenue: number;
}

interface SalesData {
  date: string;
  dailyRevenue: number;
}

interface Activity {
  productName: string;
  type: string;
  quantity: number;
  date: string;
  notes?: string;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<MetricsResponse>({
    totalOrders: 0,
    totalUnitsSold: 0,
    totalPending: 0,
    monthlyRevenue: 0,
  });

  const [totalUnitsSold, setTotalUnitsSold] = useState<number>(0);

  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log('Fetching dashboard data...');
      try {
        const metricsResponse = await api.get<MetricsResponse>('http://localhost:3000/performance/metrics');
        // console.log('Metrics response:', metricsResponse.data);
        const salesResponse = await api.get<SalesData[]>('http://localhost:3000/performance/trends');
        // console.log('Sales response:', salesResponse);
        // const activityResponse = await api.get<Activity[]>('http://localhost:3000/inventory/log');

        setMetrics(metricsResponse.data);
        console.log('metrics', metrics);
        setTotalUnitsSold(metricsResponse.data.totalUnitsSold);
        
        setSalesData(salesResponse.data);
        // setActivity(activityResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = {
    labels: salesData.map((item) => item.date),
    datasets: [
      {
        label: 'Daily Revenue',
        data: salesData.map((item) => item.dailyRevenue),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <AuthGuard>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">
          {/* Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: 'Total Orders', value: metrics.totalOrders },
              { title: 'Total Sales', value: `$${totalUnitsSold}` },
              { title: 'Total Pending', value: metrics.totalPending },
              { title: 'Monthly Revenue', value: `$${metrics.monthlyRevenue}` },
            ].map((metric, index) => (
              <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                <p className="text-gray-600">{metric.title}</p>
                <h2 className="text-2xl font-bold">{metric.value}</h2>
              </div>
            ))}
          </div>

          {/* Sales Chart Section */}
          <div className="p-4 bg-white shadow-md rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Sales Details</h3>
            <Line data={chartData} />
          </div>

          {/* Activity Section */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.productName}</td>
                    <td className="border px-4 py-2 capitalize">{item.type}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
    </AuthGuard>
  );
};

export default Dashboard;
