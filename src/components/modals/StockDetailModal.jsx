import React from "react";
import { XIcon } from "lucide-react"; // Assuming you're using lucide-react for the close icon

const StockDetailModal = ({ stock, isOpen, onClose }) => {
  if (!isOpen || !stock) return null; // Don't render if the modal is not open or no stock data is provided

  const { id, quantity, createdAt, updated, productDetail } = stock;

  const { color, size, qte, product } = productDetail || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Stock Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          {/* Stock Info */}
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Created At:</strong> {createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {updated}
            </p>
            <p>
              <strong>Updated:</strong> {updated}
            </p>
          </div>

          <hr className="my-4" />

          {/* Product Info */}
          <div>
            <p className="font-semibold">Product Info:</p>
            <div className="grid grid-cols-2 gap-2">
              <p>
                <strong>Name:</strong> {product?.name}
              </p>

              <p>
                <strong>Brand:</strong> {product?.brand}
              </p>
              <p>
                <strong>Category:</strong> {product?.category}
              </p>
              <p>
                <strong>Gender:</strong> {product?.gender}
              </p>
              <p>
                <strong>Weight:</strong> {product?.weight}g
              </p>
              <p>
                <strong>Price:</strong> ${product?.price}
              </p>
              <p>
                <strong>New Price:</strong> ${product?.newPrice}
              </p>
              <p>
                <strong>Quantity:</strong> {product?.quantity}
              </p>
              <p>
                <strong>Rating:</strong> {product?.rating}
              </p>
              <p>
                <strong>Review Count:</strong> {product?.reviewCount}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          {/* Product Detail Info */}
          <div>
            <p className="font-semibold">Product Detail:</p>
            <div className="grid grid-cols-2 gap-2">
              <p>
                <strong>Color:</strong>{" "}
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
              </p>
              <p>
                <strong>Size:</strong> {size}
              </p>
              <p>
                <strong>Quantity Available:</strong> {qte}
              </p>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-800 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal;
