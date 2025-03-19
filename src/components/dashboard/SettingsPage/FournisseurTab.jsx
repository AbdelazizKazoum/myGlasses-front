import React, { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import AddFournisseurModal from "../../modals/AddFournisseurModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../../store/supplierSlice";
import { toast } from "react-toastify";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-gray-800">Confirmation</h3>
        <p className="text-sm text-gray-600 mt-2">
          Êtes-vous sûr de vouloir supprimer ce fournisseur ?
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

const FournisseurTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Confirmation modal state
  const [selectedSupplier, setSelectedSupplier] = useState(null); // For delete
  const [loading, setLoading] = useState(true);

  // Redux store hooks
  const { suppliers } = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const openModal = () => {
    setSelectedSupplier(null); // Clear previously selected supplier
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null); // Reset selected supplier
  };

  // Fetch suppliers on component mount
  useEffect(() => {
    setLoading(true);
    dispatch(fetchSuppliers());
    setLoading(false);
  }, [dispatch]);

  // Handle the creation of a new supplier
  const handleCreateSupplier = async (formData) => {
    const res = await dispatch(createSupplier(formData));
    if (res.payload) {
      closeModal();
      toast.success("Fournisseur créé avec succès!");
    }
  };

  // Handle the update of a supplier
  const handleUpdateSupplier = async (formData) => {
    const res = await dispatch(
      updateSupplier({ id: selectedSupplier.id, formData })
    );
    if (res.payload) {
      closeModal();
    }
  };

  // Handle the deletion of a supplier
  const handleDeleteSupplier = async () => {
    const res = await dispatch(deleteSupplier(selectedSupplier.id));
    if (res.payload) {
      toast.success("Fournisseur supprimé avec succès!");
      setIsDeleteModalOpen(false); // Close the confirmation modal
    }
  };

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Liste des Fournisseurs</h3>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition"
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter un fournisseur
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Adresse
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center text-sm text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {supplier.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {supplier.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {supplier.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {supplier.address}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary-500 border border-primary-500 rounded-md hover:bg-primary-500 hover:text-white transition"
                      onClick={() => handleEditClick(supplier)} // Handle edit click
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition ml-2"
                      onClick={() => handleDeleteClick(supplier)} // Handle delete click with confirmation
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-sm text-gray-500">
                  Aucun fournisseur disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding or updating a supplier */}
      <AddFournisseurModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateSupplier={handleCreateSupplier}
        onUpdateSupplier={handleUpdateSupplier} // Pass update method
        supplier={selectedSupplier} // Pass selected supplier data for updating
      />

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // Close the confirmation modal
        onConfirm={handleDeleteSupplier} // Confirm delete action
      />
    </div>
  );
};

export default FournisseurTab;
