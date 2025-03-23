import React from "react";

const CommandsHeader = ({ filters, setFilters, handleAddProduct }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFilters((prev) => ({ ...prev, [name]: date }));
  };

  return (
    <div className="bg-gray-50 w-full px-4 py-4">
      <div className="mx-auto bg-white sm:rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Search */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              name="searchInput"
              value={filters.searchInput}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Search commands"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Payment Status</label>
            <select
              name="paymentStatus"
              value={filters.paymentStatus}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          {/* User ID */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              name="userId"
              value={filters.userId}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="User ID"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          {/* Total Min */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Min Total</label>
            <input
              type="number"
              name="totalMin"
              value={filters.totalMin}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Total Max */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Max Total</label>
            <input
              type="number"
              name="totalMax"
              value={filters.totalMax}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="9999"
              min="0"
            />
          </div>

          {/* Sort By */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">None</option>
              <option value="date_commande">Date</option>
              <option value="total">Total</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Sort Order</label>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">None</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandsHeader;
