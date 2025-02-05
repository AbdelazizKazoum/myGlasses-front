import React from "react";
import ProductCard from "../ProductCard";

const ProductModal = ({ isOpen, setIsOpen, productName, accessories = [] }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg w-3/4  md:w-2/3  p-6 flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Produit ajouté au panier !</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 rounded-full p-1"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
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
        <div className="flex-grow  p-4">
          <p className="text-green-600 text-center text-lg">
            Le produit <strong>{productName}</strong> a été ajouté à votre
            panier avec succès.
          </p>
          {accessories.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-semibold">
                Vous pourriez aussi aimer :
              </h4>
              <div className=" gap-4 mt-4">
                {accessories.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            type="button"
            className="text-white bg-black/90 hover:bg-black/80 rounded-lg px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
