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
      <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Payment
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {latestCommands?.length > 0 ? (
              latestCommands.map((command) => (
                <tr key={command.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {command.utilisateur?.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {command.total} MAD
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(command.status)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getPaymentBadge(command.paymentStatus)}
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      onClick={() => handleViewDetails(command.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-sm text-gray-500 py-4"
                >
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestCommandsTable;
