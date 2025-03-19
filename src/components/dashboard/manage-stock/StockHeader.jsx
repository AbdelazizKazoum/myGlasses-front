const StockHeader = ({ filters, setFilters, handleAddStock }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 w-full px-4 py-4">
      <div className="mx-auto bg-white sm:rounded-lg p-4 shadow-sm">
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

          {/* Supplier
          <div className="flex text-gray-700 flex-col">
            <label className="text-sm font-medium mb-1">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={filters.quantity}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Supplier name"
            />
          </div> */}

          {/* Color Filter */}
          <div className="flex text-gray-700 flex-col">
            <label className="text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              name="color"
              value={filters.color}
              onChange={handleInputChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          {/* Size Filter */}
          <div className="text-gray-700 flex flex-col">
            <label className="text-sm font-medium mb-1">Size</label>
            <select
              name="size"
              value={filters.size}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All Sizes</option>
              <option value="SM">SM</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="3XL">3XL</option>
              <option value="4XL">4XL</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="updatedAt"
              value={filters.updatedAt}
              onChange={handleInputChange}
              className="p-2 border text-gray-700 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
