import React, { useEffect, useState } from "react";
import HistoryHeader from "../../../../components/dashboard/manage-stock/HistoryHeader";
import { useDispatch, useSelector } from "react-redux";
import { filterHistory } from "../../../../store/stockSlice";
import MovementDetailModal from "../../../../components/modals/MovementDetailModal";
import AddStockModal from "../../../../components/modals/AddStockModal";

// Badge component for Type column
const MovementTypeBadge = ({ type }) => {
  const typeMap = {
    add: { color: "bg-green-100 text-green-800", label: "Add" },
    remove: { color: "bg-red-100 text-red-800", label: "Remove" },
    correction: { color: "bg-yellow-100 text-yellow-800", label: "Correction" },
  };

  const badge = typeMap[type] || {
    color: "bg-gray-100 text-gray-800",
    label: type,
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${badge.color}`}
    >
      {badge.label}
    </span>
  );
};

// Circle component for Color column
const ColorCircle = ({ color }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: color }}
      ></span>
    </div>
  );
};

const StockHistory = () => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    supplier: "",
    reason: "",
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedMovement, setSelectedMovement] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { stockHistory, totalItems } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const openDetailModal = (movement) => {
    setSelectedMovement(movement);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedMovement(null);
    setIsDetailModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    (async () => {
      await dispatch(
        filterHistory({
          filters,
          pagination: { page: currentPage, limit },
        })
      );
    })();
  }, [filters, currentPage, limit, dispatch]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white h-full rounded-2xl">
      <HistoryHeader
        filters={filters}
        setFilters={setFilters}
        handleAddStock={openModal}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              </th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Supplier</th>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {stockHistory.map((movement, index) => (
              <tr
                key={movement.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <MovementTypeBadge type={movement.type} />
                </td>
                <td className="px-6 py-4">{movement.quantity}</td>
                <td className="px-6 py-4">
                  {movement?.productDetail?.product?.name}
                </td>
                <td className="px-6 py-4">
                  <ColorCircle color={movement?.productDetail?.color} />
                </td>
                <td className="px-6 py-4">{movement?.productDetail?.size}</td>
                <td className="px-6 py-4">{movement.supplier?.name}</td>
                <td className="px-6 py-4">{movement.reason}</td>
                <td className="px-6 py-4">{movement.order}</td>
                <td className="px-6 py-4">
                  {movement.createdAt &&
                    new Date(movement.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openDetailModal(movement)}
                    className="font-medium text-primary-500 hover:underline"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 py-4 px-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 ${
              currentPage === 1
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            1
          </button>
          {currentPage > 2 && <span className="text-gray-500">...</span>}
          {currentPage > 1 && currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {currentPage}
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-4 py-2 ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <MovementDetailModal
        isOpen={isDetailModalOpen}
        movement={selectedMovement}
        onClose={closeDetailModal}
      />
      <AddStockModal
        filters={filters}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default StockHistory;
