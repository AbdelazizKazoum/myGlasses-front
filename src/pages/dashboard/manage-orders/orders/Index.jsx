import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import { PencilIcon } from "lucide-react";

import OrderHeader from "../../../../components/dashboard/supplier-orders/list/OrderHeader";
import {
  getFilteredSupplierOrders,
  updateSupplierOrder,
} from "../../../../store/supplierOrderSlice";

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
  const [newTotal, setNewTotal] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const dispatch = useDispatch();
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

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
    }
  };

  return (
    <div className="h-full">
      <div className="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
        <OrderHeader filters={filters} setFilters={setFilters} />
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
                  <td className="px-6 py-4 ">{order.supplier.name}</td>
                  <td className="px-6 py-4">
                    {dayjs(order.date).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.total} DH</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setNewStatus(order.status);
                        setNewTotal(order.total);
                      }}
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
        {/* Pagination */}
        <div className="flex items-center justify-end gap-3 py-4 px-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
