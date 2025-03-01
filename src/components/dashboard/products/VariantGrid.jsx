import React, { useState } from "react";

const VariantGrid = ({ variants, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    if (onEdit) onEdit(variants[index]);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Color</th>
            <th className="px-4 py-2 border">Size</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{variant.color}</td>
              <td className="px-4 py-2 border">{variant.size}</td>
              <td className="px-4 py-2 border">{variant.qte}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantGrid;
