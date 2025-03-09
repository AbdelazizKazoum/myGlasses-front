import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";
import { RecommandedProducts } from "../Products/RecommandedProducts";

const ProductModal = ({
  isOpen,
  setIsOpen,
  productName,
  accessories = [],
  product,
}) => {
  console.log("🚀 ~ accessories:", accessories);

  // Hooks
  const navigate = useNavigate();
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
      <div className="relative bg-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2     p-6 flex flex-col max-w-lg sm:max-w-md lg:max-w-3xl">
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
        <div className="flex-grow p-4">
          {/* Product Info */}
          <div className="">
            <p className="text-green-600 text-center text-lg">
              Le produit <strong>{productName}</strong> a été ajouté à votre
              panier avec succès.
            </p>
            <div className="flex flex-col items-center gap-4 p-2">
              <div className="flex gap-3 justify-center items-center m-auto">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600 text-sm">
                    Prix: {product.price} €
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-md font-semibold">Vous pourriez aussi aimer :</h4>

          <RecommandedProducts products={accessories} allowDetails={false} />
        </div>

        {/* Modal footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            type="button"
            className="text-white bg-black/90 hover:bg-black/80 rounded-lg px-4 py-2"
            onClick={() => {
              setIsOpen(false);
              navigate("/cart");
            }}
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
