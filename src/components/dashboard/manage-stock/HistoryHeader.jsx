import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers } from "../../../store/supplierSlice";

const HistoryHeader = ({ filters, setFilters, handleAddStock }) => {
  // State
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);

  // Hooks
  const { suppliers } = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoadingSuppliers(true);
      await dispatch(fetchSuppliers());
      setLoadingSuppliers(false);
    })();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 w-full px-4 py-4">
      <div className=" mx-auto bg-white sm:rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Search */}
          <div className="flex text-gray-700 flex-col">
            <label className="text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              name="searchInput"
              value={filters.searchInput}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Search all fields"
            />
          </div>

          {/* Type */}
          <div className=" text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="add">Add</option>
              <option value="remove">Remove</option>
              <option value="correction">Correction</option>
            </select>
          </div>

          {/* Supplier */}
          <div className=" text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Supplier</label>
            {loadingSuppliers ? (
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />
            ) : (
              <select
                name="supplierId"
                className="w-full text-gray-700 p-2 border bg-white rounded-md"
                value={filters.supplierId}
                onChange={handleInputChange}
              >
                <option className=" " value="">
                  -- Select Supplier --
                </option>
                {suppliers?.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Reason */}
          <div className=" text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Reason</label>
            <select
              name="reason"
              value={filters.reason}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="supplier_delivery">Supplier delivery</option>
              <option value="inventory_correction">Inventory correction</option>
              <option value="customer_return">Customer return</option>
              <option value="manual_adjustment">Manual adjustment</option>
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleInputChange}
              className="p-2 border text-gray-700 rounded-lg w-full"
            />
          </div>

          {/* Add Stock Button (spans full width on small screens) */}
          <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={handleAddStock}
              className="flex items-center justify-center px-4 py-2 mt-1 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-800"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHeader;
