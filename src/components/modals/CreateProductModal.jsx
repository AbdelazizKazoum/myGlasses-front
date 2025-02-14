import { useNavigate } from "react-router-dom";
import CreateProductPage from "../newProduct/Index";

const CreateProductModal = ({
  isOpen,
  setIsOpen,
  productName,
  accessories = [],
  product,
}) => {
  // Hooks
  const navigate = useNavigate();
  return (
    <div
      className={`fixed inset-0 z-50  flex sm:items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white overflow-auto rounded-lg shadow-lg w-full  p-6 flex flex-col max-w-2xl lg:max-w-4xl">
        {/* Modal header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Create New Product</h3>

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
        <div className="flex-grow">
          {/* Product Info */}
          <div className="flex flex-col  gap-4 p-2">
            <CreateProductPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
