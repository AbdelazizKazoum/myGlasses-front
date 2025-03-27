const OrderHeader = ({ filters, setFilters, handleCreateOrder }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 w-full px-4 py-4">
      <div className="mx-auto bg-white sm:rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Status */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={filters.status || ""}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Supplier */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={filters.supplier || ""}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Supplier name"
            />
          </div>

          {/* Start Date */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate || ""}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* End Date */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate || ""}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* Total Min */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Total Min</label>
            <input
              type="number"
              name="totalMin"
              value={filters.totalMin || ""}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Min amount"
            />
          </div>

          {/* Total Max */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Total Max</label>
            <input
              type="number"
              name="totalMax"
              value={filters.totalMax || ""}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Max amount"
            />
          </div>

          {/* Sorting */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy || "date"}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="date">Date</option>
              <option value="total">Total</option>
            </select>
          </div>

          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Sort Order</label>
            <select
              name="sortOrder"
              value={filters.sortOrder || "DESC"}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          {/* Create Order Button */}
          <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={handleCreateOrder}
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
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
