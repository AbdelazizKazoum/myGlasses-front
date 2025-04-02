import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  decreaseCartItemCount,
  increaseCartItemCount,
} from "../../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../store/wishlistSlice";
import { TbCurrencyDirham } from "react-icons/tb";
import { getImageUrl } from "../../utils/getImageUrl";

import "./index.css";

const CartProductCard = (props) => {
  const { product } = props;
  const {
    id,
    name,
    image,
    newPrice,
    price,
    qty,
    color,
    size,
    availableQuantity,
  } = product;

  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const wishlistProducts = useSelector((state) => state.wishlist);

  useEffect(() => {
    setIsAddedToWishlist(wishlistProducts.some((product) => product.id === id));
  }, [wishlistProducts, id]);

  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(removeCartItem(id));
  };

  const addToWishlist = () => {
    setIsAddedToWishlist(true);
    dispatch(addWishlistItem(product));
  };

  const removeFromWishlist = () => {
    setIsAddedToWishlist(false);
    dispatch(removeWishlistItem(id));
  };

  const increaseItem = () => {
    if (qty < availableQuantity) {
      dispatch(increaseCartItemCount(id));
    }
  };

  const decreaseItem = () => {
    qty === 1
      ? dispatch(removeCartItem(id))
      : dispatch(decreaseCartItemCount(id));
  };

  return (
    <li className="cart-product-card w-full bg-white p-[15px] mb-3 rounded flex items-center !shadow-sm">
      <img className="cart-product-image" src={getImageUrl(image)} alt={name} />

      <div className="cart-product-details">
        <h1>{name}</h1>

        {color && (
          <div className="flex mt-0 mb-2">
            Color:
            <span
              style={{ backgroundColor: color }}
              className="mx-2 w-6 h-6 rounded-full"
            ></span>
            Size: <span className="ml-2">{size}</span>
          </div>
        )}

        {/* Show Available Quantity */}
        <p className="text-sm text-gray-600">
          Stock disponible: {availableQuantity}
        </p>

        <p>
          Quantity:{" "}
          <AiFillMinusCircle
            className="cart-product-update-icon"
            onClick={decreaseItem}
          />{" "}
          <span>{qty}</span>{" "}
          <AiFillPlusCircle
            className={`cart-product-update-icon ${
              qty >= availableQuantity ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={increaseItem}
            disabled={qty >= availableQuantity}
          />
        </p>

        <div>
          <button
            type="button"
            className="cart-product-remove-button"
            onClick={removeFromCart}
          >
            Remove
          </button>
          {!isAddedToWishlist ? (
            <BiSolidBookmarkHeart
              className="cart-product-bookmark-button"
              onClick={addToWishlist}
            />
          ) : (
            <BiSolidBookmarkHeart
              className="cart-product-bookmark-button color-red"
              onClick={removeFromWishlist}
            />
          )}
        </div>
      </div>

      <div className="cart-product-price-container">
        <div className="flex gap-1">
          <div className="text-xl font-semibold -ml-1">{newPrice} MAD</div>
        </div>
        <div className="flex gap-1 ml-3">
          <div className="text-sm font-semibold -ml-1 text-gray-400">
            <del>{price} MAD</del>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartProductCard;
