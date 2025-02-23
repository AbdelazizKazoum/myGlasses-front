import React from "react";
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
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Orders",
    value: "1,230",
    icon: ShoppingCart,
    color: "red",
  },
  {
    title: "Total Revenue",
    value: "$45,000",
    icon: BarChart,
    color: "green",
  },
  {
    title: "Total Users",
    value: "5,320",
    icon: Users,
    color: "blue",
  },
  {
    title: "Total Products",
    value: "320",
    icon: Package,
    color: "yellow",
  },
];

const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 700 },
  { month: "May", sales: 600 },
];

const pieData = [
  { name: "Completed", value: 400, color: "#4CAF50" },
  { name: "Pending", value: 300, color: "#FFC107" },
  { name: "Cancelled", value: 150, color: "#F44336" },
];

const latestOrders = [
  { id: "#1001", customer: "John Doe", total: "$250", status: "Completed" },
  { id: "#1002", customer: "Jane Smith", total: "$150", status: "Pending" },
  { id: "#1003", customer: "Mike Johnson", total: "$500", status: "Cancelled" },
  { id: "#1004", customer: "Sarah Brown", total: "$320", status: "Completed" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ title, value, icon: Icon, color, bg }, index) => (
          <Card
            key={index}
            className="p-4 flex items-center justify-between shadow-md"
          >
            <CardContent className="flex flex-row items-center gap-4">
              <div className={`p-3 bg-${color}-500/20 rounded-full`}>
                <Icon className={`w-6 h-6 text-${color}-500  `} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-xl font-semibold">{value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Overview Chart */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
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

      {/* Sales Distribution Chart */}
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.total}</td>
                <td
                  className={`p-2 ${
                    order.status === "Completed"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
