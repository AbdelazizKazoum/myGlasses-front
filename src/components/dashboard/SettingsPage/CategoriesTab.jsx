import React, { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getImageUrl } from "../../../utils/getImageUrl";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { getCategories, updateCategory } from "../../../store/categorySlice";
import { addCategory } from "../../../store/filtersSlice";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 m-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-gray-800">Confirmation</h3>
        <p className="text-sm text-gray-600 mt-2">
          Êtes-vous sûr de vouloir supprimer cette catégorie ?
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

const CategoriesTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Confirmation modal state
  const [selectedCategory, setSelectedCategory] = useState(null); // For delete

  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      setLoading(false);
    })();
  }, [dispatch]);

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ displayText: displayName, category: categoryName })
    );
    formData.append("file", categoryImage);

    if (editingCategory) {
      await dispatch(updateCategory({ formData, id: editingCategory.id }));
    } else {
      await dispatch(addCategory(formData));
    }

    setIsModalOpen(false);
    await dispatch(getCategories());
  };

  //   const handleDeleteCategory = async () => {
  //     const res = await dispatch(deleteCategory(selectedCategory.id));
  //     if (res.payload) {
  //       toast.success("Catégorie supprimée avec succès!");
  //       setIsDeleteModalOpen(false);
  //     }
  //   };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCategoryImage(file);
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category);
    setDisplayName(category.displayText);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const clearEdit = () => {
    setDisplayName("");
    setCategoryImage(null);
    setCategoryName("");
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Liste des Catégories</h3>
        <button
          onClick={() => {
            setEditingCategory(null);
            clearEdit();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition"
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter une catégorie
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Nom de la catégorie
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Nom d'affichage
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <img
                      src={getImageUrl(category.imageUrl)}
                      className="w-10 h-10 object-cover rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {category.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {category.displayText}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition ml-2"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-sm text-gray-500">
                  Aucun catégorie disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        // onConfirm={handleDeleteCategory}
      />

      {/* Modal for adding or updating a category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-black/50 ">
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            {/* Close Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              aria-label="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 
              1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 
              11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
              10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editingCategory
                ? "Modifier la catégorie"
                : "Ajouter une catégorie"}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                placeholder="Nom de la catégorie"
              />

              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                placeholder="Nom d'affichage"
              />

              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-primary-100 file:text-primary-600 file:rounded-lg hover:file:bg-primary-200 transition"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-800 transition"
              >
                {editingCategory ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
