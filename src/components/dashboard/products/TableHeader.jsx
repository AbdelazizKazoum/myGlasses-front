import React from "react";

const TableHeader = ({ filters, setFilters, handleAddProduct }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
              placeholder="Search products"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Brand */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={filters.brand}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="Brand name"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Rating</label>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="1">1 Star & Up</option>
            </select>
          </div>

          {/* Price Sort */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Sort by Price</label>
            <select
              name="priceSort"
              value={filters.priceSort}
              onChange={handleInputChange}
              className="p-2 border bg-white rounded-lg w-full"
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="0"
              min="0"
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col text-gray-700">
            <label className="text-sm font-medium mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              className="p-2 border rounded-lg w-full"
              placeholder="9999"
              min="0"
            />
          </div>

          {/* Add Product Button */}
          <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={handleAddProduct}
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
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
