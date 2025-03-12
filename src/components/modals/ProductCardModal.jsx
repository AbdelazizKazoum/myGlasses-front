import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/getImageUrl";

const ProductCardModal = ({
  product,
  isModalOpen,
  closeModal,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  handleAddToCart,
}) => {
  const { name, image, brand, description, newPrice, price, detail } = product;

  const [quantity, setQuantity] = useState(0);
  const [variantImages, setVariantImages] = useState([]);

  // Get the unique sizes and colors from the product's details
  const sizes = [...new Set(detail.map((variant) => variant.size))];
  const colors = [...new Set(detail.map((variant) => variant.color))];

  useEffect(() => {
    if (selectedSize && selectedColor) {
      const selectedVariant = detail.find(
        (variant) =>
          variant.size === selectedSize && variant.color === selectedColor
      );

      if (selectedVariant) {
        setQuantity(selectedVariant.qte);
        setVariantImages(selectedVariant.images);
      } else {
        setQuantity(0);
        setVariantImages([]);
      }
    }
  }, [selectedSize, selectedColor, detail]);

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={closeModal}
        />
        {/* Right-side Modal Panel */}
        <div className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-xl p-6 animate-slide-in">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Customize Product
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Product Image */}
          <div className="mb-4">
            {variantImages.length > 0 ? (
              <img
                src={getImageUrl(variantImages[0].image)}
                alt={name}
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <img
                src={getImageUrl(image)}
                alt={name}
                className="w-full h-40 object-cover rounded-md"
              />
            )}
          </div>

          {/* Product Info */}
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mb-1">{brand}</p>
          <p className="text-sm text-gray-400 mb-3">{description}</p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-blue-600">
              MAD {newPrice}
            </span>
            <del className="text-gray-400 text-sm">MAD {price}</del>
          </div>

          {/* Size Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Color Select */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Color
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Info */}
          {selectedSize && selectedColor && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Available Quantity: {quantity}
              </p>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex justify-between">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <Link to="/cart">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Proceed to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCardModal;
