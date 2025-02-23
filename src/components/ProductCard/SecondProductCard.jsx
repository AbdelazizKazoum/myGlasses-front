import React from "react";
import { getImageUrl } from "../../utils/getImageUrl";

const SecondProductCard = ({ product, allowDetails, onDragStart }) => {
  return (
    <div
      className="max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onDragStart={onDragStart} // Prevent image drag
    >
      <div className="relative bg-black/[0.075] ">
        {/* Product Image */}
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        {/* Product Badge (Optional, e.g. "New", "Sale", etc.) */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>

        {/* Product Price */}
        <p className="text-xl font-bold text-gray-900 mt-2">${product.price}</p>

        {/* Product Details Button */}
        {allowDetails && (
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default SecondProductCard;
