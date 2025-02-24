import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { getImageUrl } from "../../utils/getImageUrl";
import { selectStyles, statusOptions } from "../../utils/utils";
import { useSelector } from "react-redux";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={() => setSelectedCommand(null)}
          className="absolute top-4 right-4 text-xl text-gray-500"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-4">Détails de la commande</h2>
        <p className="text-lg font-bold text-gray-800 mb-4">
          Total: {selectedCommand.total} DH
        </p>
        <ul className="mb-4">
          {selectedCommand.details.map((detail, index) => (
            <li key={index} className="border-b py-2 flex items-center gap-4">
              <img
                src={getImageUrl(detail.product.image)}
                alt={detail.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{detail.product.name}</p>
                <p>
                  {detail.quantite} x {detail.prix_vente} DH
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mb-4">
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
            className="mt-1 p-2 w-full border rounded"
            placeholder="Nouveau total"
            defaultValue={selectedCommand.total}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="new-status"
            className="block text-sm font-medium text-gray-700"
          >
            Modifier le statut
          </label>
          <Select
            id="new-status"
            options={statusOptions}
            value={statusOptions.find((option) => option.value === newStatus)}
            onChange={(option) => setNewStatus(option ? option.value : "")}
            className="w-full outline-none"
            styles={selectStyles}
          />
        </div>
        <button
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-800  mr-2"
          onClick={handleUpdateCommand}
        >
          Mettre à jour
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setSelectedCommand(null)}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default CommandDetailModal;
