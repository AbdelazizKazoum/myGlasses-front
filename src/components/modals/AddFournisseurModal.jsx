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

  useEffect(() => {
    if (supplier) {
      // If supplier data is passed for updating, populate the form with the current data
      setSupplierData({
        companyName: supplier.companyName || "",
        name: supplier.name || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  if (!isOpen) return null;

  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (supplier) {
      // If supplier is present, update
      onUpdateSupplier(supplierData);
    } else {
      // If no supplier, create new one
      onCreateSupplier(supplierData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex m-0 items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <XIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {supplier ? "Mettre à jour le fournisseur" : "Ajouter un fournisseur"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Company Name Field */}
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

          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Phone Field */}
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

          {/* Address Field */}
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
              className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-700"
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
