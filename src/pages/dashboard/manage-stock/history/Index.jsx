import React, { useState } from "react";
import AddStockModal from "../../../../components/dashboard/manage-stock/AddStockModal";
import HistoryHeader from "../../../../components/dashboard/manage-stock/HistoryHeader";

const StockHistory = () => {
  // State for stock history and search query
  const [stockHistory, setStockHistory] = useState([
    {
      id: "1",
      type: "add",
      quantity: 10,
      productDetail: "Product A",
      supplier: "Supplier A",
      order: "Order A",
      reason: "New Stock",
      date: "2025-03-16",
    },
    {
      id: "2",
      type: "remove",
      quantity: 5,
      productDetail: "Product B",
      supplier: "Supplier B",
      order: "Order B",
      reason: "Product Sale",
      date: "2025-03-17",
    },
    // Add more data as needed
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal toggle functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter stock history based on search query
  const filteredHistory = stockHistory.filter((movement) =>
    movement.productDetail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  bg-white h-full rounded-2xl">
      {/* Table Header with Search */}
      <HistoryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAddProduct={openModal} // Reusing the modal opening function
      />

      {/* Stock History Table */}
      <table className="w-full border  text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Product Detail
            </th>
            <th scope="col" className="px-6 py-3">
              Supplier
            </th>
            <th scope="col" className="px-6 py-3">
              Order
            </th>
            <th scope="col" className="px-6 py-3">
              Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((movement) => (
            <tr
              key={movement.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${movement.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${movement.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">{movement.id}</td>
              <td className="px-6 py-4">{movement.type}</td>
              <td className="px-6 py-4">{movement.quantity}</td>
              <td className="px-6 py-4">{movement.productDetail}</td>
              <td className="px-6 py-4">{movement.supplier}</td>
              <td className="px-6 py-4">{movement.order}</td>
              <td className="px-6 py-4">{movement.reason}</td>
              <td className="px-6 py-4">{movement.date}</td>
              <td className="px-6 py-4">
                <button
                  onClick={openModal}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Add Movement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Movement */}
      <AddStockModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default StockHistory;
