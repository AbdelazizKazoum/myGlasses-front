import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterStock } from "../../../../store/stockSlice";
import StockHeader from "../../../../components/dashboard/manage-stock/StockHeader";
import StockDetailModal from "../../../../components/modals/StockDetailModal";

const Stock = () => {
  const [filters, setFilters] = useState({
    search: "",
    supplier: "",
    date: "",
    size: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStock, setSelectedStock] = useState(null);

  const {
    stock,
    stockPagination: pagination,
    status,
  } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const openModal = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null); // Reset the selected stock when closing
  };
  useEffect(() => {
    (async () => {
      const res = await dispatch(
        filterStock({
          filters,
          pagination: { page: currentPage, limit },
        })
      );
    })();
  }, [filters, currentPage, limit, dispatch]);

  const totalPages = Math.ceil(pagination.total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white h-full rounded-2xl">
      <div className="flex justify-between items-center ">
        <StockHeader filters={filters} setFilters={setFilters} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
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
            {status === "pending" ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              stock.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {item.productDetail?.product?.name}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      style={{
                        backgroundColor: item.productDetail.color,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></div>
                  </td>
                  <td className="px-6 py-4">{item.productDetail.size}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.updated}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(item)} // Open the modal and pass the item
                      className="font-medium text-primary-500 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

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

      {/* Modal for Stock Details */}
      <StockDetailModal
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Stock;
