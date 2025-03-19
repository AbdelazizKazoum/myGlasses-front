import React, { useEffect, useState } from "react";
import AddStockModal from "../../../../components/dashboard/manage-stock/AddStockModal";
import HistoryHeader from "../../../../components/dashboard/manage-stock/HistoryHeader";
import { useDispatch, useSelector } from "react-redux";
import { filterHistory } from "../../../../store/stockSlice";
import MovementDetailModal from "../../../../components/modals/MovementDetailModal";

const StockHistory = () => {
  // State
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

  // Hooks
  const { stockHistory, totalItems } = useSelector((state) => state.stock);
  console.log("🚀 ~ StockHistory ~ stockHistory:", stockHistory);
  const dispatch = useDispatch();

  // Methods
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
    dispatch(
      filterHistory({
        filters,
        pagination: { page: currentPage, limit },
      })
    );
  }, [filters, currentPage, limit, dispatch]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white h-full rounded-2xl">
      {/* Table Header with Search */}
      <HistoryHeader
        filters={filters}
        setFilters={setFilters}
        handleAddStock={openModal}
      />

      {/* Stock History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rtl:text-right text-gray-500">
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
            {stockHistory.map((movement) => (
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
                <td className="px-6 py-4">
                  {movement?.productDetail?.product?.name}
                </td>
                <td className="px-6 py-4">{movement.supplier?.name}</td>
                <td className="px-6 py-4">{movement.order}</td>
                <td className="px-6 py-4">{movement.reason}</td>
                <td className="px-6 py-4">{movement.date}</td>
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
          {/* Page Numbers */}
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

      {/* Modal for Detail Movement */}
      <MovementDetailModal
        isOpen={isDetailModalOpen}
        movement={selectedMovement}
        onClose={closeDetailModal}
      />
      {/* Modal for Adding Movement */}
      <AddStockModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default StockHistory;
