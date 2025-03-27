import React from "react";
import { XIcon } from "lucide-react";
import dayjs from "dayjs";

const OrderDetailsModal = ({ order, onClose, show }) => {
  if (!show || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 md:flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Détails de la Commande
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <XIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Order Details Section */}
        <div className="mb-6 flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1 space-y-3 text-gray-700">
            <div>
              <span className="font-medium text-gray-600">ID:</span> {order.id}
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <span
                className={`px-2 py-1 rounded-md ${
                  order.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Fournisseur:</span>{" "}
              {order.supplier.name}
            </div>
            <div>
              <span className="font-medium text-gray-600">Total:</span>{" "}
              {order.total} DH
            </div>
            <div>
              <span className="font-medium text-gray-600">Date:</span>{" "}
              {dayjs(order.createdAt).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>

        {/* Items Table Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Produits Commandés
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Produit
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Quantité
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Taille
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Prix Unitaire
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Sous-total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.detail_product.product.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {item.detail_product.size}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {item.unitPrice} DH
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {item.subTotal} DH
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Close Button Section */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
