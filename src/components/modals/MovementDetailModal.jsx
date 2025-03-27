import { XIcon } from "lucide-react";
import React from "react";

const MovementDetailModal = ({ movement, isOpen, onClose }) => {
  if (!isOpen || !movement) return null;

  const {
    id,
    type,
    quantity,
    reason,
    note,
    createdAt,
    productDetail,
    supplier,
    user,
  } = movement;

  const product = productDetail?.product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Stock Movement Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Movement Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              <span className="font-medium text-gray-900">ID:</span> {id}
            </p>
            <p>
              <span className="font-medium text-gray-900">Type:</span> {type}
            </p>
            <p>
              <span className="font-medium text-gray-900">Quantity:</span>{" "}
              {quantity}
            </p>
            <p>
              <span className="font-medium text-gray-900">Reason:</span>{" "}
              {reason}
            </p>
            <p>
              <span className="font-medium text-gray-900">Note:</span>{" "}
              {note || "-"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>

          {/* Product Info Section */}
          <div className="border-l pl-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Product Info
            </h3>
            <p>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {product?.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Brand:</span>{" "}
              {product?.brand}
            </p>
            <p>
              <span className="font-medium text-gray-900">Category:</span>{" "}
              {product?.category}
            </p>
            <p>
              <span className="font-medium text-gray-900">Size:</span>{" "}
              {productDetail?.size}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Color:</span>
              <span
                className="inline-block w-4 h-4 rounded-full border"
                style={{ backgroundColor: productDetail?.color }}
              />
            </p>
          </div>
        </div>

        {/* Supplier and User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Supplier Info
            </h3>
            <p>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {supplier?.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {supplier?.email}
            </p>
            <p>
              <span className="font-medium text-gray-900">Phone:</span>{" "}
              {supplier?.phone}
            </p>
            <p>
              <span className="font-medium text-gray-900">Company:</span>{" "}
              {supplier?.companyName}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              User Info
            </h3>
            <p>
              <span className="font-medium text-gray-900">Username:</span>{" "}
              {user?.username}
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {user?.email}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovementDetailModal;
