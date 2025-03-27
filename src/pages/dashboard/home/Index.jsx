import React, { useEffect, useState } from "react";
import { BarChart, ShoppingCart, Users, Package } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";
import api from "../../../lib/api";
import LatestCommandsTable from "../../../components/Home/LatestCommandsTable";

const HomePage = () => {
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    salesOverview: [],
    salesDistribution: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/statistics");
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Orders",
      value: statsData.totalOrders,
      icon: ShoppingCart,
      color: "text-red-500",
      bg: "bg-red-500/20",
    },
    {
      title: "Total Revenue",
      value: `$${statsData.totalRevenue}`,
      icon: BarChart,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
    {
      title: "Total Users",
      value: statsData.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/20",
    },
    {
      title: "Total Products",
      value: statsData.totalProducts,
      icon: Package,
      color: "text-yellow-500",
      bg: "bg-yellow-500/20",
    },
  ];

  // Handle salesOverview to show continuous line starting from 0
  const salesData = [];
  const currentMonth = new Date().getMonth(); // Current month (0-indexed)

  // Add empty months from the start of the year to the current month
  for (let i = 0; i <= currentMonth; i++) {
    const monthData = statsData.salesOverview.find(
      (item) => new Date(item.month).getMonth() === i
    );
    salesData.push({
      month: monthData ? monthData.month : `Month ${i + 1}`,
      sales: monthData ? monthData.totalRevenue : 0,
    });
  }

  // Transform salesDistribution to match pie chart format
  const pieColors = ["#FFC107", "#4CAF50", "#2196F3", "#F44336"];
  const pieData = statsData.salesDistribution.map((item, index) => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: parseInt(item.orderCount),
    color: pieColors[index % pieColors.length],
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ title, value, icon: Icon, color, bg }, index) => (
          <Card
            key={index}
            className="p-4 flex items-center justify-between shadow-md"
          >
            <CardContent className="flex flex-row items-center gap-4">
              <div className={`p-3 ${bg} rounded-full`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-xl font-semibold">{value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Overview Line Chart */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis
              stroke="#8884d8"
              domain={[0, "auto"]} // Ensures the Y-axis starts at 0 and adjusts to the maximum value dynamically
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Distribution Pie Chart */}
      <div className="bg-white shadow-md p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-2">Order Breakdown</h3>
          <ul className="space-y-2">
            {pieData.map((entry, index) => (
              <li key={index} className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-gray-700">
                  {entry.name}: {entry.value} orders
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Latest Orders Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Latest Orders</h2>
        <LatestCommandsTable />
      </div>
    </div>
  );
};

export default HomePage;
