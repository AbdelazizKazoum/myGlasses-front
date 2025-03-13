import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AlertCircle } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { getImageUrl } from "../../utils/getImageUrl";
import { getProductsByCategory } from "../../store/productDetailsSlice";

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
  const { name, image, brand, description, newPrice, price, detail, category } =
    product;

  const [quantity, setQuantity] = useState(0);
  const [variantImages, setVariantImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const relatedProductsRef = useRef(null);

  const dispatch = useDispatch();

  const sizes = [...new Set(detail.map((v) => v.size))];
  const colors = [...new Set(detail.map((v) => v.color))];

  useEffect(() => {
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [isModalOpen]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoadingRelated(true);
      const res = await dispatch(getProductsByCategory(category));
      setRelatedProducts(res.payload || []);
      setLoadingRelated(false);
    };
    fetchRelatedProducts();
  }, [category, dispatch]);

  useEffect(() => {
    if (!selectedSize || !selectedColor) return;

    const selectedVariant = detail.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );

    if (selectedVariant) {
      setQuantity(selectedVariant?.stock?.quantity || 0);
      setVariantImages(selectedVariant.images || []);
      setOutOfStock((selectedVariant?.stock?.quantity || 0) === 0);
    } else {
      setQuantity(0);
      setVariantImages([]);
      setOutOfStock(true);
    }
  }, [selectedSize, selectedColor, detail]);

  const showValidationWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000);
  };

  const handleAddClick = () => {
    if (!selectedSize || !selectedColor || outOfStock)
      return showValidationWarning();
    handleAddToCart();
  };

  const handleProceedClick = () => {
    if (!selectedSize || !selectedColor) return showValidationWarning();
    closeModal();
  };

  const scrollRelated = (dir) => {
    relatedProductsRef.current.scrollLeft += dir === "left" ? -300 : 300;
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-xl p-6 overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Customize Product
          </h2>
          <RxCross2
            className="cursor-pointer text-gray-600"
            onClick={closeModal}
          />
        </div>

        {/* Product Image */}
        <div className="mb-4 w-full flex justify-center">
          <img
            src={getImageUrl(variantImages[0]?.image || image)}
            alt={name}
            className="w-48 h-32 object-contain rounded-md"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-1">{brand}</p>
        <p className="text-sm text-gray-400 mb-2">{description}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-primary-500">
            MAD {newPrice}
          </span>
          <del className="text-sm text-gray-400">MAD {price}</del>
        </div>

        {/* Size Selection */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Size
          </label>
          <div
            className={`flex flex-wrap gap-2 ${
              showWarning && !selectedSize ? "animate-shake" : ""
            }`}
          >
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded border text-sm transition ${
                  selectedSize === size
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {showWarning && !selectedSize && (
            <p className="text-sm text-red-500 mt-1">Please select a size.</p>
          )}
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Color
          </label>
          <div
            className={`flex gap-2 ${
              showWarning && !selectedColor ? "animate-shake" : ""
            }`}
          >
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`w-6 h-6 rounded-full transition ${
                  selectedColor === color
                    ? "ring-2 ring-primary-500 ring-offset-2"
                    : "border border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {showWarning && !selectedColor && (
            <p className="text-sm text-red-500 mt-1">Please select a color.</p>
          )}
        </div>

        {/* Quantity Info */}
        {selectedSize && selectedColor && (
          <div className="mb-4">
            {quantity > 0 ? (
              <p className="text-sm text-gray-600">
                Available Quantity: {quantity}
              </p>
            ) : (
              <div className="flex items-center p-2 bg-red-100 rounded">
                <AlertCircle className="text-red-500 mr-2" />
                <p className="text-red-500 font-semibold text-sm m-0">
                  Product is out of stock
                </p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center gap-2 mb-6">
          <button
            onClick={handleAddClick}
            className="flex-1 bg-primary-500 text-white py-2 rounded-md hover:bg-primary-800 transition"
          >
            Add to Cart
          </button>
          <Link to="/cart" className="flex-1">
            <button
              onClick={handleProceedClick}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              Proceed to Cart
            </button>
          </Link>
        </div>

        {/* Related Products */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            You may also like
          </h4>
          <div className="relative">
            <button
              onClick={() => scrollRelated("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full z-10"
            >
              &lt;
            </button>
            <div
              ref={relatedProductsRef}
              className="flex overflow-x-auto gap-4 px-4 py-2 hide-scrollbar scroll-smooth"
            >
              {loadingRelated
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-40 flex-shrink-0 animate-pulse space-y-2"
                    >
                      <div className="w-full h-32 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  ))
                : relatedProducts.map((item) => (
                    <Link
                      to={`/product/${item.id}`}
                      key={item.id}
                      className="w-40 flex-shrink-0"
                    >
                      <div className="flex">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-32 object-contain rounded"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-sm mt-1 text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm mt-1 text-primary-800">
                          {item.newPrice} MAD
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
            <button
              onClick={() => scrollRelated("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full z-10"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
