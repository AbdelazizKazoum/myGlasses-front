import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { PencilIcon, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderHeader from "../../../../components/dashboard/supplier-orders/list/OrderHeader";
import { getFilteredSupplierOrders } from "../../../../store/supplierOrderSlice";
import OrderDetailsModal from "../../../../components/modals/OrderDetailsModal";

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
  console.log("🚀 ~ Orders ~ showModal:", showModal);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { supplierOrders, pagination } = useSelector(
    (state) => state.supplierOrders
  );
  console.log("🚀 ~ Orders ~ supplierOrders:", supplierOrders);
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
    localStorage.setItem("selectedOrder", JSON.stringify(order));
    navigate("/admin/orders/add");
  };

  const handleCreateOrder = () => {
    navigate("/admin/orders/add");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-full">
      <div className="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
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
                      onClick={() => handleEditOrder()}
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
      <OrderDetailsModal
        show={showModal}
        onClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
