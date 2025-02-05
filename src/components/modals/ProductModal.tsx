import React from "react";

const ProductModal = ({ isOpen, onClose, productName, accessories = [] }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen && "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Produit ajouté au panier !
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 rounded-full p-1"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4">
            <p className="text-gray-700">
              Le produit <strong>{productName}</strong> a été ajouté à votre
              panier avec succès.
            </p>
            {accessories.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-semibold">
                  Vous pourriez aussi aimer :
                </h4>
                <ul className="mt-2 space-y-2">
                  {accessories.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => item.onAdd()}
                      >
                        Ajouter
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal footer */}
          <div className="flex justify-end p-4 border-t border-gray-200">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
              onClick={onClose}
            >
              Continuer vos achats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
