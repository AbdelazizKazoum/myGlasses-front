import { Link, useNavigate } from "react-router-dom";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { getImageUrl } from "../../utils/getImageUrl";
import "./index.css";
import ProductCardModal from "../modals/ProductCardModal";

const ProductCard = (props) => {
  const { product } = props;
  const { id, name, brand, rating, price, newPrice, image, description } =
    product;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal state

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for redirection after adding to cart

  useEffect(() => {
    setIsAddedToCart(cartProducts.some((product) => product.id === id));
  }, [cartProducts, id]);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSize("");
    setSelectedColor("");
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color.");
      return;
    }

    const variant = product.detail.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );

    dispatch(
      addCartItem({
        ...variant,
        name,
        price,
        newPrice,
        color: variant?.color,
        size: variant?.size,
        image: variant?.images[0].image,
        availableQuantity: variant?.stock?.quantity,
        qty: 1,
      })
    );
    setIsAddedToCart(true);
    setShowSuccessModal(true); // Show success modal
    closeModal();
  };

  const addToWishlist = () => {
    setIsAddedToWishlist(true);
    dispatch(addWishlistItem(product));
  };

  const removeFromWishlist = () => {
    setIsAddedToWishlist(false);
    dispatch(removeWishlistItem(id));
  };

  return (
    <>
      <li className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex">
        <div className="product-card shadow-sm">
          <Link
            to={`/product/${id}`}
            className="link-item product-image-container"
          >
            <img
              src={getImageUrl(image)}
              className="product-image"
              alt="productImage"
            />
          </Link>
          <div>
            <section>
              <div className="product-card-details">
                <h2>{name}</h2>
                <div className="flex gap-1">
                  <div>{rating}</div>
                  <div className="mt-[2px]">
                    <AiFillStar className="color-yellow !text-[#FACC15]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Rating</span>
                  </div>
                </div>
                <p className="product-card-brand">{brand}</p>
              </div>
              <div className="product-card-price">
                <p>MAD {newPrice}</p>
                <del>MAD {price}</del>
              </div>
            </section>
            <hr />
            <section>
              {!isAddedToCart && (
                <button
                  type="button"
                  className="product-card-button"
                  onClick={openModal}
                >
                  Add to Cart
                </button>
              )}
              {isAddedToCart && (
                <Link to="/cart" className="link-item">
                  <button type="button" className="product-card-button">
                    Go to Cart
                  </button>
                </Link>
              )}
              {!isAddedToWishlist && (
                <BiSolidBookmarkHeart
                  className="product-bookmark-button"
                  onClick={addToWishlist}
                />
              )}
              {isAddedToWishlist && (
                <BiSolidBookmarkHeart
                  className="product-bookmark-button color-red"
                  onClick={removeFromWishlist}
                />
              )}
            </section>
          </div>
        </div>
      </li>

      {/* Pass necessary props to ProductModal */}
      <ProductCardModal
        product={product}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        handleAddToCart={handleAddToCart}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Product added to cart successfully!
            </h2>

            {/* Product image and name in the modal */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={getImageUrl(image)}
                alt={name}
                className="w-20 h-20 object-cover rounded-md mb-3"
              />
              <p className="text-lg font-semibold">{name}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/cart"); // Redirect to checkout page
                }}
                className="w-full sm:w-1/2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setShowSuccessModal(false)} // Close modal without redirect
                className="w-full sm:w-1/2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
