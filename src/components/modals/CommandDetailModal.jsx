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
          Détails de la commande
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
                Modifier le total
              </label>
              <input
                type="number"
                id="new-total"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Nouveau total"
              />
            </div>

            {/* Modify Status */}
            <div>
              <label
                htmlFor="new-status"
                className="block text-sm font-medium text-gray-700"
              >
                Modifier le statut
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
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-800 transition w-full"
                onClick={handleUpdateCommand}
              >
                Mettre à jour
              </button>
            </div>
          </div>

          {/* Right Section - Product List */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Produits achetés
            </h3>
            <ul className="space-y-4 max-h-[300px] overflow-y-auto">
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
                    className="w-16 h-16 object-cover rounded-lg shadow"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {detail?.detailProduct?.product?.name}
                    </p>
                    {/* Color and Size */}
                    {detail?.detailProduct?.color && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-2">Couleur:</span>
                        <span
                          style={{
                            backgroundColor: detail?.detailProduct?.color,
                          }}
                          className="w-5 h-5 rounded-full border shadow"
                        ></span>
                        <span className="ml-4">
                          Taille: {detail?.detailProduct?.size}
                        </span>
                      </div>
                    )}
                    {/* Quantity and Price */}
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
