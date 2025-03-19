import React, { useEffect, useState } from "react";
import { XIcon } from "lucide-react";

const AddCategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [categoryName, setCategoryName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  useEffect(() => {
    if (category) {
      // Edit mode
      setCategoryName(category.category || "");
      setDisplayName(category.displayText || "");
    } else if (isOpen) {
      // Add mode
      setCategoryName("");
      setDisplayName("");
      setCategoryImage(null);
    }
  }, [isOpen, category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCategoryImage(file);
    } else {
      console.error("Please upload a valid image.");
    }
  };

  const isFormValid = categoryName.trim() !== "" && displayName.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ category: categoryName, displayText: displayName })
    );
    if (categoryImage) {
      formData.append("file", categoryImage);
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
        <h2 className="text-xl font-semibold mb-4">
          {category ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la catégorie
            </label>
            <input
              type="text"
              name="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Texte affiché
            </label>
            <input
              type="text"
              name="displayText"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2"
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
              disabled={!isFormValid}
              className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {category ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
