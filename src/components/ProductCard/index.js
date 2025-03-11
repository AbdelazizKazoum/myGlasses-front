import { Link } from "react-router-dom";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { getImageUrl } from "../../utils/getImageUrl";
import "./index.css";

const ProductCard = (props) => {
  const { product } = props;
  const { id, name, brand, rating, price, newPrice, image, description } =
    product;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const cartProducts = useSelector((state) => state.cart);
  const wishlistProducts = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

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
    dispatch(
      addCartItem({
        ...product,
        size: selectedSize,
        color: selectedColor,
        qty: 1,
      })
    );
    setIsAddedToCart(true);
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

      {isModalOpen && (
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
            <img
              src={getImageUrl(image)}
              alt={name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

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
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
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
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
              </select>
            </div>

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
      )}
    </>
  );
};

export default ProductCard;
