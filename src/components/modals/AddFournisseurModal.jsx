import React, { useState, useEffect } from "react";
import { XIcon } from "lucide-react";

const AddFournisseurModal = ({
  isOpen,
  onClose,
  onCreateSupplier,
  onUpdateSupplier,
  supplier,
}) => {
  const [supplierData, setSupplierData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Populate or reset form when modal opens
  useEffect(() => {
    if (supplier) {
      // Update mode
      setSupplierData({
        companyName: supplier.companyName || "",
        name: supplier.name || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
      });
    } else if (isOpen) {
      // Add mode - reset form
      setSupplierData({
        companyName: "",
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [isOpen, supplier]);

  if (!isOpen) return null;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Check if form is valid
  const isFormValid = Object.values(supplierData).every(
    (field) => field.trim() !== ""
  );

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (supplier) {
      onUpdateSupplier(supplierData);
    } else {
      onCreateSupplier(supplierData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex m-0 items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fermer"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          {supplier ? "Mettre à jour le fournisseur" : "Ajouter un fournisseur"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              name="companyName"
              value={supplierData.companyName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={supplierData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={supplierData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              type="text"
              name="phone"
              value={supplierData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              type="text"
              name="address"
              value={supplierData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              {supplier ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFournisseurModal;
