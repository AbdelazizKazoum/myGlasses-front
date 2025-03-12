import { Link } from "react-router-dom";
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
    </>
  );
};

export default ProductCard;
