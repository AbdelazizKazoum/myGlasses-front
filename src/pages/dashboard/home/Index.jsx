import React from "react";
import {
  BarChart,
  ShoppingCart,
  Users,
  Package,
  LineChart,
  TrendingUp,
} from "lucide-react";
import { Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";

const stats = [
  { title: "Total Orders", value: "1,230", icon: ShoppingCart },
  { title: "Total Revenue", value: "$45,000", icon: BarChart },
  { title: "Total Users", value: "5,320", icon: Users },
  { title: "Total Products", value: "320", icon: Package },
];

const pieData = [
  { name: "Completed", value: 400, color: "#4CAF50" },
  { name: "Pending", value: 300, color: "#FFC107" },
  { name: "Cancelled", value: 150, color: "#F44336" },
];

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ title, value, icon: Icon }, index) => (
          <Card
            key={index}
            className="p-4 flex items-center justify-between shadow-md"
          >
            <CardContent className="flex flex-row items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-xl font-semibold">{value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">#12345</td>
              <td className="p-2">John Doe</td>
              <td className="p-2">$120</td>
              <td className="p-2 text-green-600">Completed</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">#12346</td>
              <td className="p-2">Jane Smith</td>
              <td className="p-2">$85</td>
              <td className="p-2 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sales Distribution Chart */}
      <div className="bg-white shadow-md p-6 rounded-lg">
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
    </div>
  );
};

export default HomePage;
