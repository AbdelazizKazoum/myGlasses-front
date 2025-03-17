const HistoryHeader = ({ filters, setFilters, handleAddStock }) => {
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
              name="search"
              value={filters.search}
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
            </select>
          </div>

          {/* Supplier */}
          <div className="flex text-gray-700 flex-col">
            <label className="text-sm font-medium mb-1">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={filters.supplier}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Supplier name"
            />
          </div>

          {/* Reason */}
          <div className="flex text-gray-700 flex-col">
            <label className="text-sm font-medium mb-1">Reason</label>
            <input
              type="text"
              name="reason"
              value={filters.reason}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Reason"
            />
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
