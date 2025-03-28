import React from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { getImageUrl } from "../../utils/getImageUrl";
import { selectStyles, statusOptions } from "../../utils/utils";

const CommandDetailModal = ({
  selectedCommand,
  setSelectedCommand,
  newTotal,
  setNewTotal,
  newStatus,
  setNewStatus,
  handleUpdateCommand,
}) => {
  if (!selectedCommand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedCommand(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl transition"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Order Details
        </h2>

        {/* Grid Layout - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section - Order Info */}
          <div className="space-y-4">
            <div className="bg-gray-100 p-3 rounded-lg text-lg font-bold text-gray-800">
              Total: {selectedCommand.total} DH
            </div>

            {/* Modify Total */}
            <div>
              <label
                htmlFor="new-total"
                className="block text-sm font-medium text-gray-700"
              >
                Edit Total
              </label>
              <input
                type="number"
                id="new-total"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="New total"
              />
            </div>

            {/* Modify Status */}
            <div>
              <label
                htmlFor="new-status"
                className="block text-sm font-medium text-gray-700"
              >
                Edit Status
              </label>
              <Select
                id="new-status"
                options={statusOptions}
                value={statusOptions.find(
                  (option) => option.value === newStatus
                )}
                onChange={(option) => setNewStatus(option ? option.value : "")}
                className="w-full outline-none"
                styles={selectStyles}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition w-full"
                onClick={() => setSelectedCommand(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-800 transition w-full"
                onClick={handleUpdateCommand}
              >
                Update
              </button>
            </div>

            {/* Address Section */}
            {selectedCommand.address && (
              <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Delivery Address
                </h3>
                <p>
                  <span className="font-medium">Full Name:</span>{" "}
                  {selectedCommand.address.fullName}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {selectedCommand.address.address}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {selectedCommand.address.city}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedCommand.address.mobile}
                </p>
                <p>
                  <span className="font-medium">Postal Code:</span>{" "}
                  {selectedCommand.address.pincode}
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Product List */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Purchased Products
            </h3>
            <ul className="space-y-4 max-h-[250px] overflow-y-auto">
              {selectedCommand.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={getImageUrl(
                      detail.detailProduct?.images.length > 0
                        ? detail.detailProduct?.images[0].image
                        : ""
                    )}
                    alt={detail.detailProduct.product.name}
                    className="w-16 h-16 object-contain rounded-lg shadow"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {detail?.detailProduct?.product?.name}
                    </p>
                    {detail?.detailProduct?.color && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-2">Color:</span>
                        <span
                          style={{
                            backgroundColor: detail?.detailProduct?.color,
                          }}
                          className="w-5 h-5 rounded-full border shadow"
                        ></span>
                        <span className="ml-4">
                          Size: {detail?.detailProduct?.size}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-700 mt-1">
                      {detail?.quantite} x {detail?.prix_vente} DH
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandDetailModal;
