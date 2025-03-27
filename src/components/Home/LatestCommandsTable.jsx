import React, { useEffect, useState } from "react";
import { EyeIcon, Loader, Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getLatestCommands } from "../../store/commandeSlice";

const LatestCommandsTable = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [latestCommands, setLatestCommand] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getLatestCommands());
      setLatestCommand(res?.payload || []);
      setLoading(false);
    })();
  }, [dispatch]);

  const handleDelete = (commandId) => {
    toast.info(`Delete order ${commandId} (Feature to be implemented)`);
  };

  const handleViewDetails = (commandId) => {
    toast.info(`View details for order ${commandId}`);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      shipped: { color: "bg-blue-100 text-blue-800", label: "Shipped" },
      delivered: { color: "bg-green-100 text-green-800", label: "Delivered" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    };
    const badge = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    return status === "paid" ? (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
        Paid
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
        Unpaid
      </span>
    );
  };

  if (loading) return <Loader className="mx-auto mt-10 animate-spin" />;

  return (
    <div className="space-y-4">
      {/* Latest Orders Section */}
      <div className="bg-white rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestCommands.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{order.utilisateur.username}</td>
                <td className="p-2">
                  {order.date_commande &&
                    new Date(order.date_commande).toLocaleDateString()}
                </td>
                <td className="p-2">{order.total}</td>
                <td
                  className={`p-2 ${
                    order.status === "delivered"
                      ? "text-green-500"
                      : order.status === "pending"
                      ? "text-yellow-500"
                      : order.status === "shipped"
                      ? "text-blue-800"
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

export default LatestCommandsTable;
