import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { PencilIcon, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderHeader from "../../../../components/dashboard/supplier-orders/list/OrderHeader";
import {
  getFilteredSupplierOrders,
  setSeletedSupplierOrder,
} from "../../../../store/supplierOrderSlice";
import OrderDetailsModal from "../../../../components/modals/OrderDetailsModal";
import Loader from "../../../../components/Loader";

const Orders = () => {
  const [filters, setFilters] = useState({
    status: "",
    supplier: "",
    startDate: "",
    endDate: "",
    totalMin: "",
    totalMax: "",
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { supplierOrders, pagination } = useSelector(
    (state) => state.supplierOrders
  );
  const totalPages = Math.ceil(pagination.total / limit);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getFilteredSupplierOrders({
        filters,
        pagination: { page: currentPage, limit },
      })
    ).finally(() => setLoading(false));
  }, [dispatch, filters, currentPage, limit]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEditOrder = (order) => {
    // localStorage.setItem("selectedOrder", JSON.stringify(order));
    dispatch(setSeletedSupplierOrder(order));
    navigate("/admin/orders/add");
  };

  const handleCreateOrder = () => {
    navigate("/admin/orders/add");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="overflow-x-auto">
        <OrderHeader
          filters={filters}
          setFilters={setFilters}
          handleCreateOrder={handleCreateOrder}
        />
        <table className="min-w-full border text-sm text-left text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Supplier</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplierOrders.length > 0 ? (
              supplierOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{order.supplier.name}</td>
                  <td className="px-6 py-4">
                    {dayjs(order.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.total} DH</td>
                  <td className="px-6 py-4 flex gap-2">
                    {/* View Order Button */}
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>

                    {/* Edit Order Button */}
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
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

      <OrderDetailsModal
        show={showModal}
        onClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
