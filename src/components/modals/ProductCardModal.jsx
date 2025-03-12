import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getImageUrl } from "../../utils/getImageUrl";
import { AlertCircle } from "lucide-react";
import { getProductsByCategory } from "../../store/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const ProductCardModal = ({
  product,
  isModalOpen,
  closeModal,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  handleAddToCart,
  relatedProducts, // assuming related products data is passed in as a prop
}) => {
  console.log("🚀 ~ product:", product);
  const { name, image, brand, description, newPrice, price, detail, category } =
    product;

  const [quantity, setQuantity] = useState(0);
  const [variantImages, setVariantImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const sizes = [...new Set(detail.map((variant) => variant.size))];
  const colors = [...new Set(detail.map((variant) => variant.color))];

  const relatedProductsRef = useRef([]); // reference for scrolling
  const dispatch = useDispatch();
  const { relatedProducts: categoryProducts } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    (async () => {
      await dispatch(getProductsByCategory(category));
    })();
  }, [category, dispatch]);

  useEffect(() => {
    if (selectedSize && selectedColor) {
      const selectedVariant = detail.find(
        (variant) =>
          variant.size === selectedSize && variant.color === selectedColor
      );

      if (selectedVariant) {
        setQuantity(selectedVariant?.stock?.quantity || 0);
        setVariantImages(selectedVariant.images);
        setOutOfStock(selectedVariant?.stock?.quantity === 0);
      } else {
        setQuantity(0);
        setVariantImages([]);
        setOutOfStock(true);
      }
    }
  }, [selectedSize, selectedColor, detail]);

  const handleClickWithValidation = () => {
    if (!selectedSize || !selectedColor) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000); // Hide after 2s
      return;
    }

    if (outOfStock) {
      // If out of stock, show a warning without submitting
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000); // Hide after 2s
      return;
    }

    handleAddToCart();
  };

  // Function to scroll related products left and right
  const scrollRelatedProducts = (direction) => {
    if (relatedProductsRef.current) {
      relatedProductsRef.current.scrollLeft +=
        direction === "left" ? -300 : 300;
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={closeModal}
        />
        <div className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-xl p-6 animate-slide-in overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl m-0 font-semibold text-gray-800">
              Customize Product
            </h2>
            <RxCross2 className="filters-cross" onClick={closeModal} />
          </div>

          <div className="mb-4 w-full flex justify-center">
            <img
              src={getImageUrl(
                variantImages.length > 0 ? variantImages[0].image : image
              )}
              alt={name}
              className="w-50 h-30 object-cover rounded-md"
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mb-1">{brand}</p>
          <p className="text-sm text-gray-400 mb-2">{description}</p>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-primary-500">
              MAD {newPrice}
            </span>
            <del className="text-gray-400 text-sm">MAD {price}</del>
          </div>

          {/* SIZE SELECTION */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Size
            </label>
            <div
              className={`flex flex-wrap gap-2 transition-all ${
                showWarning && !selectedSize ? "animate-shake" : ""
              }`}
            >
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
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
              <p className="text-sm text-red-500 mt-1">
                Please select a size first.
              </p>
            )}
          </div>

          {/* COLOR SELECTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Color
            </label>
            <div
              className={`flex flex-wrap gap-2 transition-all ${
                showWarning && !selectedColor ? "animate-shake" : ""
              }`}
            >
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full ${
                    selectedColor === color
                      ? "ring-2 ring-primary-500 ring-offset-2"
                      : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            {showWarning && !selectedColor && (
              <p className="text-sm text-red-500 mt-1">
                Please select a color first.
              </p>
            )}
          </div>

          {selectedSize && selectedColor && (
            <div className="mb-4">
              {quantity > 0 ? (
                <p className="text-sm text-gray-600">
                  Available Quantity: {quantity}
                </p>
              ) : (
                <div className="bg-red-500/10 p-2 rounded flex mb-2 items-center">
                  <AlertCircle className="text-red-500 mr-2" />
                  <p className="text-red-500 font-bold m-0 ">
                    Product is out of stock
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-between">
            <button
              onClick={handleClickWithValidation}
              className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
            >
              Add to Cart
            </button>
            <Link to="/cart">
              <button
                onClick={() => {
                  if (!selectedSize || !selectedColor) {
                    setShowWarning(true);
                    setTimeout(() => setShowWarning(false), 2000);
                    return;
                  }
                  closeModal();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Proceed to Cart
              </button>
            </Link>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          {relatedProducts && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                You may also like
              </h4>
              <div className="relative">
                <button
                  onClick={() => scrollRelatedProducts("left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                >
                  &lt;
                </button>
                <div
                  ref={relatedProductsRef}
                  className="flex overflow-x-auto gap-4 px-4 py-2"
                >
                  {categoryProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="w-48 flex-shrink-0">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <img
                          src={getImageUrl(relatedProduct.image)}
                          alt={relatedProduct.name}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <h5 className="text-sm font-medium text-gray-800 mt-2">
                          {relatedProduct.name}
                        </h5>
                      </Link>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollRelatedProducts("right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProductCardModal;
